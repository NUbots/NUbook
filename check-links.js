const { readdir, stat, readFile } = require('fs').promises;
const { resolve } = require('path');
const http = require('http');
const https = require('https');

// Mapping of HTTP status codes to their descriptions
const statusDescriptions = {
  404: 'Not Found',
};

// Recursively search for files matching the pattern in a directory
const searchRecursive = async (dir, pattern) => {
  let results = [];
  const files = await readdir(dir);

  await Promise.all(files.map(async (dirInner) => {
    const resolvedPath = resolve(dir, dirInner);
    const statResult = await stat(resolvedPath);

    if (statResult.isDirectory()) {
      const nestedResults = await searchRecursive(resolvedPath, pattern);
      results = results.concat(nestedResults);
    }
    if (statResult.isFile() && resolvedPath.endsWith(pattern)) {
      results.push(resolvedPath);
    }
  }));
  return results;
};

const checkLinks = async () => {
  const files = await searchRecursive('./src/book', '.mdx');
  const externalLinksList = [];

  // Loop through the mdx files to find all links
  let count = 0;
  await Promise.all(files.map(async (file) => {
    const content = await readFile(file, 'utf-8');
    const array = content.split('\n');
    const reBrackets = /\((.*?)\)/g;

    array.forEach((line) => {
      let found;
      while ((found = reBrackets.exec(line)) !== null) {
        const t = found[1].split(' ', 1)[0];
        if (t.includes('/')) {
          if (t.startsWith('http') && !t.includes('localhost')) {
            count++;
            externalLinksList.push({ link: t, file });
          }
        }
      }
    });
  }));

  // Send HTTP/HTTPS HEAD request to check if the link exists
  const sendHTTPRequest = (linkURL) => {
    return new Promise((resolve) => {
      const client = linkURL.startsWith('https') ? https : http;
      const req = client.request(linkURL, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve(res.statusCode);
      });
      req.on('error', () => resolve(null));
      req.end();
    });
  };

  // Check all external links with a queue
  const queue = [];
  const concurrency = 5;

  for (const { link, file } of externalLinksList) {
    const promise = sendHTTPRequest(link).then((statusCode) => {
      if (statusCode === 404) {
        console.log(`Broken link: ${link}\n\tFound in file: ${file}`);
      }
    });
    queue.push(promise);

    if (queue.length >= concurrency) {
      await Promise.race(queue);
      queue.splice(queue.findIndex(p => p === promise), 1);
    }
  }

  await Promise.all(queue);
  console.log('External Links found:', count);
};

checkLinks();
const { readdir, stat, readFile } = require('fs').promises
const { resolve } = require('path')
const http = require('http')
const https = require('https')

// Recursively search for files matching the pattern in a directory
const searchRecursive = async (dir, pattern) => {
  let results = []
  const files = await readdir(dir)

  await Promise.all(
    files.map(async (dirInner) => {
      const resolvedPath = resolve(dir, dirInner)
      const statResult = await stat(resolvedPath)

      if (statResult.isDirectory()) {
        const nestedResults = await searchRecursive(resolvedPath, pattern)
        results = results.concat(nestedResults)
      }
      if (statResult.isFile() && resolvedPath.endsWith(pattern)) {
        results.push(resolvedPath)
      }
    })
  )
  return results
}

const checkLinks = async () => {
  const files = await searchRecursive('./src/book', '.mdx')
  const externalLinksList = []

  // Loop through the mdx files to find all links
  let count = 0
  await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file, 'utf-8')
      const array = content.split('\n')
      const reBrackets = /\((.*?)\)/g

      array.forEach((line) => {
        let found
        while ((found = reBrackets.exec(line)) !== null) {
          const t = found[1].split(' ', 1)[0]
          if (t.includes('/')) {
            if (t.startsWith('http') && !t.includes('localhost')) {
              count++
              externalLinksList.push({ link: t, file })
            }
          }
        }
      })
    })
  )

  console.log(`Found ${count} external links to check`)

  // Send HTTP/HTTPS request to check if the link exists
  const sendHTTPRequest = (linkURL) => {
    return new Promise((resolve) => {
      const client = linkURL.startsWith('https') ? https : http
      const options = {
        method: 'GET', // Changed from HEAD to GET
        timeout: 5000, // 5 second timeout on link connections
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
      
      const req = client.request(linkURL, options, (res) => {
        // Consume the response data to free up memory
        res.on('data', () => {})
        res.on('end', () => {
          resolve(res.statusCode)
        })
      })
      
      req.on('error', (err) => {
        // Only log non-timeout errors
        if (err.code !== 'ECONNRESET' && err.code !== 'ETIMEDOUT') {
          console.log(`${linkURL} - Error: ${err.message}`)
        }
        resolve(null)
      })
      
      req.on('timeout', () => {
        req.destroy()
        resolve(null)
      })
      
      req.setTimeout(5000)
      req.end()
    })
  }

  // Check all external links with a queue
  const queue = []
  const concurrency = 5
  let processed = 0

  console.log(`Checking ${externalLinksList.length} external links...`)

  for (const { link, file } of externalLinksList) {
    const promise = sendHTTPRequest(link)
      .then((statusCode) => {
        if (statusCode === 404) {
          console.log(`Error - Broken link: ${link}\n\tFound in file: ${file}`)
        } else if (statusCode === null) {
          console.log(`Warning - Failed to check: ${link}\n\tFound in file: ${file}`)
        }
        processed++
        // Show progress every 20 links to avoid spam
        if (processed % 20 === 0 || processed === externalLinksList.length) {
          console.log(`Progress: ${processed}/${externalLinksList.length} links`)
        }
      })
      .finally(() => {
        // Remove this promise from the queue when it completes
        const index = queue.indexOf(promise)
        if (index > -1) {
          queue.splice(index, 1)
        }
      })
    
    queue.push(promise)

    if (queue.length >= concurrency) {
      // Wait for any promise to complete (which will remove itself from queue)
      await Promise.race(queue)
    }
    
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  await Promise.all(queue)
  console.log('External Links found:', count)
}

checkLinks()

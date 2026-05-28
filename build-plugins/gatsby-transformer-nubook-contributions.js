/*eslint-env node */
/*eslint-env es6 */

const child_process = require('child_process')

// See https://regexr.com/6dola
const parseAuthorRegex = /(?<name>.+)\(@(?<username>.+)\)/m

/**
 * Add NUbook contribution data (authors and last commit) to MDX page nodes,
 * by creating a new NUbookContributions node attached as a child to each
 * MDX page node
 */
exports.onCreateNode = async ({
  node,
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const authors = []

  // Parse the authors list from the MDX file frontmatter
  for (const authorString of node.frontmatter.authors ?? []) {
    const author = parseAuthorString(authorString)

    if (author) {
      authors.push(author)
    }
  }

  // Get the last commit for the MDX file from git
  const lastCommit = await getLastCommit(node.fileAbsolutePath)

  // The new custom NUbookContributions node
  const contributionsNode = {
    // Data needed for a Gatsby MDX node
    id: createNodeId(`${node.id} >>> NUbookContributions`),
    children: [],
    parent: node.id,
    internal: {
      type: 'NUbookContributions',
      contentDigest: createContentDigest({
        fileAbsolutePath: node.fileAbsolutePath,
        authors,
        lastCommit,
      }),
    },
    // The actual NUbook-specific data
    lastCommit,
    authors,
  }

  // Create the NUbookContributions node with Gatsby
  actions.createNode(contributionsNode)

  // Add the NUbookContributions node as a child to the MDX page node
  actions.createParentChildLink({ parent: node, child: contributionsNode })
}

function parseAuthorString(authorString) {
  const author = authorString.trim()

  if (author.length > 0) {
    const match = parseAuthorRegex.exec(authorString)

    if (match) {
      return {
        name: match.groups.name.trim(),
        username: match.groups.username.trim(),
      }
    } else {
      // Return just the name if there is no username matched.
      // We'll show a default avatar (the NUbots icon) without a link to GitHub.
      return { name: author }
    }
  }

  return null
}

function getLastCommit(filePath) {
  return new Promise((resolve) => {
    child_process.exec(
      `git log -n1 --pretty="format:%H %cd" --date=unix -- "${filePath}"`,
      { windowsHide: true },
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `could not run git to get last commit for ${filePath}:`,
            { stdout, stderr }
          )
          console.error(
            'make sure you have git >= v2.6.0-rc0 installed and that you are in the root of the repo'
          )
          resolve(null)
          return
        }

        const [hash, epochSeconds] = stdout
          .trim()
          .split(' ')
          .map((part) => part.trim())

        if (hash && epochSeconds) {
          resolve({
            hash,
            date: new Date(parseInt(epochSeconds) * 1000),
          })
        } else {
          console.error(`could not parse git log output for ${filePath}:`, {
            stdout,
            stderr,
          })
          console.error(
            'make sure you have git >= v2.6.0-rc0 installed and that you are in the root of the repo'
          )
          resolve(null)
        }
      }
    )
  })
}

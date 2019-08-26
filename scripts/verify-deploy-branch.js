/*eslint-env node*/

const { execSync } = require('child_process')

const branch = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim()

if (branch !== 'master') {
  console.error(
    `Cannot deploy from a non-master branch. Current branch is ${branch}.`
  )
  process.exit(1)
}

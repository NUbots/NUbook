const fs = require('fs')
const path = require('path')
const glob = require('glob')

const shouldFix = process.argv.includes('--fix')

const files = glob.sync('src/**/*.mdx', {
  ignore: ['src/book/kitchen-sink/**'],
})

const issues = []

for (const file of files) {
  issues.push(...checkFile(file, shouldFix))
}

if (issues.length > 0) {
  for (const issue of issues) {
    console.error(issue)
  }

  process.exitCode = 1
}

function checkFile(filePath, fix) {
  const original = fs.readFileSync(filePath, 'utf8')
  const lines = original.split(/\r?\n/)
  const outputLines = []
  const issues = []

  let inFence = false
  let fenceCharacter = ''
  let fenceLength = 0
  const headingState = {
    offset: 0,
    previousHeadingLevel: null,
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/)
    if (fenceMatch) {
      const fence = fenceMatch[1]

      if (!inFence) {
        inFence = true
        fenceCharacter = fence[0]
        fenceLength = fence.length
      } else if (
        fence[0] === fenceCharacter &&
        fence.length >= fenceLength &&
        /^\s{0,3}(`{3,}|~{3,})\s*$/.test(line)
      ) {
        inFence = false
        fenceCharacter = ''
        fenceLength = 0
      }

      outputLines.push(line)
      continue
    }

    if (inFence) {
      outputLines.push(line)
      continue
    }

    const atxHeading = line.match(/^(\s{0,3})(#{1,6})(?:\s+|$)(.*)$/)
    if (atxHeading) {
      const headingLevel = atxHeading[2].length
      const desiredHeadingLevel = normaliseHeadingLevel(
        headingLevel,
        headingState
      )

      if (!fix && desiredHeadingLevel !== headingLevel) {
        issues.push(
          formatHeadingIssue(
            filePath,
            index + 1,
            headingLevel,
            desiredHeadingLevel
          )
        )
      }

      outputLines.push(
        fix
          ? buildAtxHeading(atxHeading[1], desiredHeadingLevel, atxHeading[3])
          : line
      )
      continue
    }

    const setextMatch =
      index + 1 < lines.length &&
      line.trim() !== '' &&
      lines[index + 1].match(/^(\s{0,3})(=+|-+)\s*$/)

    if (setextMatch) {
      const underlineLine = lines[index + 1]
      const headingLevel = underlineLine.trim()[0] === '=' ? 1 : 2
      const desiredHeadingLevel = normaliseHeadingLevel(
        headingLevel,
        headingState
      )

      if (!fix && desiredHeadingLevel !== headingLevel) {
        issues.push(
          formatHeadingIssue(
            filePath,
            index + 1,
            headingLevel,
            desiredHeadingLevel
          )
        )
      }

      if (fix && desiredHeadingLevel > 2) {
        outputLines.push(
          buildAtxHeading(setextMatch[1], desiredHeadingLevel, line.trim())
        )
      } else {
        outputLines.push(line)
        if (fix) {
          outputLines.push(`${underlineLine.match(/^\s{0,3}/)[0] || ''}---`)
        } else {
          outputLines.push(underlineLine)
        }
      }

      index++
      continue
    }

    outputLines.push(line)
  }

  if (fix) {
    const updated = outputLines.join('\n')
    if (updated !== original) {
      fs.writeFileSync(filePath, updated)
    }
  }

  return issues
}

function normaliseHeadingLevel(originalHeadingLevel, headingState) {
  let desiredHeadingLevel = originalHeadingLevel - headingState.offset

  if (headingState.previousHeadingLevel === null) {
    desiredHeadingLevel = 2
    headingState.offset = originalHeadingLevel - desiredHeadingLevel
    headingState.previousHeadingLevel = desiredHeadingLevel
    return desiredHeadingLevel
  }

  if (
    originalHeadingLevel >= 2 &&
    originalHeadingLevel <= headingState.previousHeadingLevel
  ) {
    headingState.offset = 0
    headingState.previousHeadingLevel = originalHeadingLevel
    return originalHeadingLevel
  }

  if (desiredHeadingLevel < 2) {
    desiredHeadingLevel = 2
    headingState.offset = originalHeadingLevel - desiredHeadingLevel
  }

  if (desiredHeadingLevel > headingState.previousHeadingLevel + 1) {
    const delta = desiredHeadingLevel - (headingState.previousHeadingLevel + 1)
    headingState.offset += delta
    desiredHeadingLevel -= delta
  }

  headingState.previousHeadingLevel = desiredHeadingLevel
  return desiredHeadingLevel
}

function formatHeadingIssue(
  filePath,
  lineNumber,
  headingLevel,
  desiredHeadingLevel
) {
  if (headingLevel === 1) {
    return `${formatFileLocation(
      filePath,
      lineNumber
    )} level 1 heading is not allowed`
  }

  if (headingLevel !== 2 && desiredHeadingLevel === 2) {
    return `${formatFileLocation(
      filePath,
      lineNumber
    )} first heading must be level 2, found level ${headingLevel}`
  }

  return `${formatFileLocation(
    filePath,
    lineNumber
  )} heading level should be ${desiredHeadingLevel}, found level ${headingLevel}`
}

function buildAtxHeading(prefix, headingLevel, content) {
  const trimmedContent = content.trim()

  if (trimmedContent === '') {
    return `${prefix}${'#'.repeat(headingLevel)}`
  }

  return `${prefix}${'#'.repeat(headingLevel)} ${trimmedContent}`
}

function formatFileLocation(filePath, lineNumber) {
  return `${path.relative(process.cwd(), filePath)}:${lineNumber}:`
}

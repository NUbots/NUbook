const { parseBibFile, normalizeFieldValue } = require('bibtex')

function bibToJson(bib) {
  const bibJson = {}

  for (const [entryKey, entryValue] of Object.entries(bib.entries$)) {
    const fieldsJson = {}

    for (const [fieldKey, fieldValue] of Object.entries(entryValue.fields)) {
      fieldsJson[fieldKey] = normalizeFieldValue(fieldValue)
    }

    const entryJson = {
      type: entryValue.type,
      fields: fieldsJson,
    }

    bibJson[entryKey] = entryJson
  }

  return JSON.stringify(bibJson)
}

async function createBibNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  function transformObject(obj, id, type) {
    const bibNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type: 'Bibtex',
      },
    }
    createNode(bibNode)
    createParentChildLink({ parent: node, child: bibNode })
  }

  const { createNode, createParentChildLink } = actions

  const content = await loadNodeContent(node)
  const bib = parseBibFile(content)

  const parsedContent = {
    bib: bibToJson(bib),
    dir: node.dir,
    base: node.base,
    relativeDirectory: node.relativeDirectory,
  }

  transformObject(
    parsedContent,
    parsedContent.id ? parsedContent.id : createNodeId(`${node.id} >>> Bibtex`),
    'Bibtex'
  )
}

exports.createBibNode = createBibNode

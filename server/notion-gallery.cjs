const { Client } = require('@notionhq/client')

/** Inline “Gallery” database on the CMS page (Homebase → CMS). */
const DEFAULT_GALLERY_DATABASE_ID = 'f7a8e709-9b0c-4ea4-8de9-ac8744521416'

function mapNotionResults(results) {
  const files = []
  for (const item of results) {
    const fileProp = item.properties?.files
    const fileList =
      fileProp?.type === 'files' ? fileProp.files : fileProp?.files
    const image = fileList?.[0]
    const indexProp = item.properties?.index
    const index =
      indexProp?.type === 'number' ? indexProp.number ?? 0 : 0

    const url = image?.file?.url || image?.external?.url
    if (!url) continue

    const name = image?.name || 'image'
    const parts = name.split('.')
    files.push({
      index,
      name: parts[0] || name,
      type: parts[1] || 'png',
      url,
    })
  }
  return files.sort((a, b) => a.index - b.index)
}

async function fetchGalleryFromNotion() {
  const auth = process.env.NOTION_API_KEY
  if (!auth) {
    throw new Error(
      'NOTION_API_KEY is not set. Create an integration at notion.so/my-integrations and connect it to the CMS page.'
    )
  }

  const notion = new Client({ auth })
  const database_id =
    process.env.NOTION_GALLERY_ID || DEFAULT_GALLERY_DATABASE_ID

  const allResults = []
  let cursor = undefined

  do {
    const response = await notion.databases.query({
      database_id,
      start_cursor: cursor,
    })
    allResults.push(...response.results)
    cursor = response.has_more ? response.next_cursor : undefined
  } while (cursor)

  return mapNotionResults(allResults)
}

function authorizeGalleryRequest(req) {
  const token =
    process.env.NOTION_CMS_TOKEN || process.env.VUE_APP_NOTION_CMS_TOKEN
  if (!token) return true
  return req.headers.authorization === `Bearer ${token}`
}

function createGalleryHandler() {
  return async (req, res) => {
    if (!authorizeGalleryRequest(req)) {
      res.status(401).send('Unauthorized')
      return
    }
    try {
      const payload = await fetchGalleryFromNotion()
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=1800, stale-while-revalidate=600'
      )
      res.json(payload)
    } catch (err) {
      console.error('Gallery Notion fetch failed:', err.message)
      res.status(502).json({ error: err.message })
    }
  }
}

module.exports = {
  DEFAULT_GALLERY_DATABASE_ID,
  mapNotionResults,
  fetchGalleryFromNotion,
  createGalleryHandler,
}

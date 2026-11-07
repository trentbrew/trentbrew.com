#!/usr/bin/env node
/**
 * Sync sketchbook gallery images from Notion CMS page into local codebase.
 *
 * Downloads all images from Notion to public/sketchbook/ and updates
 * src/data/sketchbook.js and public/data/gallery-fallback.json.
 *
 * Usage:
 *   npm run gallery:sync
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const PAGE_ID = '14313ed3-c526-445a-8005-42a94896fac0'
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

async function fetchPublicNotionGallery() {
  console.log('Fetching CMS page from Notion public site...')
  const chunkRes = await fetch('https://www.notion.so/api/v3/loadPageChunk', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
    body: JSON.stringify({
      pageId: PAGE_ID,
      limit: 100,
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false,
    }),
  })
  if (!chunkRes.ok) throw new Error(`loadPageChunk failed: HTTP ${chunkRes.status}`)
  const chunk = await chunkRes.json()

  // Find gallery collection
  const collections = Object.values(chunk.recordMap?.collection || {})
  const collectionViews = Object.values(chunk.recordMap?.collection_view || {})
  if (!collections.length || !collectionViews.length) {
    throw new Error('No gallery collection found on Notion page')
  }

  const collectionId = collections[0].value?.id || Object.keys(chunk.recordMap.collection)[0]
  const spaceId = collections[0].value?.space_id || chunk.recordMap.block[PAGE_ID]?.spaceId
  const collectionViewId = collectionViews[0].value?.id || Object.keys(chunk.recordMap.collection_view)[0]

  console.log('Querying collection items...')
  const queryRes = await fetch('https://www.notion.so/api/v3/queryCollection', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
    body: JSON.stringify({
      collection: { id: collectionId, spaceId },
      collectionView: { id: collectionViewId, spaceId },
      loader: {
        type: 'reducer',
        reducers: { collection_group_results: { type: 'results', limit: 200 } },
        sort: [],
        searchQuery: '',
        userTimeZone: 'America/Los_Angeles',
      },
    }),
  })
  if (!queryRes.ok) throw new Error(`queryCollection failed: HTTP ${queryRes.status}`)
  const queryData = await queryRes.json()

  const blockIds = queryData.result?.reducerResults?.collection_group_results?.blockIds || []
  const blocks = queryData.recordMap?.block || {}
  const items = []
  const urlsToSign = []

  for (const id of blockIds) {
    const b = blocks[id]?.value?.value || blocks[id]?.value
    if (!b) continue
    const props = b.properties || {}

    let attachmentUrl = null
    let filename = 'image.png'
    let indexVal = 0
    let title = ''

    for (const [k, v] of Object.entries(props)) {
      if (k === 'title') {
        title = v?.[0]?.[0] || ''
      } else if (Array.isArray(v) && v[0]?.[1]?.[0]?.[0] === 'a') {
        filename = v[0][0] || 'image.png'
        attachmentUrl = v[0][1][0][1]
      } else if (Array.isArray(v) && typeof v[0]?.[0] === 'string' && !isNaN(Number(v[0][0]))) {
        indexVal = Number(v[0][0])
      }
    }

    if (attachmentUrl) {
      items.push({ id, title, index: indexVal, filename, attachmentUrl, blockId: b.id })
      urlsToSign.push({ url: attachmentUrl, permissionRecord: { table: 'block', id: b.id } })
    }
  }

  console.log(`Found ${items.length} items. Signing URLs...`)
  const signedUrls = []
  for (let i = 0; i < urlsToSign.length; i += 30) {
    const batch = urlsToSign.slice(i, i + 30)
    const signRes = await fetch('https://www.notion.so/api/v3/getSignedFileUrls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
      body: JSON.stringify({ urls: batch }),
    })
    const signJson = await signRes.json()
    signedUrls.push(...(signJson.signedUrls || []))
  }

  return { items, signedUrls }
}

async function main() {
  const { items, signedUrls } = await fetchPublicNotionGallery()
  const destDir = join(root, 'public/sketchbook')
  mkdirSync(destDir, { recursive: true })

  console.log(`Downloading ${items.length} images to ${destDir}...`)
  const manifest = []
  let totalBytes = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const signedUrl = signedUrls[i]
    if (!signedUrl) continue

    const ext = extname(item.filename) || '.png'
    const safeTitle = (item.title || `image_${i}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    const safeName = `${String(i).padStart(2, '0')}_${safeTitle}${ext}`
    const filePath = join(destDir, safeName)

    const res = await fetch(signedUrl)
    if (!res.ok) {
      console.warn(`Failed downloading ${item.title}: HTTP ${res.status}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(filePath, buf)
    totalBytes += buf.length

    manifest.push({
      index: item.index,
      title: item.title,
      filename: safeName,
      size: buf.length,
    })
    process.stdout.write('.')
  }

  console.log(`\nDownloaded ${manifest.length} files (${(totalBytes / 1024 / 1024).toFixed(2)} MB).`)

  // Save manifest & data
  const dataItems = manifest
    .map((m) => {
      const ext = extname(m.filename).replace('.', '').toLowerCase()
      return {
        index: m.index,
        name: m.title || m.filename,
        type: ext,
        url: `/sketchbook/${m.filename}`,
      }
    })
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))

  const jsonPath = join(root, 'public/data/gallery-fallback.json')
  const jsPath = join(root, 'src/data/sketchbook.js')
  writeFileSync(jsonPath, JSON.stringify(dataItems, null, 2) + '\n')
  writeFileSync(jsPath, `export default ${JSON.stringify(dataItems, null, 2)};\n`)
  writeFileSync(join(destDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

  console.log(`Updated ${jsPath} and ${jsonPath}.`)
  console.log('Sketchbook images are now synced into the codebase!')
}

main().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})

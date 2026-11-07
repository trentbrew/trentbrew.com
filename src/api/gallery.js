import http from '@/api/http'
import sketchbookImages from '@/data/sketchbook'

export function sortGallery(items) {
  if (!Array.isArray(items)) return []
  return [...items].sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
}

/**
 * Sketchbook images:
 * Stored locally in the codebase (public/sketchbook) for permanent availability,
 * zero-latency loading, and immunity to Notion signed URL expiration.
 * Can optionally fetch from Notion CMS API if configured.
 */
export async function fetchGalleryImages() {
  if (process.env.VUE_APP_NOTION_CMS_URL === 'external') {
    try {
      const res = await http.get('/api/v1/gallery')
      if (Array.isArray(res.data) && res.data.length > 0) {
        return sortGallery(res.data)
      }
    } catch (err) {
      console.warn('Gallery: live Notion request failed, using local images.', err)
    }
  }

  // Codebase-stored sketchbook images (79 illustrations)
  if (Array.isArray(sketchbookImages) && sketchbookImages.length > 0) {
    return sortGallery(sketchbookImages)
  }

  return []
}

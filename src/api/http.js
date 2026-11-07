import axios from 'axios'

// Same-origin /api/v1/gallery (dev server or Vercel function → Notion CMS database).
const baseURL =
  process.env.VUE_APP_NOTION_CMS_URL === 'external'
    ? process.env.VUE_APP_NOTION_CMS_HOST || 'https://notioncms.vercel.app'
    : ''

const headers = process.env.VUE_APP_NOTION_CMS_TOKEN
  ? { Authorization: `Bearer ${process.env.VUE_APP_NOTION_CMS_TOKEN}` }
  : {}

const http = axios.create({
  baseURL,
  headers,
})

export default http

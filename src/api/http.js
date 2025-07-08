import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_NOTION_CMS_URL,
  headers: {
    Authorization: 'Bearer ' + process.env.VUE_APP_NOTION_CMS_TOKEN,
  },
})

export default http

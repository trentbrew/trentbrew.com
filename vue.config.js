const { createGalleryHandler } = require('./server/notion-gallery.cjs')

const notionCmsUrl =
  process.env.VUE_APP_NOTION_CMS_URL || 'https://notioncms.vercel.app'
const useLocalNotionGallery = Boolean(process.env.NOTION_API_KEY)

module.exports = {
  devServer: {
    disableHostCheck: true,
    before(app) {
      if (useLocalNotionGallery) {
        app.get('/api/v1/gallery', createGalleryHandler())
      }
    },
    ...(useLocalNotionGallery
      ? {}
      : {
          proxy: {
            '/api': {
              target: notionCmsUrl,
              changeOrigin: true,
              secure: true,
            },
          },
        }),
  },
  css: {
    extract: { ignoreOrder: true },
    loaderOptions: {
      scss: {
        prependData: "@import '@/global/_variables.scss';",
      },
    },
  },
};

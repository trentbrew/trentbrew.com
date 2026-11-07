/**
 * Bundled placeholders for local dev when notioncms.vercel.app is down.
 * Replace by re-enabling the API or running `pnpm gallery:sync`.
 */
export default [
  {
    index: 0,
    name: 'playground',
    type: 'png',
    url: require('@/content/logo/playground/playground.png'),
  },
  {
    index: 1,
    name: 'playground-banner',
    type: 'png',
    url: require('@/content/logo/playground/banner.png'),
  },
  {
    index: 2,
    name: 'hgc',
    type: 'png',
    url: require('@/content/logo/HGC/final.png'),
  },
  {
    index: 3,
    name: 'podular',
    type: 'png',
    url: require('@/content/logo/podular.us/final.png'),
  },
  {
    index: 4,
    name: 'achoo',
    type: 'gif',
    url: require('@/content/animations/achoo.gif'),
  },
  {
    index: 5,
    name: 'ohai',
    type: 'gif',
    url: require('@/content/animations/ohai.gif'),
  },
]

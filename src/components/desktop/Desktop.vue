<script>
import { uid } from 'uid/secure'
import { Draggable } from 'draggable-vue-directive'
import Dock from '@/components/desktop/Dock.vue'
import Window from '@/components/desktop/Window.vue'
import Work from '@/components/content/Work.vue'
import Art from '@/components/content/Art.vue'
import Terminal from '@/components/content/Terminal.vue'
import Resume from '@/components/content/Resume.vue'
import GradientMesh from '@/components/GradientMesh.vue'
import Gallery from '@/components/content/Gallery.vue'
import About from '@/components/content/About.vue'
import WIP from '../content/WIP.vue'
import Blog from '@/components/content/Blog.vue'
import Shop from '@/components/content/Shop.vue'
import Topbar from '@/components/topbar/Topbar.vue'
import Ribbons from '@/components/Ribbons.vue'

const playlist = {
  type: 'playlist',
  id: '7uUkcVP0SpSzyt9UUS9AJT',
}

export default {
  name: 'Desktop',
  directives: {
    Draggable,
  },
  components: {
    Dock,
    Window,
    Work,
    Terminal,
    Resume,
    GradientMesh,
    Gallery,
    About,
    Blog,
    Ribbons,
  },
  data() {
    return {
      windows: [],
      activeWindows: [],
      zBuffer: [],
      zBufferSet: [],
      clicked: null,
      stretch: false,
      fullscreen: false,
      dividerIndex: 5,
      dockItems: [
        {
          icon: 'music.svg',
          label: "What I'm Listening To",
          slug: 'music',
          embed: `https://open.spotify.com/embed/${playlist.type}/${playlist.id}?utm_source=generator&theme=0`,
          windowWidth: 680,
          windowHeight: 420,
        },
        {
          icon: 'document.svg',
          label: 'CV',
          slug: 'cv',
          embed: 'https://trentbrew-cv.framer.website/',
          windowWidth: 900,
          windowHeight: 380,
          center: true,
        },
        {
          icon: 'doodles.svg',
          label: 'Sketchbook',
          slug: 'sketchbook',
          component: Art,
          windowWidth: 800,
          windowHeight: 400,
        },
        {
          icon: 'folder.svg',
          label: 'Playground',
          slug: 'work',
          component: Work,
          windowWidth: 1000,
          windowHeight: 400,
        },
        {
          icon: 'garden.svg',
          label: 'Writing',
          slug: 'writing',
          embed: 'https://www.brew.build?theme=dark',
          center: true,
          windowWidth: 1000,
          windowHeight: 500,
        },
        {
          icon: 't_color.svg',
          label: 'Twixxer',
          link: 'https://x.com/trent_brew',
          newtab: true,
        },
        {
          icon: 'gh.svg',
          label: 'GitHub',
          link: 'https://github.com/trentbrew',
          newtab: true,
        },
        {
          icon: 'shop.svg',
          label: 'Shop coming soon',
          slug: 'shop',
          component: WIP,
          windowWidth: 700,
          windowHeight: 450,
        },
        {
          icon: 'mail.svg',
          label: 'Book a call',
          slug: 'call',
          embed: 'https://cal.com/trent-brew-qvjrye/reference-schedule?embed=true&overlayCalendar=true',
          windowWidth: 917,
          windowHeight: 522,
          center: true,
        },
      ],
    }
  },
  props: {
    popup: Boolean,
  },
  computed: {
    window: () => window,
    console: () => console,
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
    Work: () => Work,
    Resume: () => Resume,
    About: () => About,
  },
  mounted() {
    console.clear()
    const initialHash = window.location.hash
    const hostname = window.location.hostname.split('.')
    console.log('hostname', hostname)
    const subdomain = hostname.length > 1 ? hostname[0] : null
    console.log('subdomain', subdomain)
    if (['gidget', 'timer', 'deepwork'].includes(subdomain)) {
      window.location.href = 'https://trentbrew.com/tv'
    }
    if (
      window.location.pathname == '/desktop' ||
      window.location.pathname == '/desktop/'
    ) {
      this.pushWindow({
        title: 'CV',
        slug: 'cv',
        embed: 'https://api.trentbrew.com/cv-framer',
        deproxy: 'https://api.trentbrew.com/cv-framer',
        width: 900,
        height: 380,
        center: true,
      })
    } else {
      this.$watch('popup', () => {
        setTimeout(() => {
          this.pushWindow({
            title: 'Terminal',
            slug: 'terminal',
            component: Terminal,
            width: 600,
            height: 400,
            center: true,
          })
        }, 2000)
      })
    }
    this.$root.$on('closedWindow', (window) => {
      const win = this.windows.find((w) => w.id === window.id)
      if (win) win.closed = true
      const idx = this.activeWindows.indexOf(window.title)
      if (idx > -1) this.activeWindows.splice(idx, 1)
      this.$root.$emit('windowSelected', this.zBufferSet[1])
      this.syncHash()
    })
    this.$root.$on('windowSelected', (id) => {
      if (id != this.zBuffer[0]) {
        this.zBufferUpdate(id)
      }
    })
    this.$root.$on('windowGeometry', (geometry) => {
      this.saveWindowGeometry(geometry.slug, geometry)
    })
    this.$root.$on('cardClicked', (project) => {
      if (project.wip) {
        this.pushWindow({
          title: '⏳ In development',
          image: 'animations/comingsoon.gif',
          width: 360,
          height: 275,
          center: true,
        })
      } else if (project.content.link) {
        window.open(project.content.link, '_blank')
      } else {
        this.pushWindow({
          title:
            project.title == "Don't Touch the Walls"
              ? 'Play on your phone!'
              : project.title,
          embed: project.content.embed || null,
          link: project.content.link || null,
          image: project.content.image || null,
          video: project.content.video || null,
          casestudy: project.content.casestudy || null,
          width: parseInt(project.dims.split('x')[0]),
          height: parseInt(project.dims.split('x')[1]),
          center: true,
        })
      }
    })
    this.$root.$on('galleryClicked', (image) => {
      this.pushWindow({
        title: ' ',
        image: image,
        width: 400,
        height: 400,
      })
    })
    this.dockItems.forEach((item) => {
      item = { ...item, open: false }
    })
    window.addEventListener('hashchange', this.onHashChange)
    this.openHashWindows(initialHash)
    window.addEventListener('keyup', (e) => {
      ; (e.key == 't' || e.key == 'T') &&
        this.pushWindow({
          title: 'Terminal',
          slug: 'terminal',
          component: Terminal,
          width: 600,
          height: 400,
          center: true,
        })
    })
  },
  destroyed() {
    window.removeEventListener('keyup', (e) => { })
    window.removeEventListener('hashchange', this.onHashChange)
  },
  methods: {
    handleItemClick(index) {
      this.clicked = index
    },
    slugify(str) {
      return String(str || '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
    saveWindowGeometry(slug, geometry) {
      if (!slug || !geometry) return
      try {
        const all = JSON.parse(
          localStorage.getItem('trentbrew.windowGeometry') || '{}'
        )
        all[slug] = {
          width: geometry.width,
          height: geometry.height,
          left: geometry.left,
          top: geometry.top,
        }
        localStorage.setItem('trentbrew.windowGeometry', JSON.stringify(all))
      } catch (e) {}
    },
    loadWindowGeometry(slug) {
      if (!slug) return null
      try {
        const all = JSON.parse(
          localStorage.getItem('trentbrew.windowGeometry') || '{}'
        )
        return all[slug] || null
      } catch (e) {
        return null
      }
    },
    syncHash() {
      const slugs = this.windows
        .filter((w) => !w.closed)
        .map((w) => w.slug)
        .filter(Boolean)
      const next = slugs.length ? '#' + slugs.join(',') : window.location.pathname
      if (window.location.hash !== (slugs.length ? '#' + slugs.join(',') : '')) {
        history.replaceState(null, '', next)
      }
    },
    windowFromDock(item) {
      return {
        title: item.label || 'Title',
        slug: item.slug || null,
        link: item.link || null,
        embed: item.embed || null,
        component: item.component || null,
        image: item.image || null,
        width: item.windowWidth || 600,
        height: item.windowHeight || 400,
        positionX: item.windowPositionX || this.getRandomX(),
        positionY: item.windowPositionY || this.getRandomY(),
        center: item.center,
      }
    },
    openHashWindows(hash) {
      ;(hash || window.location.hash)
        .replace(/^#/, '')
        .split(',')
        .filter(Boolean)
        .forEach((slug) => {
          const item = this.dockItems.find((i) => i.slug === slug)
          if (item && !item.link) this.pushWindow(this.windowFromDock(item))
        })
    },
    onHashChange() {
      const desired = new Set(
        window.location.hash.replace(/^#/, '').split(',').filter(Boolean)
      )
      const open = new Set(
        this.windows.filter((w) => !w.closed).map((w) => w.slug)
      )
      desired.forEach((slug) => {
        if (!open.has(slug)) {
          const item = this.dockItems.find((i) => i.slug === slug)
          if (item && !item.link) this.pushWindow(this.windowFromDock(item))
        }
      })
    },
    pushWindow(data) {
      const slug = data.slug || this.slugify(data.title || '')
      const existing = slug
        ? this.windows.find((w) => !w.closed && w.slug === slug)
        : null
      if (existing) {
        this.zBufferUpdate(existing.id)
        this.$root.$emit('windowSelected', existing.id)
        this.syncHash()
        return
      }
      this.windows = this.windows.filter((w) => !w.closed)
      const windowData = { ...data, slug }
      const saved = slug ? this.loadWindowGeometry(slug) : null
      if (saved) {
        windowData.width = saved.width
        windowData.height = saved.height
        windowData.left = saved.left
        windowData.top = saved.top
      }
      this.windows.push(windowData)
      var latest = this.windows[this.windows.length - 1]
      latest.id = uid(8)
      this.zBufferUpdate(latest.id)
      if (!this.activeWindows.includes(latest.title))
        this.activeWindows.push(latest.title)
      this.syncHash()
    },
    zBufferUpdate(id) {
      // [0] is top of z-index
      this.zBuffer = [id, ...this.zBuffer]
      this.zBufferSet = Array.from(new Set(this.zBuffer))
    },
    random(min, max) {
      Math.random() * (max - min) + min
    },
    getRandomX() {
      return this.random(0, this.maxW - 24)
    },
    getRandomY() {
      return this.random(0, this.maxH - 24)
    },
  },
}
</script>

<template>
  <div class="desktop-container" :style="stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'
    ">
    <div class="backdrop">
      <!-- <GradientMesh :index="3" /> -->
      <Ribbons />
    </div>
    <div ref="desktop" class="desktop">
      <!-- <Topbar /> -->
      <Window v-for="(window, index) in windows" :key="window.id" :index="index" :id="window.id" :title="window.title"
        :initialWidth="window.width" :initialHeight="window.height" :center="window.center" :initialLeft="window.left"
        :initialTop="window.top" :slug="window.slug" :embed="window.embed" :video="window.video">
        <template v-if="window.embed">
          <iframe :data-context="window.embed.includes('spotify.com')
            ? 'spotify'
            : window.embed.includes('https://api.trentbrew.com/cv-framer')
              ? 'cv'
              : window.embed.includes('brew.build')
                ? 'brew'
                : null
            " :id="window.id" :src="window.embed" frameborder="0"></iframe>
        </template>

        <template v-if="window.component">
          <component :is="window.component"></component>
        </template>

        <template v-if="window.image">
          <div style="overflow: hidden">
            <img class="content-image" :src="window.image" style="border-radius: 8px; width: 100%; max-height: 100%" />
          </div>
        </template>

        <template v-if="window.video">
          <div style="overflow: hidden; width: 100%; height: 100%' background: black; border-radius: 8px;">
            <video :id="window.id" :src="require(`@/content/${window.video}`)" class="video" width="100%" height="100%"
              autoplay controls muted />
          </div>
        </template>

        <template v-if="window.casestudy">
          <div style="overflow: auto; border-radius: 8px; padding-right: 12px">
            <img :src="require(`@/content/${window.casestudy}`)" style="width: 100%" />
          </div>
        </template>
      </Window>
    </div>
    <Dock :hide="fullscreen">
      <div v-for="(item, index) in dockItems" :key="index" :style="`${item.newtab && 'cursor: pointer;'} ${index === dividerIndex && 'margin-left: 28px;'
        }`" class="dock-item" @click="
          item.link
            ? window.open(item.link, '_blank')
            : pushWindow({
              title: item.label || 'Title',
              slug: item.slug || null,
              link: item.link || null,
              embed: item.embed || null, // String
              component: item.component || null, // Component
              image: item.image || null, // String
              width: item.windowWidth || 600, // Number
              height: item.windowHeight || 400, // Nmuber
              positionX: item.windowPositionX || getRandomX(), // Number
              positionY: item.windowPositionY || getRandomY(), // Number
              center: item.center,
            })
          ">
        <div v-if="index === dividerIndex" class="divider"></div>
        <div class="tooltip flex-center absolute">
          <span style="text-wrap: nowrap">{{ item.label }}</span>
          <div v-if="item.newtab" class="newtab"></div>
        </div>
        <div class="dock-icon" :style="`background-image: url('${require(`@/assets/icons/${item.icon}`)}')`">
          <!-- <div
            v-if="index === 0"
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background: #9d555d;
              height: 24px;
              width: 24px;
              position: absolute;
              left: 60px;
              top: 10px;
              border-radius: 100%;
              font-weight: bold;
            "
          >
            <b style="color: white; font-size: 12px; line-height: 24px">2</b>
          </div> -->
        </div>
        <div class="active-indicator" :style="activeWindows.includes(item.label)
          ? 'height: 4px; opacity: 1;'
          : 'height: 0px; opacity: 0;'
          "></div>
      </div>
    </Dock>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100%;
}

iframe {
  zoom: 0.8;
  -moz-transform: scale(0.8);
  -moz-transform-origin: 0 0;
}

iframe[data-context='spotify'],
iframe[data-context='cv'],
iframe[data-context='brew'] {
  zoom: 1 !important;
  -moz-transform: scale(1) !important;
  -moz-transform-origin: 0 0 !important;
}

.content-image {
  border: $bordered;
}

.divider {
  position: fixed;
  width: 1px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-46px);
  transition: 200ms;
  pointer-events: none;
}

.newtab {
  background-image: url('../../assets/icons/newtab.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 14px;
  height: 14px;
  margin-left: 6px;
  opacity: 0.5;
  filter: invert(0);
}

.item-container {
  // desktop item
  padding: 24px 18px 18px 18px;
  border-radius: $rad;

  .icon {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 56px;
    width: 56px;
    margin-bottom: 12px;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: white;
  }

  &:hover {
    background: #222222;
  }
}

.backdrop {
  position: absolute;
  height: $ui_height;
  width: $ui_width;
  border-radius: $rad;
  background-image: url('../../assets/wallpapers/tb.png');
  // background-image: radial-gradient(
  //   circle at 1px 1px,
  //   #ffffff12 1px,
  //   transparent 0
  // );
  // background-size: 50px 30px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  //background: #161616;
  //filter: brightness(0.8);
}

.desktop-container {
  background: linear-gradient($bezel_color, $bezel_color);
}

.desktop {
  width: 100%;
  height: 100%;
  border-radius: $rad;
  position: relative;
  transform-origin: center center;
  user-select: none;
  transition: transform 0.1s ease;

  &:active {
    cursor: grabbing;
  }
}

video {
  object-fit: cover;
  border-radius: $rad;
  width: calc(100vw - $bezel_width * 2);
  height: 100%;
}

.dock-item {
  display: flex;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 12px 9px;
  transition: 150ms ease;

  .active-indicator {
    position: absolute;
    bottom: 0px;
    width: 8px;
    background: white;
    border-radius: 12px 12px 0px 0px;
    transition: 300ms;
  }

  .tooltip {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-64px);
    padding: 12px 18px;
    border: $bordered;
    border-radius: 32px;
    transition: 150ms;
    color: $active_text;
    background: #161616;
    backdrop-filter: $blur;
  }

  .dock-icon {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: 150ms;
  }

  &:hover {
    .dock-icon {
      transform: translateY(-8px);
    }

    .tooltip {
      opacity: 1;
      transform: translateY(-80px);
    }
  }

  &:active {
    .dock-icon {
      transform: translateY(-8px) scale(0.9);
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(white, 1);
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(white, 0.4);
}

.pulse {
  margin: 100px;
  display: block;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #cca92c;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
  animation: pulse 2s infinite;
}

.pulse:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }

  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }

  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}

@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }

  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }

  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
</style>

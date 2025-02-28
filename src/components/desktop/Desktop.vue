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
      // Shop,
      Topbar,
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
            embed:
              'https://open.spotify.com/embed/playlist/7uUkcVP0SpSzyt9UUS9AJT?si=eOBntkOnToCOpjB4oVqymA?utm_source=generator&theme=0',
            windowWidth: 680,
            windowHeight: 420,
          },
          {
            icon: 'document.svg',
            label: 'CV',
            embed: 'https://api.trentbrew.com/trentbrew',
            windowWidth: 900,
            windowHeight: 380,
            center: true,
          },
          {
            icon: 'doodles.svg',
            label: 'Sketchbook',
            component: Art,
            windowWidth: 800,
            windowHeight: 400,
          },
          {
            icon: 'folder.svg',
            label: 'Playground',
            component: Work,
            windowWidth: 1000,
            windowHeight: 400,
          },
          {
            icon: 'garden.svg',
            label: 'Writing',
            embed: 'https://brew.build',
            center: true,
            windowWidth: 1000,
            windowHeight: 500,
          },
          {
            icon: 'bluesky.svg',
            label: 'Bluesky',
            link: 'https://bsky.app/profile/trentbrew.com',
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
            component: WIP,
            windowWidth: 700,
            windowHeight: 450,
          },
          {
            icon: 'mail.svg',
            label: 'Mail',
            link: 'mailto:hello@trentbrew.com',
            newtab: true,
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
          embed: 'https://api.trentbrew.com/trentbrew',
          deproxy: 'https://read.cv/trentbrew',
          width: 900,
          height: 380,
          center: true,
        })
      } else {
        this.$watch('popup', () => {
          setTimeout(() => {
            this.pushWindow({
              title: 'Terminal',
              component: Terminal,
              width: 600,
              height: 400,
              center: true,
            })
          }, 2000)
        })
      }
      this.$root.$on('closedWindow', (window) => {
        this.$root.$emit('windowSelected', this.zBufferSet[1])
        this.activeWindows.splice(this.activeWindows.indexOf(window.title), 1)
      })
      this.$root.$on('windowSelected', (id) => {
        if (id != this.zBuffer[0]) {
          this.zBufferUpdate(id)
        }
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
      window.addEventListener('keyup', (e) => {
        ;(e.key == 't' || e.key == 'T') &&
          this.pushWindow({
            title: 'Terminal',
            component: Terminal,
            width: 600,
            height: 400,
            center: true,
          })
      })
    },
    destroyed() {
      window.removeEventListener('keyup', (e) => {})
    },
    methods: {
      handleItemClick(index) {
        this.clicked = index
      },
      pushWindow(data) {
        this.windows.push(data)
        var latest = this.windows[this.windows.length - 1]
        latest.id = uid(8)
        this.zBufferUpdate(latest.id)
        if (!this.activeWindows.includes(latest.id))
          this.activeWindows.push(latest.title)
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
  <div
    class="desktop-container"
    :style="
      stretch ? 'height: calc(100vh - 24px);' : 'height: calc(100vh - 48px);'
    "
  >
    <div class="backdrop">
      <!-- <GradientMesh :index="3" /> -->
      <Ribbons />
    </div>
    <div ref="desktop" class="desktop">
      <!-- <Topbar /> -->
      <Window
        v-for="(window, index) in windows"
        :key="index"
        :index="index"
        :id="window.id"
        :title="window.title"
        :initialWidth="window.width"
        :initialHeight="window.height"
        :center="window.center"
        :embed="window.embed"
        :video="window.video"
      >
        <template v-if="window.embed">
          <iframe
            :data-context="
              window.embed.includes('spotify.com')
                ? 'spotify'
                : window.embed.includes('api.trentbrew.com')
                ? 'cv'
                : null
            "
            :id="window.id"
            :src="window.embed"
            frameborder="0"
          ></iframe>
        </template>

        <template v-if="window.component">
          <component :is="window.component"></component>
        </template>

        <template v-if="window.image">
          <div style="overflow: hidden">
            <img
              class="content-image"
              :src="window.image"
              style="border-radius: 8px; width: 100%; max-height: 100%"
            />
          </div>
        </template>

        <template v-if="window.video">
          <div
            style="overflow: hidden; width: 100%; height: 100%' background: black; border-radius: 8px;"
          >
            <video
              :id="window.id"
              :src="require(`@/content/${window.video}`)"
              class="video"
              width="100%"
              height="100%"
              autoplay
              controls
              muted
            />
          </div>
        </template>

        <template v-if="window.casestudy">
          <div style="overflow: auto; border-radius: 8px; padding-right: 12px">
            <img
              :src="require(`@/content/${window.casestudy}`)"
              style="width: 100%"
            />
          </div>
        </template>
      </Window>
    </div>
    <Dock :hide="fullscreen">
      <div
        v-for="(item, index) in dockItems"
        :key="index"
        :style="`${item.newtab && 'cursor: pointer;'} ${
          index === dividerIndex && 'margin-left: 28px;'
        }`"
        class="dock-item"
        @click="
          item.link
            ? window.open(item.link, '_blank')
            : pushWindow({
                title: item.label || 'Title',
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
        "
      >
        <div v-if="index === dividerIndex" class="divider"></div>
        <div class="tooltip flex-center absolute">
          <span style="text-wrap: nowrap">{{ item.label }}</span>
          <div v-if="item.newtab" class="newtab"></div>
        </div>
        <div
          class="dock-icon"
          :style="`background-image: url('${require(`@/assets/icons/${item.icon}`)}')`"
        >
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
        <div
          class="active-indicator"
          :style="
            activeWindows.includes(item.label)
              ? 'height: 4px; opacity: 1;'
              : 'height: 0px; opacity: 0;'
          "
        ></div>
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
  iframe[data-context='cv'] {
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

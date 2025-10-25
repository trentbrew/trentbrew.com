<script>
import Card from '@/components/content/Card.vue'
import Gallery from '@/components/content/Gallery.vue'
import Resume from '@/components/content/Resume.vue'

export default {
  components: {
    Card,
    Gallery,
    Resume,
  },
  data() {
    return {
      category: '',
      categoryCaption: '',
      projects: [
        // ----------------- WEB -----------------
        {
          title: 'GSAP Studio',
          category: 'Web',
          description: 'Collaborative AI animation tool',
          stack: ['NextJS', 'InstantDB', 'OpenAI'],
          thumb: require('@/content/UX/gsapstudio/img.gif'),
          content: {
            link: 'https://gsap-editor-web.vercel.app/editor',
          },
          newtab: true,
        },
        {
          title: 'CodeHQ',
          category: 'Web',
          description: 'Project-scoped agentic knowledge graph',
          stack: ['React', 'OpenAI'],
          thumb: require('@/content/UX/code-hq/video.gif'),
          content: {
            link: 'https://www.npmjs.com/package/code-hq',
          },
          newtab: true,
        },
        {
          title: 'Amorphous',
          category: 'Web',
          description: 'A canvas for everything',
          stack: ['Svelte', 'Zerosync'],
          thumb: require('@/content/UX/amorphous/1.gif'),
          content: {
            link: 'https://amorphous.brew.build',
          },
          newtab: true,
        },
        {
          title: 'Zen Timer (Chrome Extension)',
          category: 'Web',
          description: 'A minimalist general purpose timer',
          stack: ['Vue'],
          thumb: require('@/content/UX/zen-timer/zentimer.gif'),
          content: {
            link: 'https://chromewebstore.google.com/detail/zen-timer/blhcjlpiphllfghbhlbblfajnnhifehk',
          },
          newtab: true,
        },
        {
          title: 'Geodata Playground',
          category: 'Web',
          description: '3D geodata visualization powered by DeckGL',
          stack: ['Vue', 'WebGL'],
          thumb: require('@/content/UX/decker/dgl.gif'),
          content: { embed: 'https://deckgl-playground.web.app/' },
          center: true,
          dims: '1100x650',
        },
        {
          title: 'Iconic',
          category: 'Web',
          description: 'REST API for SVG icons',
          stack: ['Vue', 'Node', 'Express'],
          thumb: require('@/content/UX/iconic/iconic.gif'),
          content: { embed: 'https://www.iconic.rest/' },
          center: true,
          dims: '1200x650',
        },
        {
          title: 'Brevity',
          category: 'Web',
          description: 'A minimalistic generative writing app (WIP)',
          stack: ['Svelte', 'Gemini'],
          thumb: require('@/content/UX/brevity/brevity.gif'),
          content: { embed: 'https://brevity-frontend.vercel.app/' },
          center: true,
          dims: '1040x600',
        },
        {
          title: 'Solar System',
          description: 'Explore the planets of the solar system',
          stack: ['HTML5', 'JQuery'],
          thumb: require('@/content/games/solar-system/hellofromspace.gif'),
          category: 'Web',
          content: { embed: 'https://trentbrew.github.io/solar-system-map/' },
          center: true,
          dims: '1100x650',
        },

        {
          title: 'AI DJ',
          description: 'Music discovery powered by AI',
          stack: ['HTML5', 'Node', 'Express', 'Gemini'],
          thumb: require('@/content/UX/dj/dj2.gif'),
          category: 'Web',
          content: { embed: 'https://dj-gemini.vercel.app' },
          center: true,
          dims: '1100x650',
        },
        {
          title: 'Drummerboi',
          description: 'Tap to make music',
          stack: ['HTML5', 'JQuery'],
          thumb: require('@/content/games/drummerboi/drummerboi.gif'),
          category: 'Web',
          content: {
            link: 'https://trentbrew.github.io/drummerboi-sampler/',
          },
          newtab: true,
        },

        {
          title: 'Google Drive Downloader',
          category: 'Web',
          description: 'Convert Google Drive links for direct download',
          stack: ['Vue'],
          thumb: require('@/content/UX/downloadify/downloadify.gif'),
          content: { embed: 'https://gumbo-widgets.vercel.app/googledrive' },
          center: true,
          dims: '1100x650',
        },

        {
          title: 'Fancy Forms',
          category: 'Web',
          description: 'Sandbox for form design & input validation',
          stack: ['Vue'],
          thumb: require('@/content/UX/fancy-forms/fancy-form.gif'),
          content: { embed: 'https://trentbrew.github.io' },
          center: true,
          dims: '1100x650',
        },
        // ----------------- GAMES -----------------
        {
          title: 'Lost Things',
          description: 'Totally not battleship',
          stack: ['HTML5', 'JQuery'],
          thumb: require('@/content/games/jpuzzle/puzzle.gif'),
          category: 'Games',
          content: { link: 'https://trentbrew.github.io/lost-things/' },
          newtab: true,
        },
        {
          title: 'Sonic GX',
          description: 'Sonic the Hedhehog platformer released in 2010',
          stack: ['GameMaker', 'Windows'],
          thumb: require('@/content/games/sonic-gx/sonicgx2.gif'),
          category: 'Games',
          content: { link: 'https://gamejolt.com/games/sonicgx/689002' },
          newtab: true,
        },
        {
          title: 'Sonic Velocity',
          description: 'Sonic the Hedgehog infinite runner released in 2014',
          stack: ['GameMaker', 'Windows'],
          thumb: require('@/content/games/sonic-velocity/sv-skyward-terminal.gif'),
          category: 'Games',
          content: {
            link: 'https://gamejolt.com/games/sonic-velocity/18934',
          },
          newtab: true,
        },
        {
          title: "Don't Touch the Walls",
          description: 'Tilt your phone to solve the maze',
          stack: ['HTML5', 'p5js'],
          thumb: require('@/content/games/walls/img1.gif'),
          category: 'Games',
          content: {
            embed:
              'https://trentbrew.pockethost.io/api/files/swvnum16u65or8w/b4rp2t947h5p4z8/qr79D4c80BeK_FA6d8n9gcU.png?token=',
          },
          dims: '420x420',
        },
        // ----------------- DESIGN -----------------
        {
          title: 'Logo Playground',
          description: 'Design experiments and other work',
          stack: ['Figma'],
          thumb: require('@/content/logo/playground/banner.png'),
          category: 'Logo',
          content: { casestudy: 'logo/playground/playground.png' },
          dims: '1000x500',
        },
        {
          title: 'Placeholder',
          category: 'Logo',
        },
        {
          title: 'Placeholder',
          category: 'Logo',
        },
        {
          title: 'Placeholder',
          category: 'Logo',
        },
        {
          title: 'Placeholder',
          category: 'Logo',
        },
        // ----------------- ANIMATION -----------------
        {
          title: 'Socially Anxious Apple',
          description: '🕒 0:19',
          stack: ['Stop-Motion'],
          thumb: require('@/content/animations/anxiousapple-thumb.gif'),
          category: 'Animation',
          content: { video: 'animations/anxiousapple.mp4' },
          dims: '1000x450',
        },
        {
          title: 'Bless You',
          description: '🕒 0:13',
          stack: ['Procreate'],
          thumb: require('@/content/animations/achoo.gif'),
          category: 'Animation',
          content: { video: 'animations/achoo.mp4' },
          dims: '1000x450',
        },
        {
          title: 'The Begining of a Beautiful Friendship',
          description: '🕒 0:41',
          stack: ['AdobeAnimate'],
          thumb: require('@/content/animations/friends-thumb.gif'),
          category: 'Animation',
          content: { video: 'animations/friends.mp4' },
          dims: '1000x450',
        },
        {
          title: 'Sleeyhead',
          description: '🕒 0:08',
          stack: ['Loom'],
          thumb: require('@/content/animations/sleepyhead.gif'),
          category: 'Animation',
          content: { video: 'animations/sleepyhead.mp4' },
          dims: '1000x450',
        },
        {
          title: 'Smileys',
          description: '🕒 0:10',
          stack: ['Loom'],
          thumb: require('@/content/animations/smileys-thumb.gif'),
          category: 'Animation',
          content: { video: 'animations/smileys.mp4' },
          dims: '1000x450',
        },
        {
          title: 'Pebble Head',
          description: '🕒 0:20',
          stack: ['Stop-Motion'],
          thumb: require('@/content/animations/pebble-thumb.gif'),
          category: 'Animation',
          content: { video: 'animations/pebble.mp4' },
          dims: '1000x450',
        },
      ],
    }
  },
  mounted() {
    this.updateCategory('Web')
  },
  methods: {
    updateCategory(category) {
      this.scroll = 0
      this.category = category
    },
  },
}
</script>

<template>
  <div class="app">
    <div class="wrapper">
      <div class="left-side">
        <div class="side-wrapper">
          <div class="side-title">Interactive</div>
          <div class="side-menu">
            <!-- <a :class="category == 'Apps' && 'category-active'" @click="updateCategory('Apps')" href="#">
      <div class="item-left">
        <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M0 331v112.295a14.996 14.996 0 007.559 13.023L106 512V391L0 331zM136 391v121l105-60V331zM271 331v121l105 60V391zM406 391v121l98.441-55.682A14.995 14.995 0 00512 443.296V331l-106 60zM391 241l-115.754 57.876L391 365.026l116.754-66.15zM262.709 1.583a15.006 15.006 0 00-13.418 0L140.246 57.876 256 124.026l115.754-66.151L262.709 1.583zM136 90v124.955l105 52.5V150zM121 241L4.246 298.876 121 365.026l115.754-66.15zM271 150v117.455l105-52.5V90z" />
        </svg>
        Apps
      </div>
     </a> -->

            <div class="side-menu">
              <a :class="category == 'Web' && 'category-active'" @click="updateCategory('Web')" href="#">
                <div class="item-left">
                  <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15 300H211V360H136H133C124.716 360 118 366.716 118 375C118 383.284 124.716 390 133 390H136H271H318C326.284 390 333 383.284 333 375C333 366.716 326.284 360 318 360H271H241V300H256H271H436C444.284 300 451 293.284 451 285V90V15C451 10.858 449.321 7.108 446.607 4.3935C443.933 1.7197 440.254 0.0505867 436.186 0.00113106C436.124 0.000377655 436.062 0 436 0H256H15C6.716 0 0 6.716 0 15V285C0 293.284 6.716 300 15 300ZM25 32C25 28.6863 27.6863 26 31 26H420C423.314 26 426 28.6863 426 32V266C426 269.314 423.314 272 420 272H31C27.6863 272 25 269.314 25 266V32ZM403 47H49V252H403V47Z" />
                  </svg>
                  Web
                </div>
              </a>
              <a :class="category == 'Games' && 'category-active'" @click="updateCategory('Games')" href="#">
                <div class="item-left">
                  <svg viewBox="0 0 399 396" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M125 74C125 33.1309 158.131 0 199 0C239.869 0 273 33.1309 273 74C273 106.095 252.567 133.418 224 143.671V253H327.803C367.124 253 399 284.876 399 324.197C399 363.519 367.124 395.395 327.803 395.395H71.1974C31.8762 395.395 0 363.519 0 324.197C0 284.876 31.8761 253 71.1974 253H175V144.021C145.911 134.053 125 106.469 125 74Z" />
                  </svg>
                  Games
                </div>
              </a>
            </div>
          </div>
        </div>

        <div class="side-wrapper">
          <div class="side-title">Visual</div>
          <div class="side-menu">
            <a :class="category == 'Logo' && 'category-active'" @click="updateCategory('Logo')" href="#">
              <div class="item-left">
                <svg viewBox="0 0 512 512" fill="currentColor">
                  <circle cx="295.099" cy="327.254" r="110.96" transform="rotate(-45 295.062 327.332)" />
                  <path
                    d="M471.854 338.281V163.146H296.72v41.169a123.1 123.1 0 01121.339 122.939c0 3.717-.176 7.393-.5 11.027zM172.14 327.254a123.16 123.16 0 01100.59-120.915L195.082 73.786 40.146 338.281H172.64c-.325-3.634-.5-7.31-.5-11.027z" />
                </svg>
                Design
              </div>
            </a>
            <a :class="category == 'Animation' && 'category-active'" @click="updateCategory('Animation')" href="#">
              <div class="item-left">
                <svg viewBox="0 0 58 58" fill="currentColor">
                  <path
                    d="M57 6H1a1 1 0 00-1 1v44a1 1 0 001 1h56a1 1 0 001-1V7a1 1 0 00-1-1zM10 50H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2V8h8v9zm26.537 12.844l-11 7a1.007 1.007 0 01-1.018.033A1.001 1.001 0 0124 36V22a1.001 1.001 0 011.538-.844l11 7a1.003 1.003 0 01-.001 1.688zM56 50h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8V8h8v9z" />
                </svg>
                Animation
              </div>
            </a>
            <!--a :class="category == 'Typography' && 'category-active'" @click="updateCategory('Typography')" href="#typography">
      <div class="item-left">
        <svg viewBox="0 0 332 332" fill="currentColor">
        <path d="M282.341 8.283C275.765 2.705 266.211 0 253.103 0c-18.951 0-36.359 5.634-51.756 16.743-14.972 10.794-29.274 28.637-42.482 53.028-4.358 7.993-7.428 11.041-8.973 12.179h-26.255c-10.84 0-19.626 8.786-19.626 19.626 0 8.989 6.077 16.486 14.323 18.809l-.05.165h.589c1.531.385 3.109.651 4.757.651h18.833l-32.688 128.001c-7.208 27.848-10.323 37.782-11.666 41.24-1.445 3.711-3.266 7.062-5.542 10.135-.42-5.39-2.637-10.143-6.508-13.854-4.264-4.079-10.109-6.136-17.364-6.136-8.227 0-15.08 2.433-20.37 7.229-5.416 4.93-8.283 11.193-8.283 18.134 0 5.157 1.701 12.712 9.828 19.348 6.139 4.97 14.845 7.382 26.621 7.382 17.096 0 32.541-4.568 45.891-13.577 13.112-8.845 24.612-22.489 34.166-40.522 9.391-17.678 18.696-45.124 28.427-83.9l18.598-73.479h30.016c10.841 0 19.625-8.785 19.625-19.625s-8.784-19.626-19.625-19.626h-19.628c6.34-21.62 14.175-37.948 23.443-48.578 2.284-2.695 5.246-5.692 8.412-7.678-1.543 3.392-2.325 6.767-2.325 10.055 0 6.164 2.409 11.714 6.909 16.03 4.484 4.336 10.167 6.54 16.888 6.54 7.085 0 13.373-2.667 18.17-7.716 4.76-5.005 7.185-11.633 7.185-19.703.017-9.079-3.554-16.899-10.302-22.618z" />
        </svg>
        Typography
      </div>
     </a-->
          </div>
        </div>

        <!--div class="side-wrapper">
    <div class="side-title">Experiments</div>
    <div class="side-menu">
     <a :class="category == 'Illustration' && 'category-active'" @click="updateCategory('Illustration')" href="#illustration">
      <div class="item-left">
        <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M499.377 46.402c-8.014-8.006-18.662-12.485-29.985-12.613a41.13 41.13 0 00-.496-.003c-11.142 0-21.698 4.229-29.771 11.945L198.872 275.458c25.716 6.555 47.683 23.057 62.044 47.196a113.544 113.544 0 0110.453 23.179L500.06 106.661C507.759 98.604 512 88.031 512 76.89c0-11.507-4.478-22.33-12.623-30.488zM176.588 302.344a86.035 86.035 0 00-3.626-.076c-20.273 0-40.381 7.05-56.784 18.851-19.772 14.225-27.656 34.656-42.174 53.27C55.8 397.728 27.795 409.14 0 416.923c16.187 42.781 76.32 60.297 115.752 61.24 1.416.034 2.839.051 4.273.051 44.646 0 97.233-16.594 118.755-60.522 23.628-48.224-5.496-112.975-62.192-115.348z" />
        </svg>
        Illustration
      </div>
     </a>
     <a :class="category == 'Animation' && 'category-active'" @click="updateCategory('Animation')" href="#animation">
      <div class="item-left">
        <svg viewBox="0 0 58 58" fill="currentColor">
        <path d="M57 6H1a1 1 0 00-1 1v44a1 1 0 001 1h56a1 1 0 001-1V7a1 1 0 00-1-1zM10 50H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2V8h8v9zm26.537 12.844l-11 7a1.007 1.007 0 01-1.018.033A1.001 1.001 0 0124 36V22a1.001 1.001 0 011.538-.844l11 7a1.003 1.003 0 01-.001 1.688zM56 50h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8V8h8v9z" />
        </svg>
        Extensions
      </div>
     </a>
    </div>
   </div-->

        <!-- <div class="side-wrapper">
    <div class="side-title"><hr style="opacity: 0.3" /></div>
    <div class="side-menu">
     <a :class="category == 'Resume' && 'category-active'" @click="updateCategory('Resume')" href="#">
      <div class="item-left">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4z" fill="currentColor"></path><path d="M419.22 188.59L275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41z" fill="currentColor"></path></svg>
        Resume
      </div>
     </a>
    </div>
   </div> -->
      </div>
      <div class="main-container">
        <div class="content-wrapper">
          <div class="content-section" :style="(category == 'Illustration' || category == 'Resume') &&
            'display: block !important'
            ">
            <Card v-for="(project, index) in projects" :key="index" :activeCategory="category" :project="project"
              transition="expand" />
            <!-- <Gallery v-if="category == 'Illustration'" transition="expand" />
            <Resume v-if="category == 'Resume'" /> -->
          </div>
        </div>
      </div>
    </div>
    <div class="overlay-app"></div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono&display=swap');

/* always present */
.expand-transition {
  transition: all 0.3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}

/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter,
.expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

.item-left {
  display: flex;
  align-items: center;
}

:root {
  --theme-bg-color: rgba(16 18 27 / 40%);
  --border-color: rgba(113 119 144 / 25%);
  --theme-color: #f9fafb;
  --inactive-color: rgb(113 119 144 / 78%);
  --body-font: 'Inter', sans-serif;
  --hover-menu-thumb: rgba(12 15 25 / 30%);
  --content-title-color: #999ba5;
  --content-thumb: rgb(146 151 179 / 13%);
  --button-inactive: rgb(249 250 251 / 55%);
  --dropdown-thumb: #21242d;
  --dropdown-hover: rgb(42 46 60);
  --popup-thumb: rgb(22 25 37);
  --search-thumb: #14162b;
  --overlay-thumb: rgba(36, 39, 59, 0.3);
  --scrollbar-thumb: rgb(1 2 3 / 40%);
}

.dark-light {
  position: fixed;
  bottom: 50px;
  right: 30px;
  background-color: var(--dropdown-bg);
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;

  svg {
    width: 24px;
    flex-shrink: 0;
    fill: #ffce45;
    stroke: #ffce45;
    transition: 0.5s;
  }
}

.light-mode {
  .dark-light svg {
    fill: transparent;
    stroke: var(--theme-color);
  }

  .profile-img {
    border: 2px solid var(--theme-bg-color);
  }

  .content-section ul {
    background-color: var(--theme-bg-color);
  }

  .pop-up__title {
    border-color: var(--theme-color);
  }

  .dropdown.is-active ul {
    background-color: rgb(255 255 255 / 94%);
  }
}

body.light-mode:before,
body.light-mode .video-bg:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.72) 0%,
      rgb(255 255 255 / 45%) 100%);
  backdrop-filter: saturate(3);
}

.app {
  background-color: var(--theme-bg-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
}

.wide {

  .header-menu,
  .header-profile {
    display: none;
  }
}

.wrapper {
  display: flex;
  flex-grow: 1;
  overflow: auto;
}

.left-side {
  flex-basis: 180px;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;

  @media screen and (max-width: 945px) {
    display: none;
  }
}

.side-wrapper+.side-wrapper {
  //margin-top: 20px;
}

.side-title {
  color: $active_text;
  opacity: 0.2;
  font-weight: bold;
  margin-bottom: 14px;
  margin-top: 14px;
}

.side-menu {
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  a {
    text-decoration: none;
    color: $active_text;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    padding: 10px;
    font-size: 14px;
    border-radius: $rad;

    &:hover {
      background-color: rgba(black, 0.3);
      transition: 0ms;
    }
  }

  .category-active {
    background-color: rgba(white, 0.1);

    &:hover {
      background-color: rgba(white, 0.06);
    }

    /*&::after {
        content: '';
        background-color: #8EA58F;
        height: 8px;
        width: 8px;
        border-radius: 100%;
        margin-right: 6px;
    }*/
  }

  svg {
    width: 14px;
    margin-left: 4px;
    margin-right: 8px;
  }
}

.main-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 58px;
  flex-shrink: 0;

  .header-menu {
    margin-left: 150px;

    @media screen and (max-width: 1055px) {
      margin: auto;
    }

    a {
      padding: 20px 24px;
    }
  }
}

.main-container {
  background: #222222;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.menu-link-main {
  text-decoration: none;
  color: var(--theme-color);
  padding: 0 30px;

  @media screen and (max-width: 1055px) {
    display: none;
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  color: var(--theme-color);
  padding: 20px 40px 40px 40px;
  height: 100%;
  overflow: auto;

  // background-color: var(--theme-bg-color);
  @media screen and (max-width: 510px) {
    padding: 20px;
  }

  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background-image: url('https://www.transparenttextures.com/patterns/cubes.png'),
      linear-gradient(to right top,
        #cf4af3,
        #e73bd7,
        #f631bc,
        #fd31a2,
        #ff3a8b,
        #ff4b78,
        #ff5e68,
        #ff705c,
        #ff8c51,
        #ffaa49,
        #ffc848,
        #ffe652);
    border-radius: 14px;
    padding: 20px 40px;

    @media screen and (max-width: 415px) {
      padding: 20px;
    }
  }

  &.overlay {
    transition: 100ms;
    background-color: var(--overlay-bg);
  }
}

.overlay-app {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: all;
  background-color: rgba(36, 39, 59, 0.8);
  opacity: 0;
  visibility: hidden;
  transition: 100ms;

  &.is-active {
    visibility: visible;
    opacity: 1;
  }
}

.img-content {
  font-weight: 500;
  font-size: 17px;
  display: flex;
  align-items: center;
  margin: 0;

  svg {
    width: 28px;
    margin-right: 14px;
  }
}

.content-text {
  font-weight: 400;
  font-size: 14px;
  margin-top: 16px;
  line-height: 1.7em;
  color: #ebecec;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: auto;
  text-overflow: ellipsis;
}

.content-wrapper-context {
  max-width: 350px;
}

.content-button {
  background-color: #3a6df0;
  border: none;
  padding: 8px 26px;
  color: #fff;
  border-radius: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: 100ms;
  white-space: nowrap;
}

.content-wrapper-img {
  width: 186px;
  object-fit: cover;
  margin-top: -25px;
  object-position: center;

  @media screen and (max-width: 570px) {
    width: 110px;
  }
}

.content-caption {
  color: white;
  width: 70% !important;
  margin-bottom: 24px;
  margin-top: 0px !important;
  line-height: 150%;
}

.content-section {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 36px;
  flex-direction: column;

  &-title {
    color: var(--content-title-color);
    margin-bottom: 14px;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    background-color: var(--content-bg);
    padding-left: 0;
    margin: 0;
    border-radius: 14px;
    border: 1px solid var(--theme-bg-color);
    cursor: pointer;

    li {
      list-style: none;
      padding: 10px 18px;
      display: flex;
      align-items: center;
      font-size: 16px;
      width: 100%;
      height: 100%;
      white-space: nowrap;
      transition: 100ms;

      &:hover {
        background-color: var(--theme-bg-color);

        &:first-child {
          border-radius: 13px 13px 0 0;
        }

        &:last-child {
          border-radius: 0 0 13px 13px;
        }
      }

      &+li {
        border-top: 1px solid var(--border-color);
      }
    }

    svg {
      width: 28px;
      border-radius: 6px;
      margin-right: 16px;
      flex-shrink: 0;
    }
  }
}

.products {
  display: flex;
  align-items: center;
  width: 150px;

  @media screen and (max-width: 480px) {
    width: 120px;
  }
}

.status {
  margin-left: auto;
  width: 140px;
  font-size: 15px;
  position: relative;

  @media screen and (max-width: 700px) {
    display: none;
  }

  &-circle {
    width: 6px;
    height: 6px;
    background-color: #396df0;
    position: absolute;
    border-radius: 50%;
    top: 4px;
    left: -20px;

    &.green {
      background-color: #3bf083;
    }
  }

  &-button {
    font-size: 15px;
    margin-top: 0;
    padding: 6px 24px;

    @media screen and (max-width: 390px) {
      padding: 6px 14px;
    }

    &.open {
      background: none;
      color: var(--button-inactive);
      border: 1px solid var(--button-inactive);
    }

    &:not(.open):hover {
      color: #fff;
      border-color: #fff;
    }
  }
}

.content-button:not(.open):hover {
  background: #1e59f1;
}

.menu {
  width: 5px;
  height: 5px;
  background-color: var(--button-inactive);
  border-radius: 50%;
  box-shadow: 7px 0 0 0 var(--button-inactive),
    14px 0 0 0 var(--button-inactive);
  margin: 0 12px;
}

@media screen and (max-width: 415px) {
  .adobe-product .menu {
    display: none;
  }
}

.dropdown {
  position: relative;
  height: 53px;
  width: 40px;
  top: -24px;
  display: flex;
  left: -5px;
  background: transparent;
  border: none;
  cursor: pointer;

  ul {
    position: absolute;
    background: var(--dropdown-bg);
    height: 110px;
    width: 120px;
    right: 0;
    top: 20px;
    pointer-events: none;
    opacity: 0;
    transform: translatey(10px);
    transition: all 0.4s ease;

    li a {
      text-decoration: none;
      color: var(--theme-color);
      font-size: 12px;
    }
  }
}

.dropdown.is-active {
  ul {
    opacity: 1;
    pointer-events: all;
    transform: translatey(25px);

    li:hover {
      background-color: var(--dropdown-hover);
    }
  }
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 187px;
  margin-left: auto;

  @media screen and (max-width: 480px) {
    width: auto;
  }
}

.pop-up {
  position: absolute;
  padding: 30px 40px;
  top: 50%;
  left: 50%;
  transform: (translate(-50%, -50%));
  overflow-y: auto;
  box-shadow: 0px 6px 30px rgba(0, 0, 0, 0.4);
  transition: all 100ms;
  z-index: 10;
  background-color: var(--popup-bg);
  width: 500px;
  visibility: hidden;
  opacity: 0;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  white-space: normal;

  @media screen and (max-width: 570px) {
    width: 100%;
  }

  &.visible {
    visibility: visible;
    opacity: 1;
  }

  &__title {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__description {
    white-space: normal;
    margin: 20px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.8em;

    a {
      color: var(--theme-color);
    }
  }
}

.content-button-wrapper .content-button.status-button.open.close {
  width: auto;
}

.content-section .close {
  margin-right: 0;
  width: 24px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;

  &+.checkbox-wrapper {
    margin: 20px 0 40px;
  }
}

.checkbox {
  display: none;
}

.checkbox+label {
  display: flex;
  align-items: center;

  &:before {
    content: '';
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid var(--theme-color);
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.checkbox:checked+label:before {
  background-color: #3a6df0;
  border-color: #3a6df0;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3e%3cpath d='M20 6L9 17l-5-5'/%3e%3c/svg%3e");
  background-position: 50%;
  background-size: 12px;
  background-repeat: no-repeat;
}

.content-button-wrapper {
  margin-top: auto;
  margin-left: auto;

  .open {
    margin-right: 8px;
  }
}

.apps-card {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);
}

.app-card {
  display: flex;
  flex-direction: column;
  width: calc(33.3% - 20px);
  font-size: 16px;
  background-color: var(--content-bg);
  border-radius: 14px;
  border: 1px solid var(--theme-bg-color);
  cursor: pointer;
  transition: 100ms ease;

  &:hover {
    transform: scale(1.02);
    background-color: var(--theme-bg-color);
  }

  svg {
    width: 28px;
    border-radius: 6px;
    margin-right: 12px;
    flex-shrink: 0;
  }

  &+.app-card {
    margin-left: 20px;
  }

  span {
    display: flex;
    align-items: center;
  }

  &__subtext {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6em;
    margin-top: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
  }

  &-buttons {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-top: 16px;
  }

  @media screen and (max-width: 1110px) {
    width: calc(50% - 20px);

    &:last-child {
      margin-top: 20px;
      margin-left: 0px;
    }
  }

  @media screen and (max-width: 565px) {
    width: calc(100% - 20px);
    margin-top: 20px;

    &+.app-card {
      margin-left: 0;
    }
  }
}

::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-bg);
  border-radius: 10px;
}
</style>

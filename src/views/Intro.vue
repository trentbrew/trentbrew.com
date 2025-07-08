<script>
  import Screen from '@/views/Screen.vue'
  import GradientMesh from '@/components/GradientMesh.vue'
  import Channels from '@/components/Channels.vue'
  import Noise from '@/components/Noise.vue'

  export default {
    name: 'Intro',
    components: {
      Screen,
      GradientMesh,
      Channels,
      Noise,
    },
    data() {
      return {
        unveil: false,
        unveilMobile: false,
        allowClick: false,
        clicked: false,
        clickActive: false,
        preboot: false,
        beginBoot: false,
        boot: false,
        desktopReady: false,
        hovering: false,
        popup: false,
        void: true,
      }
    },
    computed: {
      isMobile: () => window.innerWidth <= 600,
    },
    mounted() {
      if (this.isMobile) {
        window.open('https://read.cv/trentbrew', '_self') // open CV on mobile
      }
      setTimeout(() => {
        this.unveilMobile = true
      }, 6000)
      setTimeout(() => {
        if (!this.isMobile) this.unveil = true
      }, 8000)
    },
    methods: {
      handleMouseEnter() {
        this.hovering = true
        setTimeout(() => {
          this.allowClick = true
        }, 1200)
      },
      handleMouseLeave() {
        this.hovering = false
        this.allowClick = false
      },
      handleClick() {
        if (this.allowClick) {
          this.beginBoot = true
          this.preboot = true
          this.clickActive = true
          setTimeout(() => {
            this.clickActive = false
          }, 200)
          setTimeout(() => {
            this.boot = true
            this.preboot = false
          }, 1000)
          setTimeout(() => {
            this.clicked = true
          }, 3550)
          setTimeout(() => {
            this.desktopReady = true
            this.popup = true
          }, 5500)
        }
      },
    },
  }
</script>

<template>
  <main>
    <div>
      <router-link
        v-if="!isMobile"
        to="/desktop"
        class="absolute skip"
        :style="
          (beginBoot || hovering) && 'transform: translateX(-60px); opacity: 0'
        "
      >
        <span class="arrow">➔</span>
        <b>skip</b>
      </router-link>
      <div class="root" :style="clickActive && 'transform: scale(0.95)'">
        <div
          v-if="isMobile"
          class="mobile-veil absolute flex justify-center align-end fill-screen"
          style="
            z-index: 9999;
            width: 100%;
            text-align: center;
            bottom: 64px;
            transition: 2s;
          "
          :style="unveilMobile ? 'opacity: 1' : 'opacity: 0'"
        >
          <div style="max-width: 75vw; letter-spacing: 1px; color: #9999aa">
            <p style="margin-top: 24px">
              Hi! 👋🏾 Thanks for visiting my portfolio.
            </p>
            <p style="margin-top: 24px">
              Unfortunately this website is not optimized for mobile devices...
            </p>
            <p style="margin-top: 24px">Apologies for the inconvenience</p>
          </div>
        </div>
        <div
          class="intro-container flex-center fill-screen"
          :style="`${
            clicked
              ? 'background: black'
              : hovering
              ? 'background: #BCC3C9 !important'
              : 'background: #CFD5DB !important'
          };`"
        >
          <div
            v-if="(!isMobile && !unveil) || isMobile"
            class="veil absolute flex-center fill-screen"
            :style="
              isMobile &&
              'transform: scale(0.75); animation: mobile-shrink !important;'
            "
          >
            <svg height="400" viewBox="0 0 1400 1000" fill="none">
              <path
                class="path1"
                d="M100 0V600C100 700 160 900 400 900"
                stroke="#000000"
                stroke-width="200"
              />
              <path
                class="path2"
                d="M560 300H193.5"
                stroke="#000000"
                stroke-width="200"
              />
              <path
                class="path3"
                d="M700 0V600C700 700 760 900 1000 900C1240 900 1300 700 1300 600C1300 500 1240 300 1000 300H840"
                stroke="#000000"
                stroke-width="200"
              />
            </svg>
          </div>
          <div v-if="!isMobile" class="zoomable">
            <div
              class="flex-center window"
              :class="
                clicked
                  ? 'next window-hover'
                  : boot || preboot
                  ? 'window-hover'
                  : 'window flex-center'
              "
              @mouseenter="handleMouseEnter"
              @mouseleave="handleMouseLeave"
              @click="handleClick"
            >
              <div
                class="laptop-aura"
                :style="clicked && 'transition-delay: 20s !important'"
              ></div>
              <div class="laptop">
                <div class="base">
                  <div class="side top"></div>
                  <div class="side bottom"></div>
                  <div class="side right"></div>
                  <div class="side left"></div>
                  <div class="side front"></div>
                  <div class="side back"></div>
                </div>
                <div class="lid">
                  <div class="side top"></div>
                  <div class="side bottom">
                    <div class="screen" :style="`${popup && 'display: none;'}`">
                      <img
                        :src="`${
                          boot
                            ? require('@/assets/intro/boot.gif')
                            : preboot
                            ? require('@/assets/intro/static.gif')
                            : require('@/assets/intro/glitch1.gif')
                        }`"
                        width="100%"
                        height="100%"
                      />
                      <!-- <Channels v-else loop /> -->
                    </div>
                  </div>
                  <div class="side right"></div>
                  <div class="side left"></div>
                  <div class="side front"></div>
                  <div class="side back"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute bg-image"
          :class="clicked ? 'desktop-modal-transition' : 'desktop-modal'"
          :style="`${hovering && 'animation-play-state: paused'};`"
        >
          <!--GradientMesh :index="2" :style="`${popup && 'display: none;'}`" /-->
        </div>
        <div
          class="desktop-modal-final absolute bg-image"
          :style="
            desktopReady
              ? `
        opacity: 1;
        pointer-events: all;
        transition: 1600ms cubic-bezier(0.85, 0, 0.15, 1);
      `
              : `
        opacity: 0;
        pointer-events: none;
        transition: 1600ms cubic-bezier(0.85, 0, 0.15, 1);
      `
          "
        >
          <Screen :popup="popup" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  $hover-transition: 1s;

  $base-timing: 1s;
  $base-ease: ease;
  $base-delay: 0s;

  $lid-timing-in: 1.2s;
  $lid-timing-out: 400ms;
  $lid-ease-in: ease;
  $lid-ease-out: ease;
  $lid-delay-out: 0ms;
  $lid-delay-in: 150ms;

  $laptop_color: #ededf1;
  $laptop_height: 11em; // 161px
  $laptop_width: 15em; // 225px

  $trackpad_color: #cfd5db;
  //$keyboard_color: #3b454e;
  $keyboard_color: #000000;
  $keyboard_frame_color: $trackpad_color;

  $pulse_delay: 7.6s;

  $background: $trackpad_color;

  @keyframes settle {
    to {
      transform: scale(2.4);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(2);
    }
    70% {
      transform: scale(2.3);
      box-shadow: 0 0 0 50px rgba($keyboard_color, 0);
    }
    100% {
      transform: scale(2);
      box-shadow: 0 0 0 0 rgba($keyboard_color, 0);
    }
  }

  @keyframes unveil {
    to {
      opacity: 0;
    }
  }

  @keyframes logo-shrink {
    to {
      height: 35px;
    }
  }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  .root {
    transition: 300ms;
  }

  .skip {
    color: #000000;
    bottom: 64px;
    left: 120px;
    opacity: 0.4;
    font-size: 16px;
    transform: translateX(-32px);
    cursor: pointer;
    transition: 600ms !important;
    font-weight: bold;
    text-decoration: none;
    z-index: 9999;

    .arrow {
      position: absolute;
      transform: translateX(-36px);
      transition: 200ms !important;
      font-weight: normal;
    }

    &:hover {
      opacity: 1 !important;

      .arrow {
        transform: translateX(-24px);
      }
    }
  }

  video {
    object-fit: cover;
  }

  .desktop-modal-final {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    z-index: 999999;
  }

  .desktop-modal {
    position: absolute;
    margin: auto;
    opacity: 0;
    top: -212px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    width: 18.6vh;
    height: 12.6vh;
    background-color: black;
    transition: 1500ms cubic-bezier(0.33, 1, 0.68, 1), opacity 0s;
    animation: pulse 2s ease infinite $pulse_delay;
    pointer-events: none;
    z-index: 999999;
  }

  .desktop-modal-transition {
    position: absolute;
    margin: auto;
    opacity: 1;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    transform: scale(2.36);
    border-radius: 12px;
    box-sizing: border-box;
    border: solid black;
    border-width: 6px;
    background-color: black;
    width: 42.37288vw;
    height: 42.37288vh;
    pointer-events: none;
    transition: 2s cubic-bezier(0.85, 0, 0.15, 1), opacity 0s;
    animation-play-state: paused !important;
    z-index: 999999;

    video {
      border-radius: 6px;
    }
  }

  .zoomable {
    transition: 3s;
  }

  .next {
    opacity: 0 !important;
  }

  .mini-desktop {
    zoom: 0.154;
  }

  .intro-container {
    transition: 3.3s;
    background: $background;
    overflow: hidden;
  }

  .veil {
    background: $background;
    z-index: 999;
    animation: unveil 4s ease forwards 6.3s;
  }

  svg {
    transform: translate(0px, 0px);
    animation: logo-shrink 3.5s cubic-bezier(0.87, 0, 0.13, 1) forwards 3s;
  }

  .path1 {
    stroke-dasharray: 1076;
    stroke-dashoffset: 1076;
    animation: draw 2s ease forwards 1s;
  }

  .path3 {
    stroke-dasharray: 3000;
    stroke-dashoffset: 3000;
    animation: draw 2.2s ease-in forwards 1.8s;
  }

  .path2 {
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: draw 2.78s cubic-bezier(0, 0.55, 0.45, 1) forwards 3.66s;
  }

  .window {
    height: 20em;
    width: 20em;
    position: relative;
    perspective: 90em;
    opacity: 1;
    font-size: 15px;
    transform: scale(2);
    cursor: pointer;
    transition: opacity 1s !important;
    animation: pulse 2s ease infinite $pulse_delay;
  }

  .laptop-aura {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 1;
    height: $laptop_height * 0.15;
    width: $laptop_width * 0.25;
    box-shadow: 0 0 0 0 rgba($laptop_color, 1);
    animation: pulse 2s ease infinite $pulse_delay;
    transition: 500ms;
  }

  .laptop {
    height: $laptop_height;
    width: $laptop_width;
    position: absolute;
    left: 2.5em;
    top: 4.5em;
    transform: rotateZ(180deg);
    transform-style: preserve-3d;
    transition: all $base-timing ease;
  }

  .window:hover,
  .window-hover {
    animation-play-state: paused;
  }

  .window:hover .laptop {
    box-shadow: none;
    transform: rotateZ(0deg) rotateY(0deg) rotateX(65deg);
    top: 9em;
  }

  .window-hover .laptop {
    box-shadow: none;
    transform: rotateZ(0deg) rotateY(0deg) rotateX(65deg);
    top: 9em;
  }

  .window:hover .laptop-aura {
    opacity: 0;
    width: 0px;
    height: 0px;
    animation-play-state: paused;
  }

  .window-hover .laptop-aura {
    opacity: 0;
    width: 0px;
    height: 0px;
    animation-play-state: paused;
  }

  .laptop .base {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: 3s;
    transform-style: preserve-3d;
  }

  .laptop .base .side {
    position: absolute;
  }

  .laptop .base .side.top {
    // laptop base
    background: $laptop_color;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .laptop .base .side.top:before {
    // keyboard
    content: '';
    position: absolute;
    left: 1em;
    right: 1em;
    top: 0.5em;
    bottom: 5.5em;
    border-radius: 0.1em;
    background-color: $keyboard_color;
    background-image: repeating-linear-gradient(
        0deg,
        transparent 0,
        transparent 0.8em,
        $keyboard_frame_color 0.9em,
        $keyboard_frame_color 1em
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0,
        transparent 0.9em,
        $keyboard_frame_color 0.9em,
        $keyboard_frame_color 1.1em
      );
  }

  .laptop .base .side.top:after {
    // trackpad
    content: '';
    position: absolute;
    left: 4.5em;
    right: 4.5em;
    top: 6.5em;
    bottom: 1em;
    background: $trackpad_color;
    border-radius: 0.1em;
  }

  .laptop .base .side.bottom {
    // bottom of laptop
    background: $laptop_color;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateZ(-0.3em) rotateX(-180deg);
  }

  .laptop .base .side.right {
    background: $laptop_color;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.3em;
    transform: translateX(14.85em) translateZ(-0.15em) rotateY(90deg);
  }

  .laptop .base .side.left {
    background: $laptop_color;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.3em;
    transform: translateX(-0.15em) translateZ(-0.15em) rotateY(90deg);
  }

  .laptop .base .side.right:before,
  .laptop .base .side.right:after,
  .laptop .base .side.left:before,
  .laptop .base .side.left:after {
    content: '';
    background: #000a;
    width: 0.15em;
    height: 0.5em;
    position: absolute;
    left: 0.05em;
    border-radius: 1em;
  }

  .laptop .base .side.right:before,
  .laptop .base .side.left:before {
    top: 0.5em;
  }

  .laptop .base .side.right:after,
  .laptop .base .side.left:after {
    top: 1.3em;
  }

  .laptop .base .side.front {
    background: $trackpad_color;
    top: 0;
    height: 0.3em;
    left: 0;
    right: 0;
    transform: translateY(10.85em) translateZ(-0.15em) rotateX(90deg);
  }

  .laptop .base .side.back {
    background: $laptop_color;
    top: 0;
    height: 0.3em;
    left: 0;
    right: 0;
    transform: translateY(-0.15em) translateZ(-0.15em) rotateX(90deg);
  }

  .laptop .lid {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: $lid-timing-out $lid-ease-out $lid-delay-out;
    transform-origin: top;
    transform-style: preserve-3d;
  }

  .window:hover .laptop .lid {
    // open lid
    transform: rotateX(115deg);
    transition-timing-function: $lid-ease-in;
    transition-delay: $lid-delay-in;
    transition-duration: $lid-timing-in;
  }

  .window-hover .laptop .lid {
    // open lid
    transform: rotateX(115deg);
    transition-timing-function: $lid-ease-in;
    transition-delay: $lid-delay-in;
    transition-duration: $lid-timing-in;
  }

  .laptop .side {
    //box-shadow: 0 0 .05em .0em #aaa;
  }

  .laptop .lid .side {
    position: absolute;
  }

  .laptop .lid .side.top {
    // laptop lid
    //background: linear-gradient(45deg, rgb(134, 105, 105) 0%, #999 30%, #666 100%);
    background: $laptop_color;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateZ(0.2em);
  }

  .laptop .lid .side.top:before {
    // laptop logo
    content: url('../assets/logo_icon.svg');
    top: 4.7em;
    bottom: 4.7em;
    left: 6.7em;
    right: 6.7em;
    transform: rotate(180deg);
    //opacity: 0.4;
    position: absolute;
    border-radius: 50%;
  }

  .laptop .lid .side.bottom {
    // screen bezel
    background: $keyboard_color;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: rotateX(180deg);
  }

  .laptop .lid .side.bottom:before {
    // screen bezel logo
    content: '';
    position: absolute;
    height: 0.3em;
    width: 2em;
    bottom: 0.3em;
    left: 6.5em;
    background: #fff3;
    display: none;
  }

  .laptop .lid .side.bottom:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    //background-image: linear-gradient(25deg, transparent 25%, #fff1 27%, #fff4 40%, transparent 45%);
    background-position: 0% 300%;
    background-size: 40em 40em;
    transition: all 800ms;
  }

  .window:hover .laptop .lid .side.bottom:after {
    background-position: 0% 0%;
  }

  .laptop .lid .side.right {
    background: $trackpad_color;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.2em;
    transform: translateX(14.9em) translateZ(0.1em) rotateY(90deg);
  }

  .laptop .lid .side.left {
    background: $trackpad_color;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.2em;
    transform: translateX(-0.1em) translateZ(0.1em) rotateY(90deg);
  }

  .laptop .lid .side.front {
    background: $laptop_color;
    top: 0;
    height: 0.2em;
    left: 0;
    right: 0;
    transform: translateY(10.9em) translateZ(0.1em) rotateX(90deg);
  }

  .laptop .lid .side.back {
    background: $laptop_color;
    top: 0;
    height: 0.2em;
    left: 0;
    right: 0;
    transform: translateY(-0.1em) translateZ(0.1em) rotateX(90deg);
  }

  .laptop .screen {
    // laptop screen
    position: absolute;
    top: 0.7em;
    bottom: 0.8em;
    left: 0.2em;
    right: 0.2em;
    border-radius: 0.1em;
    /*background-image: url('../assets/laptop_screen.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;*/
    overflow: hidden;
    background: $laptop_background;
    //background: linear-gradient(to bottom right, #FFF152, #FFA84A);
    //border-top: .3em solid rgba(0,0,0,0.2);
  }
</style>

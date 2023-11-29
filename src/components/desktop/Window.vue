<script>
import VueResizable from "vue-resizable";

export default {
  name: "Window",
  components: {
    VueResizable,
  },
  data() {
    return {
      loading: true,
      handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
      prev: [],
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      minW: 400,
      minH: 300,
      fit: true,
      preExit: false,
      exit: false,
      hang: false,
      preventEmbedHover: false,
      preventTransition: true,
      preventTransitionParent: true,
      event: "",
      dragSelector: ".window-header",
      selectedWindow: 0,
      windowState: {
        peek: false,
        immersive: false,
        expanded: false,
      },
    };
  },
  props: {
    embed: String,
    deproxy: String,
    video: String,
    index: Number,
    id: String,
    title: String,
    center: Boolean,
    initialWidth: {
      type: Number,
      default: 400,
    },
    initialHeight: {
      type: Number,
      default: 300,
    },
  },
  computed: {
    maxW: () => window.innerWidth,
    maxH: () => window.innerHeight,
    window: () => window,
  },
  mounted() {
    this.exit = false;
    this.width = this.initialWidth;
    this.height = this.initialHeight;
    this.selectedWindow = this.id;
    if (this.embed) {
      document
        .querySelector("iframe")
        .contentWindow.document.querySelector("body").style.zoom = 0.75;
    }
    if (!this.center) {
      this.left = this.getRandomX();
      this.top = this.getRandomY();
    } else {
      this.left = this.maxW / 2 - this.initialWidth / 2;
      this.top = this.maxH / 2.6 - this.initialHeight / 2;
    }
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.$root.$on("windowSelected", (id) => {
      this.selectedWindow = id;
    });
  },
  methods: {
    togglePeek() {
      this.windowState.peek = !this.windowState.peek;
      this.preventTransition = false;
      setTimeout(() => {
        this.preventTransition = true;
      }, 200);
    },
    deactivateImmersive() {
      this.$parent.stretch = false;
      this.preventTransition = false;
      this.windowState.immersive = false;
      this.height = this.height - 24;
      setTimeout(() => {
        this.preventTransition = true;
      }, 200);
    },
    triggerImmersive() {
      this.$parent.stretch = true;
      this.hang = true;
      this.preventTransition = false;
      this.windowState.immersive = true;
      this.height = this.height + 24;
      setTimeout(() => {
        this.hang = false;
        this.preventTransition = true;
      }, 200);
    },
    toggleExpand() {
      this.preventTransitionParent = false;
      this.windowState.expanded = !this.windowState.expanded;
      this.$parent.fullscreen = this.windowState.expanded;
      if (this.windowState.expanded) {
        this.prev = [this.width, this.height, this.top, this.left];
        this.width = this.maxW - 24;
        this.height = this.maxH - (this.windowState.immersive ? 24 : 48);
        this.top = 0;
        this.left = 0;
      } else {
        this.width = this.prev[0];
        this.height = this.prev[1];
        this.top = this.prev[2];
        this.left = this.prev[3];
      }
      setTimeout(() => {
        this.preventTransitionParent = true;
      }, 600);
    },
    triggerClose() {
      this.loading = false;
      if (this.embed) {
        // kill iframe
        let iframe = document.getElementById(this.id);
        iframe.parentNode.removeChild(iframe);
      }
      if (this.video) {
        // kill video
        let video = document.getElementById(this.id);
        video.parentNode.removeChild(video);
      }
      this.preExit = true;
      this.preventTransitionParent = true;
      this.$root.$emit("closedWindow", { id: this.id, title: this.title });
      this.$parent.fullscreen = false;
      this.preventTransitionParent = false;
      setTimeout(() => {
        this.exit = true;
      }, 400);
    },
    eHandler(data) {
      this.windowSelected();
      this.width = data.width;
      this.left = data.left;
      this.height = data.height;
      this.top = data.top;
      this.event = data.eventName;
      this.preventTransition = true;
      if (data.eventName == "resize:move") {
        this.windowState.expanded = false;
        this.$parent.fullscreen = false;
      }
      if (data.eventName == "drag:start") {
        this.preventEmbedHover = true;
      }
      if (data.eventName == "drag:end") {
        this.preventEmbedHover = false;
      }
      setTimeout(() => {
        this.preventTransition = false;
      }, 2000);
    },
    windowSelected() {
      this.$root.$emit("windowSelected", this.id);
    },
    getElevation() {
      var buffer = this.$parent.zBuffer;
      return 9999 + (buffer.length - buffer.indexOf(this.id));
    },
    rand(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    },
    getRandomX() {
      return this.rand(this.maxW / 12, this.maxW - (this.initialWidth + 120));
    },
    getRandomY() {
      return this.rand(this.maxH / 12, this.maxH - (this.initialHeight + 300));
    },
  },
  filters: {
    checkEmpty(value) {
      return typeof value !== "number" ? 0 : value;
    },
  },
};
</script>

<template>
  <vue-resizable
    ref="resizableComponent"
    class="resizable"
    :class="`
      ${selectedWindow != id ? 'inactive' : 'active'}
    `"
    :style="`
      padding: 0px 0px ${!windowState.immersive ? '24px' : '0px'} 0px;
      z-index: ${getElevation()};
      display: ${exit ? 'none' : 'block'};
      transition: ${preventTransitionParent ? '0ms' : '600ms'};
      ${preExit && 'backdrop-filter: blur(0px) !important; z-index: 99999'};
    `"
    :dragSelector="dragSelector"
    :active="handlers"
    :fit-parent="fit"
    :max-width="maxW | checkEmpty"
    :max-height="maxH | checkEmpty"
    :min-width="minW | checkEmpty"
    :min-height="minH | checkEmpty"
    :width="width"
    :height="height"
    :left="left"
    :top="top"
    @mount="eHandler"
    @resize:move="eHandler"
    @resize:start="eHandler"
    @resize:end="eHandler"
    @drag:move="eHandler"
    @drag:start="eHandler"
    @drag:end="eHandler"
    @keydown:enter="triggerClose"
  >
    <div
      class="window-container"
      :class="preExit && 'window-out'"
      @mouseup.prevent="windowSelected"
    >
      <div class="window-border">
        <div
          @dblclick="toggleExpand"
          class="window-header"
          :style="
            !windowState.immersive || windowState.peek
              ? 'height: 24px; opacity: 1;'
              : 'height: 0px; opacity: 0;'
          "
        >
          <div
            @mouseenter="togglePeek"
            @mouseleave="togglePeek"
            class="peek-trigger"
            :class="!windowState.immersive ? 'not-peekable' : 'hide'"
            :style="`
            ${
              windowState.peek
                ? 'height: 36px;'
                : windowState.immersive && 'height: 12px;'
            }
            ${hang ? 'pointer-events: none;' : 'pointer-events: all;'}
          `"
          >
            <div class="window-title flex-center">
              <span>{{
                title ? title : `Window ${id.substring(0, 6)} (${index})`
              }}</span>
              <div
                v-if="embed"
                class="newtab"
                @click="window.open(deproxy || embed, '_blank')"
              ></div>
            </div>
            <div class="window-controls">
              <button
                @click="deactivateImmersive"
                class="immersive immersive-active"
              ></button>
              <button
                @click="toggleExpand"
                :class="windowState.expanded ? 'minimize' : 'expand'"
              ></button>
              <button @click="triggerClose" class="close"></button>
            </div>
          </div>
          <div class="window-title flex-center">
            <span>{{
              title ? title : `Window ${id.substring(0, 6)} (${index})`
            }}</span>
            <div
              v-if="embed"
              class="newtab"
              @click="window.open(embed, '_blank')"
            ></div>
          </div>
          <div class="window-controls">
            <button @click="triggerImmersive" class="immersive"></button>
            <button
              @click="toggleExpand"
              :class="windowState.expanded ? 'minimize' : 'expand'"
            ></button>
            <button @click="triggerClose" class="close"></button>
          </div>
        </div>
        <div
          :class="loading ? 'window-load' : 'window-body'"
          :style="`
          height: ${windowState.peek ? height - 48 : height - 24}px;
          transition: ${
            preventTransitionParent ? (preventTransition ? 0 : 100) : 600
          }ms !important;
          pointer-events: ${
            preventEmbedHover || selectedWindow != id ? 'none' : 'all'
          };
        `"
        >
          <!-- <img
          v-if="embed"
          src="../../assets/loading.gif"
          width="48"
          height="48"
          style="position: absolute; z-index: -1;"
          /> -->
          <slot id="slot">
            <div class="empty-slot-container">
              <span>W: {{ width && width.toFixed(0) }}</span
              ><br />
              <span>H: {{ height && height.toFixed(0) }}</span
              ><br />
              <span>X: {{ left && left.toFixed(0) }}</span
              ><br />
              <span>Y: {{ top && top.toFixed(0) }}</span>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </vue-resizable>
</template>

<style lang="scss" scoped>
.newtab {
  background-image: url("../../assets/icons/newtab.svg");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;
  padding: 6px;
  height: 14px;
  width: 14px;
  margin-left: 6px;
  opacity: 0.5;
  cursor: pointer;
  filter: invert(0);
  border-radius: 100%;
  transition: 200ms;

  &:hover {
    transform: scale(1.2);
  }
}
.empty-slot-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(white, 0.1);
  border-radius: 8px;
  width: 100%;
  height: 100%;
}
.hide {
  .window-title {
    opacity: 0 !important;
  }
}
.not-peekable {
  height: 36px;
  pointer-events: none !important;
  opacity: 0 !important;
}
.peek-trigger {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  pointer-events: all;
  height: 36px;
  width: 100%;
  z-index: 9999;
  opacity: 1;
}
.resizable {
  // parent
  padding: 0;
  font-weight: normal;
  color: black;
  position: absolute !important;
  margin-top: $bezel_width;
  margin-left: $bezel_width;
  //transform: scale(0.9);
  border-radius: $rad;
  opacity: 0;
  transition: opacity 400ms, background 400ms;
  animation: enter 400ms ease forwards;
  user-select: none; /* Non-prefixed version, currently */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  -khtml-user-select: none; /* Konqueror HTML */
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
}

.window-container {
  transition: 400ms;
}

.window-out {
  //backdrop-filter: $blur;
  transform: scale(0.9);
  opacity: 0;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    //backdrop-filter: $blur;
    transform: scale(1);
  }
}

.window-border {
  background: $active_window;
  padding: 12px;
  border-radius: $rad;
  box-sizing: content-box;
  //backdrop-filter: $blur;
  transition: 200ms;
  border: $bordered;
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: $top_height;
  text-align: center;
  border-radius: 12px 12px 0px 0px;
  transform: translateY(-6px);
  transition: 100ms;
  .window-title {
    cursor: default;
    display: flex;
    margin-left: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .immersive-active {
    filter: invert(1) !important;
    background-color: white !important;
    opacity: 1 !important;
  }
  .immersive {
    background-image: url("../../assets/window/black_immersive.svg");
    background-size: 50%;
  }
  .minimize {
    background-image: url("../../assets/window/black_minimize.svg");
    background-size: 60%;
  }
  .expand {
    background-image: url("../../assets/window/black_expand.svg");
    background-size: 60%;
  }
  .close {
    background-image: url("../../assets/window/black_exit.svg");
    background-size: 50%;
  }
  .window-controls {
    min-width: 100px;
  }
  .window-controls button {
    height: 24px;
    width: 24px;
    border-radius: 100%;
    border: none;
    margin-left: 8px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-color: rgba(black, 0.2);
    }
  }
}
.window-load {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: 200ms;
  background-image: url("../../assets/loading.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 36px;
}
.window-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  transition: 200ms;
}
.active {
  .window-title {
    color: rgba($active_text, 0.8);
    font-weight: normal;
    opacity: 1;
  }
  .window-body {
    color: #161616;
  }
  .window-controls {
    filter: invert(1);
  }
}
.inactive {
  .window-title {
    color: rgba($inactive_text, 0.6);
  }
  .window-body {
    pointer-events: none;
    filter: brightness(0.65);
  }
  .window-border {
    background: $inactive_window;
    transition: 200ms;
  }
  .window-controls {
    filter: invert(1);
    opacity: 0.4;
  }
}
</style>

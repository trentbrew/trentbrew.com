<script>
import Card from "@/components/content/Card.vue";
import Gallery from "@/components/content/Gallery.vue";

export default {
  components: {
    Card,
    Gallery,
  },
  data() {
    return {
      loading: true,
      category: "",
      categoryCaption: "",
      projects: [
        {
          title: "Socially Anxious Apple",
          description: "0:19",
          stack: ["Stop-Motion"],
          thumb: require("@/content/animations/anxiousapple-thumb.gif"),
          category: "Animation",
          content: { video: "animations/anxiousapple.mp4" },
          dims: "1000x560",
        },
        {
          title: "The Begining of a Beautiful Friendship",
          description: "0:41",
          stack: ["AdobeAnimate"],
          thumb: require("@/content/animations/friends-thumb.gif"),
          category: "Animation",
          content: { video: "animations/friends.mp4" },
          dims: "1000x560",
        },
        {
          title: "Sonic Run Cycle",
          description: "0:06",
          stack: ["AdobeAnimate"],
          thumb: require("@/content/animations/sonic-thumb.gif"),
          category: "Animation",
          content: { video: "animations/sonic.mp4" },
          dims: "1000x560",
        },
        {
          title: "Pebble",
          description: "0:20",
          stack: ["Stop-Motion"],
          thumb: require("@/content/animations/pebble-thumb.gif"),
          category: "Animation",
          content: { video: "animations/pebble.mp4" },
          dims: "1000x560",
        },
      ],
    };
  },
  mounted() {
    this.updateCategory("Illustration");
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    updateCategory(category) {
      this.scroll = 0;
      this.category = category;
    },
  },
};
</script>

<template>
  <div class="app">
    <div class="wrapper">
      <!--div class="left-side">
   <div class="side-wrapper">
    <div class="side-title">Doodles</div>
    <div class="side-menu">
     <a :class="category == 'Illustration' && 'category-active'" @click="updateCategory('Illustration')" href="#drawings">
      <div class="item-left">
        <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M499.377 46.402c-8.014-8.006-18.662-12.485-29.985-12.613a41.13 41.13 0 00-.496-.003c-11.142 0-21.698 4.229-29.771 11.945L198.872 275.458c25.716 6.555 47.683 23.057 62.044 47.196a113.544 113.544 0 0110.453 23.179L500.06 106.661C507.759 98.604 512 88.031 512 76.89c0-11.507-4.478-22.33-12.623-30.488zM176.588 302.344a86.035 86.035 0 00-3.626-.076c-20.273 0-40.381 7.05-56.784 18.851-19.772 14.225-27.656 34.656-42.174 53.27C55.8 397.728 27.795 409.14 0 416.923c16.187 42.781 76.32 60.297 115.752 61.24 1.416.034 2.839.051 4.273.051 44.646 0 97.233-16.594 118.755-60.522 23.628-48.224-5.496-112.975-62.192-115.348z" />
        </svg>
        Drawing
      </div>
     </a>
     <a :class="category == 'Animation' && 'category-active'" @click="updateCategory('Animation')" href="#">
      <div class="item-left">
        <svg viewBox="0 0 58 58" fill="currentColor">
        <path d="M57 6H1a1 1 0 00-1 1v44a1 1 0 001 1h56a1 1 0 001-1V7a1 1 0 00-1-1zM10 50H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2V8h8v9zm26.537 12.844l-11 7a1.007 1.007 0 01-1.018.033A1.001 1.001 0 0124 36V22a1.001 1.001 0 011.538-.844l11 7a1.003 1.003 0 01-.001 1.688zM56 50h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8V8h8v9z" />
        </svg>
        Animation
      </div>
     </a>
    </div>
   </div>
  </div-->
      <div class="main-container" :style="!loading && `background: #222222`">
        <div class="content-wrapper">
          <!--h1 style="color: white; font-family: 'DM Mono', monospace; font-weight: 400">{{ category }}</h1-->
          <!--p style="opacity: 0.3" class="content-caption">{{ categoryCaption }}</p-->
          <div
            class="content-section"
            :style="category == 'Illustration' && 'display: block !important'"
          >
            <Card
              v-for="(project, index) in projects"
              :key="index"
              :index="index"
              :activeCategory="category"
              :project="project"
              transition="expand"
            />

            <Gallery v-if="category == 'Illustration'" transition="expand" />
          </div>
        </div>
      </div>
    </div>
    <div class="overlay-app"></div>
  </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
@import url("https://fonts.googleapis.com/css2?family=DM+Mono&display=swap");

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
  --body-font: "Inter", sans-serif;
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
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.72) 0%,
    rgb(255 255 255 / 45%) 100%
  );
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

.side-wrapper + .side-wrapper {
  margin-top: 20px;
}

.side-title {
  color: $active_text;
  opacity: 0.25;
  font-weight: bold;
  margin-bottom: 14px;
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
    //transition: 200ms;
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
    margin-left: 0px;
    @media screen and (max-width: 1055px) {
      margin: auto;
    }
    a {
      padding: 20px 24px;
    }
  }
}

.main-container {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transition-duration: 0s !important;
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
  background-color: var(--theme-bg-color);
  overflow: auto;
  @media screen and (max-width: 510px) {
    padding: 20px;
  }
  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png"),
      linear-gradient(
        to right top,
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
        #ffe652
      );
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
  grid-template-columns: 1fr 1fr;
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
      & + li {
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
  & + .checkbox-wrapper {
    margin: 20px 0 40px;
  }
}

.checkbox {
  display: none;
}

.checkbox + label {
  display: flex;
  align-items: center;
  &:before {
    content: "";
    margin-right: 10px;
    width: 15px;
    height: 15px;
    border: 1px solid var(--theme-color);
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
  }
}

.checkbox:checked + label:before {
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
  & + .app-card {
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
    & + .app-card {
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

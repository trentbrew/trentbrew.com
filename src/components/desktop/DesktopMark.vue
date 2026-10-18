<template>
  <svg class="desktop-mark" :class="{ centered }" width="50" height="36" viewBox="0 0 1400 1000" fill="none"
    stroke="currentColor" stroke-width="200" aria-hidden="true">
    <path d="M100 0V600C100 700 160 900 400 900" />
    <path d="M560 300H193.5" />
    <path d="M700 0V600C700 700 760 900 1000 900C1240 900 1300 700 1300 600C1300 500 1240 300 1000 300H840" />
  </svg>
</template>

<script>
export default {
  name: 'DesktopMark',
  props: {
    centered: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.desktop-mark {
  display: block;
  width: 50px;
  height: 36px;
  flex: none;
  color: #ededf1;
  opacity: 0.14;

  &.centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-50% - #{$dock_height} / 2));
    pointer-events: none;
    z-index: 0;
  }
}
</style>

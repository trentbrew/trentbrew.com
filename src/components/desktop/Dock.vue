<script>
export default {
  props: {
    hide: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.dock-container {
  position: fixed;
  transform: translateY(-36px);
  margin: auto;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 16px 10px;
  background: #161616;
  max-width: fit-content;
  height: $dock_height;
  border: $bordered;
  border-radius: $rad;
  transition: 600ms ease 100ms;
  z-index: 99999;
}
.hidden {
  opacity: 0;
  transform: translateY(32px);
  transition: 300ms;
}
</style>

<template>
  <div class="dock-container flex-center" :class="hide && 'hidden'">
    <slot></slot>
  </div>
</template>

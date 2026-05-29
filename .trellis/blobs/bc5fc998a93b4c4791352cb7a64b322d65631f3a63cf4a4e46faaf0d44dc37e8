<template>
  <div class="ui">
    <Desktop :popup="popup" />
  </div>
</template>

<script>
import Desktop from "@/components/desktop/Desktop.vue";

export default {
  name: "Screen",
  components: {
    Desktop,
  },
  props: {
    popup: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.ui {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: solid $bezel_color;
  border-width: $bezel_width 12px $bezel_width 12px;
  background: #161616;
}
</style>

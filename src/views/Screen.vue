<template>
  <div class="ui" :class="{ ready: entered }">
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
  data() {
    return {
      entered: false,
    };
  },
  mounted() {
    if (window.innerWidth <= 600) {
      window.location.href = "https://api.trentbrew.com/cv-framer";
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.entered = true;
      });
    });
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
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 720ms cubic-bezier(0.22, 1, 0.36, 1);

  &.ready {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>

<script>
import Noise from "@/components/Noise.vue";

export default {
  name: "Channels",
  components: {
    Noise,
  },
  data() {
    return {
      skip: true,
      bgKey: null,
      assets: {
        standby: require("@/assets/intro/standby.gif"),
        glitch: require("@/assets/intro/glitch1.gif"),
        glitch2: require("@/assets/intro/glitch3.gif"),
        static: require("@/assets/intro/static.gif"),
        static2: require("@/assets/intro/static2.gif"),
        ed: require("@/assets/intro/ed.gif"),
        sonic: require("@/assets/intro/sonic.gif"),
        nostalgia: require("@/assets/intro/nostalgia.gif"),
        cab: require("@/assets/intro/cabcalloway.gif"),
      },
      urls: {
        holiday2022:
          "https://trentbrew.notion.site/ORD-IAD-954926db63f84a40b152f64ce193e759",
        podular_proposal:
          "https://www.notion.so/trentbrew/PODULAR-Development-Proposal-7c97e372484a4a42811a548d393680a1",
      },
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    let url = this.urls[this.$route.params.id];
    if (this.skip) {
      window.open(url, "_self");
    } else {
      this.runGifs(url);
    }
  },
  computed: {
    bg() {
      return this.assets[this.bgKey];
    },
  },
  methods: {
    runGifs(url) {
      if (!this.loop) this.bgKey = "standby";
      setTimeout(
        () => {
          this.bgKey = "glitch";
        },
        this.loop ? 1000 : 2100
      );
      setTimeout(
        () => {
          this.bgKey = "static2";
        },
        this.loop ? 1400 : 2300
      );
      setTimeout(
        () => {
          this.bgKey = "ed";
        },
        this.loop ? 2000 : 2700
      );
      setTimeout(() => {
        this.bgKey = "static";
      }, 3700);
      setTimeout(() => {
        this.bgKey = "nostalgia";
      }, 4100);
      setTimeout(() => {
        this.bgKey = "static";
      }, 5400);
      setTimeout(() => {
        this.bgKey = "cab";
      }, 5800);
      setTimeout(() => {
        this.bgKey = "static";
      }, 7400);
      setTimeout(() => {
        this.bgKey = "sonic";
      }, 7800);
      setTimeout(() => {
        this.bgKey = "static";
      }, 9800);
      setTimeout(() => {
        this.bgKey = "glitch";
      }, 10000);
      setTimeout(() => {
        if (!this.loop) window.open(url, "_self");
        else this.runGifs();
      }, 10400);
    },
  },
};
</script>

<template>
  <section>
    <div
      id="tv"
      :style="`background-image: url(${bg}); ${
        !loop
          ? 'filter: blur(3px) contrast(1); height: 100vh; background-size: cover;'
          : 'aspect-ratio: 3 / 2; background-size: 120%;'
      }`"
    ></div>
  </section>
</template>

<style scoped>
section {
  overflow: hidden;
}

#tv {
  overflow: hidden;
  position: absoluite;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  background-position: center;
}
</style>

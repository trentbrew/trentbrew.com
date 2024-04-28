<script>
import Noise from "@/components/Noise.vue";

export default {
  name: "Channels",
  components: {
    Noise,
  },
  data() {
    return {
      skip: false,
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
        soon: require("@/assets/intro/soon.gif"),
      },
      urls: {
        holiday2022:
          "https://trentbrew.notion.site/ORD-IAD-954926db63f84a40b152f64ce193e759",
        podular:
          "https://www.notion.so/trentbrew/PODULAR-Development-Proposal-7c97e372484a4a42811a548d393680a1",
        "turtle-labs-business-plan":
          "https://trentbrew.notion.site/Turtle-Labs-LLC-Business-Plan-a5e5a7b1f1bf4b729998a2123941f6aa",
      },
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    let url = this.urls[this.$route.params.id];
    if (this.skip) window.open(url, "_self");
    else this.runGifs(url);
  },
  methods: {
    runGifs(url) {
      this.bgKey = "standby";
      setTimeout(() => (this.bgKey = "glitch"), 2000); // 1 second
      setTimeout(() => (this.bgKey = "static2"), 3000); // 1 second
      setTimeout(() => (this.bgKey = "ed"), 4000); // 1.75 seconds
      setTimeout(() => (this.bgKey = "static"), 5750); // 1 second
      setTimeout(() => (this.bgKey = "sonic"), 6750); // 1.75 seconds
      setTimeout(() => (this.bgKey = "static2"), 8500); // 1 second
      setTimeout(() => (this.bgKey = "cab"), 9500); // 1.75 seconds
      setTimeout(() => (this.bgKey = "static"), 11250); // 1 second
      setTimeout(() => (this.bgKey = "soon"), 12250); // 1.75 seconds
      setTimeout(() => (this.bgKey = "static"), 14000); // 1 second
      setTimeout(() => (this.bgKey = "glitch2"), 15000); // 1 second
      setTimeout(() => this.runGifs(url), 16000); // Loop back to start
    },
  },
};
</script>

<template>
  <section>
    <img id="tv" :src="assets[bgKey]" alt="Nothing to see here..." />
  </section>
</template>

<style scoped>
section {
  overflow: hidden;
}

#tv {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  background-color: black;
}
</style>

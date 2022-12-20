<script>
export default {
  name: "Redirect",
  data() {
    return {
      bgKey: null,
      assets: {
        standby: require("@/assets/intro/standby.gif"),
        glitch: require("@/assets/intro/glitch1.gif"),
        static: require("@/assets/intro/static.gif"),
        ed: require("@/assets/intro/ed.gif"),
        sonic: require("@/assets/intro/sonic.gif"),
        ghost: require("@/assets/intro/ghost.gif"),
      },
      urls: {
        holiday2022:
          "https://trentbrew.notion.site/ORD-IAD-954926db63f84a40b152f64ce193e759",
      },
    };
  },
  mounted() {
    let url = this.urls[this.$route.params.id];

    this.bgKey = "standby";
    setTimeout(() => {
      this.bgKey = "glitch";
    }, 2200);
    setTimeout(() => {
      this.bgKey = "ed";
    }, 2400);
    setTimeout(() => {
      this.bgKey = "static";
    }, 3000);
    setTimeout(() => {
      this.bgKey = "ghost";
    }, 3200);
    setTimeout(() => {
      this.bgKey = "static";
    }, 3600);
    setTimeout(() => {
      this.bgKey = "glitch";
    }, 3800);
    setTimeout(() => {
      this.bgKey = "sonic";
    }, 4000);
    setTimeout(() => {
      this.bgKey = "glitch";
    }, 5000);
    setTimeout(() => {
      this.bgKey = "static";
    }, 5100);
    setTimeout(() => {
      window.open(url, "_self");
    }, 5200);
  },
  computed: {
    bg() {
      return this.assets[this.bgKey];
    },
  },
};
</script>

<template>
  <main>
    <div id="tv" :style="`background-image: url(${bg})`"></div>
    <div id="noise"></div>
  </main>
</template>

<style scoped>
main {
  overflow: hidden;
}

#tv {
  overflow: hidden;
  position: absoluite;
  top: 0;
  left: 0;
  background-color: black;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
}

#noise {
  overflow: hidden;
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  width: 400%;
  height: 400vh;
  background: transparent url("../assets/intro/noise.png") repeat 0 0;
  background-size: 25%;
  background-repeat: repeat;
  animation: 1s infinite noise linear;
  pointer-events: none;
  opacity: 1;
  filter: contrast(2);
}

@keyframes noise {
  0%,
  100% {
    background-position: 0 0;
  }
  10% {
    background-position: -10% -20%;
  }
  20% {
    background-position: -30% 10%;
  }
  30% {
    background-position: 14% -50%;
  }
  40% {
    background-position: 40% 100%;
  }
  50% {
    background-position: -50% 20%;
    opacity: 0.75;
  }
  60% {
    background-position: 30% 10%;
  }
  70% {
    background-position: 0 30%;
  }
  80% {
    background-position: 50% 70%;
  }
  90% {
    background-position: -20% 20%;
  }
}
</style>

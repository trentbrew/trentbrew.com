<script>
export default {
  name: "Noise",
  props: {
    volume: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<template>
  <div id="noise" :style="`background-size: ${volume * 50}%`"></div>
</template>

<style>
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
  background-repeat: repeat;
  animation: 1s infinite noise linear;
  pointer-events: none;
  opacity: 1;
  filter: blur(1px) contrast(1.5);
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

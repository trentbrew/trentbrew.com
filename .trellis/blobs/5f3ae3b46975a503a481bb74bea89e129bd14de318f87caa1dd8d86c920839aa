<template>
  <div class="video">
    <div class="video__container">
      <video
        ref="video"
        class="video__iframe"
        frameborder="0"
        autoplay
        muted
        loop
        width="100%"
        height="100%"
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      this.$refs.video.volume = 0.2;
      this.unmute();
    }, 100);
  },
  methods: {
    unmute() {
      console.log("unmuted");
      this.$refs.video.muted = false;
    },
  },
};
</script>

<script>
import http from "@/api/http";

export default {
  data() {
    return {
      loading: true,
      images: [],
    };
  },
  async mounted() {
    const { data: images } = await http.get(`/api/v1/gallery`);
    console.log(images);
    this.images = images;
  },
  methods: {
    handleImageClick(image) {
      this.$root.$emit("galleryClicked", image.url);
    },
  },
};
</script>

<template>
  <div class="gallery">
    <div class="gallery-container">
      <div
        v-for="(image, index) in images"
        :key="index"
        :style="`background-image: url(${image.url});`"
        class="gallery-item"
      >
        <div @click="handleImageClick(image)" class="clickable"></div>
      </div>
    </div>
  </div>
</template>
.

<style lang="scss" scoped>
.loader-veil {
  position: absolute;
  margin-top: -36px;
  margin-left: -36px;
  width: 844px;
  height: 536px;
  pointer-events: none;
  z-index: 99999;
  transition: 400ms;
}
.clickable {
  height: 100%;
  width: 100%;
  display: flex;
}
.gallery-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 36px;
  overflow: auto;
  width: 100%;
  border-radius: 8px;
}
.gallery-item {
  background-color: #00000021;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 6px;
  width: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: 200ms ease;

  &:hover {
    transform: scale(0.96);
  }

  &:active {
    transform: scale(0.92);
  }
}
</style>

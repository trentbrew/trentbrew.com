<script>
  import http from '@/api/http'

  export default {
    data() {
      return {
        loading: true,
        images: [],
      }
    },
    async mounted() {
      http.get(`/api/v1/gallery`).then((res) => {
        this.loading = false
        this.images = res.data.sort((a, b) => a.index - b.index)
        console.log('sorted images: ', this.images)
      })
    },
    methods: {
      handleImageClick(image) {
        this.$root.$emit('galleryClicked', image.url)
      },
    },
  }
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
  .clickable {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .gallery {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 36px;
    overflow: auto;
    width: 100%;
    border-radius: 8px;
  }
  .gallery-item {
    background-color: #191919;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 6px;
    max-width: 300px;
    aspect-ratio: 1 / 1;
    transition: 300ms cubic-bezier(0.33, 1, 0.68, 1);

    &:hover {
      transform: scale(0.96);
      filter: brightness(0.9);
    }

    &:active {
      transform: scale(0.9);
      filter: brightness(0.6);
    }
  }
</style>

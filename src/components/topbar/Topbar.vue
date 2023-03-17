<script>
export default {
  name: "Topbar",
  components: {},
  data() {
    return {};
  },
  props: {},
  computed: {},
  methods: {},
};
</script>

<template>
  <div class="topbar">
    <div class="topbar-section topbar-left"></div>
    <div class="topbar-section topbar-time">
      <span class="time">5:34pm</span>
    </div>
    <div class="topbar-section topbar-right"></div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  display: flex;
  width: 100%;
  height: $top_height;
  background: black;
  color: white;
  border-radius: $rad $rad 0px 0px;
  z-index: 999;
}

.topbar-section {
  display: flex;
  align-items: center;
  line-height: $top_height;
  width: 100%;
}

.topbar-time {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>

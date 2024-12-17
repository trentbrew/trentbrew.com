<script>
  export default {
    name: 'Topbar',
    data() {
      return {
        currentTime: this.getCurrentTime(),
      }
    },
    mounted() {
      this.updateTime()
    },
    methods: {
      getCurrentTime() {
        const now = new Date()
        return now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      },
      updateTime() {
        setInterval(() => {
          this.currentTime = this.getCurrentTime()
        }, 60000) // Update every minute
      },
    },
  }
</script>

<template>
  <div class="topbar">
    <div class="topbar-section topbar-left">
      <div class="topbar-section-item">
        <span class="time">{{ currentTime }}</span>
      </div>
    </div>
    <div class="topbar-section topbar-time"></div>
    <div class="topbar-section topbar-right">
      <div class="topbar-section-item">
        <span class="date">
          {{
            new Date().toLocaleDateString([], {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .topbar-right {
    display: flex;
    justify-content: flex-end;
    padding: 0px 4px;
  }
  .topbar-left {
    justify-content: flex-start;
  }
  .topbar {
    display: flex;
    width: 100%;
    height: $top_height;
    color: rgba(white, 0.6) !important;
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

  .topbar-section-item {
    // background: rgba(white, 0.1);
    display: flex;
    padding: 0px 4px;
    font-size: 0.8rem;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>

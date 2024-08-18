<script>
  export default {
    data() {
      return {}
    },
    mounted() {
      this.checkin()
    },
    methods: {
      checkin: async () => {
        const info = {
          timestamp: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          localTime: new Date().toLocaleString(),
          userAgent: navigator.userAgent,
          isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
          referrer: document.referrer,
          crumbs: await window.cookieStore.getAll(),
        }
        try {
          const body = JSON.stringify(info)
          await fetch('https://api.trentbrew.com/guestbook', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body,
          })
        } catch (err) {
          console.warn('guestbook error:', err)
        } finally {
          console.log('<3')
        }
      },
    },
  }
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  body {
    background: #bcc3c9;
    margin: 0px;
    padding: 0px;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

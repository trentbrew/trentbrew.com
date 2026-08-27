<script>
const LAYOUT_MODES = [
  { key: 'floating', label: 'Float', shortcut: '0' },
  { key: 'tabs', label: 'Tabs', shortcut: '1' },
  { key: 'stack', label: 'Stack', shortcut: '2' },
  { key: 'niri', label: 'Niri', shortcut: '3' },
  { key: 'table', label: 'Table', shortcut: '4' },
  { key: 'grid', label: 'Grid', shortcut: '5' },
  { key: 'fibonacci', label: 'Fib', shortcut: '6' },
  { key: 'freeform', label: 'Free', shortcut: '7' },
]

const DESKTOP_COUNT = 5

export default {
  name: 'Topbar',
  data() {
    return {
      currentTime: this.getCurrentTime(),
      activeMode: 'floating',
      modes: LAYOUT_MODES,
      activeDesktop: 0,
      desktops: Array.from({ length: DESKTOP_COUNT }, (_, i) => i),
    }
  },
  computed: {
    dateLabel() {
      return new Date().toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    },
    dayLabel() {
      return new Date().toLocaleDateString([], { weekday: 'long' })
    },
  },
  mounted() {
    this.tick()
    this.timer = setInterval(this.tick, 15000)
    window.addEventListener('keyup', this.onKey)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    window.removeEventListener('keyup', this.onKey)
  },
  methods: {
    tick() {
      this.currentTime = this.getCurrentTime()
    },
    getCurrentTime() {
      return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
    onKey(e) {
      const target = e.target
      if (target && /input|textarea/i.test(target.tagName)) return
      const map = {}
      for (let i = 0; i < LAYOUT_MODES.length; i++) {
        map[LAYOUT_MODES[i].shortcut] = LAYOUT_MODES[i].key
      }
      if (map[e.key]) this.setMode(map[e.key])
    },
    setMode(key) {
      if (this.activeMode === key) return
      this.activeMode = key
      this.$root.$emit('layoutModeChange', key)
      this.$emit('modeChange', key)
    },
    setDesktop(i) {
      if (this.activeDesktop === i) return
      this.activeDesktop = i
      this.$root.$emit('desktopChange', i)
    },
    onSettings() {
      this.$root.$emit('openSettings')
      this.$emit('settings')
    },
  },
}
</script>

<template>
  <div class="topbar">
    <div class="topbar-section topbar-left">
      <button
        type="button"
        class="topbar-logo"
        title="Home"
        aria-label="Home"
        @click="setDesktop(0)"
      >
        <svg viewBox="0 0 1400 1000" width="14" height="10" fill="none" stroke="currentColor" stroke-width="200" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M100 0V600C100 700 160 900 400 900" />
          <path d="M560 300H100" />
          <path d="M700 0V600C700 700 760 900 1000 900C1240 900 1300 700 1300 600C1300 500 1240 300 1000 300H840" />
        </svg>
      </button>
      <div class="topbar-switcher" role="tablist" aria-label="Desktop">
        <button
          v-for="i in desktops"
          :key="i"
          type="button"
          :class="['desktop-dot', { active: activeDesktop === i }]"
          :title="`Desktop ${i + 1}`"
          :aria-pressed="activeDesktop === i"
          @click="setDesktop(i)"
        >
          <span class="dot" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="topbar-section topbar-center">
      <div class="clock" :title="dayLabel">
        <span class="clock-time">{{ currentTime }}</span>
        <span class="clock-date">{{ dateLabel }}</span>
      </div>
    </div>

    <div class="topbar-section topbar-right">
      <button
        type="button"
        class="topbar-icon"
        title="Settings"
        aria-label="Settings"
        @click="onSettings"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="8" cy="8" r="2.2" />
          <path d="M8 1.2v1.6M8 13.2v1.6M14.8 8h-1.6M2.8 8H1.2M13 3l-1.1 1.1M4.1 11.9L3 13M13 13l-1.1-1.1M4.1 4.1L3 3" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  display: flex;
  align-items: center;
  width: 100%;
  height: $top_height;
  padding: 0 12px;
  color: rgba($active_text, 1);
  font-family: $primary-font;
  font-size: 0.9rem;
  font-weight: normal;
  user-select: none;
  z-index: 999;
  position: relative;
  box-sizing: border-box;
  flex: 0 0 $top_height;
}

.topbar-section {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.topbar-left {
  flex: 1 1 auto;
  min-width: 0;
  justify-content: flex-start;
}

.topbar-center {
  flex: 0 0 auto;
  justify-content: center;
}

.topbar-right {
  flex: 1 1 auto;
  justify-content: flex-end;
}

.topbar-logo {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  padding: 0 4px 0 0;
  color: rgba($active_text, 1);
  cursor: pointer;
  line-height: 0;

  svg {
    display: block;
  }

  &:hover {
    opacity: 0.75;
  }
}

.topbar-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
}

.desktop-dot {
  appearance: none;
  background: transparent;
  border: 0;
  padding: 4px 3px;
  cursor: pointer;
  line-height: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(white, 0.22);
  transition:
    background 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;
}

.desktop-dot:hover .dot {
  background: rgba(white, 0.5);
}

.desktop-dot.active .dot {
  background: white;
  box-shadow: 0 0 6px rgba(white, 0.4);
}

.clock {
  display: flex;
  align-items: baseline;
  gap: 8px;
  color: rgba($active_text, 1);
  font-variant-numeric: tabular-nums;
}

.clock-time {
  font-size: 0.9rem;
  font-weight: normal;
}

.clock-date {
  font-size: 0.9rem;
  color: rgba($inactive_text, 0.6);
}

.topbar-icon {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: transparent;
  border: 0;
  padding: 0;
  color: rgba(white, 0.7);
  cursor: pointer;
  transition: background 160ms ease, color 160ms ease;

  &:hover {
    background: rgba(white, 0.06);
    color: rgba(white, 1);
  }
}

@media (max-width: 760px) {
  .topbar-switcher {
    gap: 2px;
    padding: 0 2px;
  }
  .topbar-logo {
    display: none;
  }
}
</style>

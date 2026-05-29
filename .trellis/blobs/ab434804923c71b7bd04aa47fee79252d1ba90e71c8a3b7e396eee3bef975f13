<script>
  export default {
    data() {
      return {
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
      }
    },

    methods: {
      handleClick(event) {
        const target = event.target
        const item = target.closest('.item')
        if (item && this.$refs.stackElement) {
          const itemRect = item.getBoundingClientRect()
          const stackRect = this.$refs.stackElement.getBoundingClientRect()
          const itemCenter = itemRect.left + itemRect.width / 2
          const stackCenter = stackRect.left + stackRect.width / 2
          const scrollDistance = itemCenter - stackCenter

          this.$refs.stackElement.scrollBy({
            left: scrollDistance,
            behavior: 'smooth',
          })
        }
      },

      startDragging(e) {
        if (!this.$refs.stackElement || e.pointerType === 'touch') return
        if (e.button !== 0) return

        this.isDragging = true
        this.startX = e.pageX - this.$refs.stackElement.offsetLeft
        this.scrollLeft = this.$refs.stackElement.scrollLeft

        e.preventDefault()
      },

      stopDragging() {
        this.isDragging = false
      },

      drag(e) {
        if (!this.isDragging || !this.$refs.stackElement) return

        e.preventDefault()
        const x = e.pageX - this.$refs.stackElement.offsetLeft
        const walk = (x - this.startX) * 2

        this.$refs.stackElement.scrollLeft = this.scrollLeft - walk
      },
    },

    mounted() {
      const stack = this.$refs.stackElement
      if (stack) {
        stack.addEventListener('pointerdown', this.startDragging)
        document.addEventListener('pointermove', this.drag)
        document.addEventListener('pointerup', this.stopDragging)
        document.addEventListener('pointerleave', this.stopDragging)

        const items = stack.querySelectorAll('.item')
        items.forEach((item, index) => {
          item.classList.add(`item-${index + 1}`)
        })
      }
    },

    beforeDestroy() {
      const stack = this.$refs.stackElement
      if (stack) {
        stack.removeEventListener('pointerdown', this.startDragging)
        document.removeEventListener('pointermove', this.drag)
        document.removeEventListener('pointerup', this.stopDragging)
        document.removeEventListener('pointerleave', this.stopDragging)
      }
    },
  }
</script>

<template>
  <div class="scroll-stack" ref="stackElement" @click="handleClick">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @keyframes slide-in {
    from {
      transform: translateX(-130cqi) scale(0.7) rotate3d(0, 0, 0, 90deg);
      filter: blur(8px) opacity(0.1);
    }
    to {
      transform: translateX(0) scale(1);
      filter: blur(0) opacity(1);
    }
  }

  .scroll-stack {
    container-type: inline-size;
    inline-size: 100cqi;
    display: grid;
    grid-auto-flow: column;
    overflow-x: auto; /* Changed from hidden to auto */
    scroll-snap-type: x mandatory;
    overscroll-behavior: contain;
    gap: 10rem;
    padding-block: 30px 60px;
    cursor: default; /* Removed grab cursor */
    user-select: none;
    touch-action: pan-x;

    /* Hardware acceleration for smooth scrolling */
    will-change: scroll-position;
    transform: translateZ(0);

    /* Smooth scrolling */
    scroll-behavior: smooth;
  }

  .item {
    scroll-snap-align: start;
    transition: transform 0.3s ease-out;
  }

  /* Dynamic ordering for items */
  @for $i from 1 through 20 {
    .item-#{$i} {
      order: #{21 - $i};
      z-index: #{$i};
    }
  }

  figure {
    flex-shrink: 0;
    block-size: 80cqi;
    aspect-ratio: 1/1;
    max-inline-size: 80cqi;
    background: light-dark(#eee, #444);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    overflow: clip;
    display: flex;
  }

  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      figure {
        animation: slide-in linear both;
        animation-timeline: view(x);
        animation-range: cover -75cqi contain 20cqi;
      }
    }
  }

  @container (width < 480px) {
    figure {
      block-size: 50cqi;
      max-inline-size: 50cqi;
    }
  }

  figure > img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
  }

  .scroll-stack {
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer and Edge */
  }

  .scroll-stack::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and newer versions of Opera */
  }
</style>

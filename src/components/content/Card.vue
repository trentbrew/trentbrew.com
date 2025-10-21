<script>
export default {
  props: {
    activeCategory: String,
    project: Object,
  },
  methods: {
    handleFigureClick() {
      this.$root.$emit('cardClicked', this.project)
    },
  },
}
</script>

<template>
  <figure v-if="activeCategory == project.category" @click="handleFigureClick" class="card" :style="`background-image: url(${project.thumb || ''}); ${project.title == 'Placeholder' && 'pointer-events: none; opacity: 0;'
    }`">
    <div style="background: black; width: 100%; height: 100%" class="shade"></div>
    <figcaption>
      <span class="info">
        <div class="title flex">
          <h3>{{ project.title || '' }}</h3>
          <div v-if="project.newtab" class="newtab"></div>
        </div>
        <span>{{ project.description || '' }}</span>
        <br />
        <div class="stack-container flex">
          <div v-for="(tool, index) in project.stack" :key="index">
            <span :class="`pill ${tool}`">{{ tool }}</span>
          </div>
        </div>
      </span>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.React {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.NextJS {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.Vue {
  background: rgba(#adf7b6, 0.16);
  color: #adf7b6 !important;
}

.Svelte {
  background: rgba(#debcaf, 0.16);
  color: #debcaf !important;
}

.Gemini {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.OpenAI {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.Flutter {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.MapboxGL {
  background: rgba(#bcb7be, 0.16);
  color: #bcb7be !important;
}

.Firebase {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.InstantDB {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.Zerosync {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.Node {
  background: rgba(#adf7b6, 0.16);
  color: #ffc09f !important;
}

.Express {
  background: rgba(#ffee93, 0.16);
  color: #debcaf !important;
}

.Django {
  background: rgba(#debcaf, 0.16);
  color: #debcaf !important;
}

.Laravel {
  background: rgba(#debcaf, 0.16);
  color: #debcaf !important;
}

.Azure {
  background: rgba(#79addc, 0.16);
  color: #79addc !important;
}

.GameMaker {
  background: rgba(#ffc09f, 0.16);
  color: #ffc09f !important;
}

.p5js {
  background: rgba(#dfabbf, 0.16);
  color: #dfabbf !important;
}

.HTML5 {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.WebGL {
  background: rgba(#bcb7be, 0.16);
  color: #bcb7be !important;
}

.JQuery {
  background: rgba(#adf7b6, 0.16);
  color: #adf7b6 !important;
}

.VanillaJS {
  background: rgba(#bcb7be, 0.16);
  color: #bcb7be !important;
}

.CSS,
.SCSS,
.TailwindCSS {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.Figma {
  background: rgba(#dfabbf, 0.16);
  color: #dfabbf !important;
}

.Windows {
  background: rgba(#79addc, 0.16);
  color: #79addc !important;
}

.Webflow {
  background: rgba(#6e9dc8, 0.16);
  color: #6e9dc8 !important;
}

.AdobeAnimate {
  background: rgba(#ffee93, 0.16);
  color: #ffee93 !important;
}

.Loom {
  background: rgba(#dfabbf, 0.16);
  color: #dfabbf !important;
}

.Procreate {
  background: rgba(#dfabbf, 0.16);
  color: #dfabbf !important;
}

.Stop-Motion {
  background: rgba(#bcb7be, 0.16);
  color: #bcb7be !important;
}

.newtab {
  background-image: url('../../assets/icons/newtab.svg');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 14px;
  width: 14px;
  margin-left: 8px;
  opacity: 0.4;
  filter: invert(0);
}

.pill {
  padding: 2px 6px;
  margin-right: 8px;
  border-radius: 12px;
}

.stack-container {
  margin-top: 18px;
}

b span {
  padding-top: 12px;
}

.shade {
  opacity: 0;
  transition: 300ms;
}

figure.card {
  margin: 0px !important;
  padding: 0px !important;
  position: relative;
  height: 100%;
  aspect-ratio: 16 / 9;
  background-color: rgba(white, 0.1);
  background-position: 50% 0px;
  background-size: cover;
  background-repeat: no-repeat;
  transition: 300ms ease;
  overflow: hidden;
  border-radius: 6px;

  cursor: pointer;
  //box-shadow: $shadow;

  &:hover {
    //filter: brightness(0.8);
    //transform: scale(1.04);
    background-position: 50% -48px;

    figcaption {
      //opacity: 1;
      transform: translateY(0px);
    }

    .shade {
      opacity: 0.4;
    }
  }

  figcaption {
    bottom: 0;
    position: absolute;
    transform: translateY(148px);
    box-sizing: content-box;
    width: calc(100% - 40px);
    height: 88px;
    padding: 15px 20px;
    justify-content: space-between;
    align-items: center;
    background: #161616;
    border-radius: 0px;
    transition: 300ms ease;

    //opacity: 0;
    //backdrop-filter: $blur;
    //border-top: $bordered;
    //transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    .info {
      width: 100%;
      color: rgba(white, 0.6);

      h3 {
        color: white !important;
        margin: 0px;
        font-size: 14px;
        letter-spacing: 1px;
        margin-bottom: 8px;
      }

      span {
        color: rgba(white, 0.4);
        font-size: 12px;
      }
    }
  }
}
</style>

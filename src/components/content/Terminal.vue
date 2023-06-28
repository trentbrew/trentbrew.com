<script>
import { VueTyper } from "vue-typer";

export default {
  name: "Terminal",
  components: {
    VueTyper,
  },
};
</script>

<template>
  <div class="terminal-container">
    <vue-typer
      :text="[
        `Hi!`,
        `My name's Trent`,
        `I'm a Software Designer based in LA`,
        `Welcome to my website ^-^`,
        `Feel free to click around & explore my work...`,
      ]"
      :repeat="0"
      :shuffle="false"
      initial-action="typing"
      :pre-type-delay="600"
      :type-delay="75"
      :pre-erase-delay="2200"
      :erase-delay="200"
      erase-style="select-all"
      :erase-on-complete="false"
      caret-animation="smooth"
    ></vue-typer>
  </div>
</template>

<style lang="scss">
.terminal-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #222222;
  border-radius: 8px;
  padding: 24px;
}
.vue-typer {
  font-family: monospace;
  font-size: 16px;
  &::before {
    content: "$ ";
    color: #619b5c;
  }
}
.vue-typer .custom.char {
  color: white;
}
.vue-typer .custom.char.selected {
  background-color: #264f78;
}
.vue-typer .custom.caret {
  display: inline-block !important;
  width: 1px;
  background-color: white;
}
</style>

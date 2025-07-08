import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeWindow: "",
  },
  mutations: {
    setActiveWindow(state, window) {
      state.activeWindow = window.title;
    },
  },
});

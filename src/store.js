import Vue from "vue";
import Vuex from "vuex";
import SynthPlugin from "./lib/synth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [SynthPlugin],
  state: {
    test_tone: null
  },
  mutations: {
    test_keydown(state, note) {
      state.test_tone = note;
    },
    test_keyup(state) {
      state.test_tone = null;
    }
  },
  actions: {}
});

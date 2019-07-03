import Vue from "vue";
import Vuex from "vuex";

//modules
import synth from "./store/synth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { synth }
});

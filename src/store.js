import Vue from "vue";
import Vuex from "vuex";

//modules
import engine from "./store/engine";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { engine }
});

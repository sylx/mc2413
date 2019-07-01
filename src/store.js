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
    UPDATE_TEST(state, payload) {
      state.test_tone = payload;
    },
    UPDATE_SEQUENCE(state, payload) {}
  },
  actions: {
    KEYON_TEST(context, note) {
      if (note != context.state.test_tone) {
        context.commit("UPDATE_TEST", note);
      }
    },
    KEYOFF_TEST(context) {
      if (context.state.test_tone) {
        context.commit("UPDATE_TEST", null);
      }
    },
    CHANGE_MML(context, payload) {
      context.commit("UPDATE_SEQUNCE", payload);
    }
  }
});

import { MmlCompiler as compiler } from "../lib/mml";
import _ from "lodash";
import sample from "../../examples/ff3.mml";

const initialMml = sample;
let initialSeq = "",
  initialMmlError = null;
try {
  initialSeq = compiler.compile(sample);
} catch (e) {
  initialMmlError = e;
}

export default {
  namespaced: true,
  state: {
    mml: initialMml,
    mmlError: initialMmlError,
    sequence: initialSeq,
    transportPlaying: false
  },
  getters: {
    noteSequence: state => {
      return _.flatten(
        _.map(state.sequence, data =>
          data.filter(evt => {
            return evt.type == "note" || evt.type == "pitch";
          })
        )
      );
    }
  },
  mutations: {
    updateSequence(state, sequence) {
      state.sequence = sequence;
    },
    updateMml: (state, mml) => {
      state.mml = mml;
    },
    updateMmlError: (state, error) => {
      state.mmlError = error;
    },
    updateTransportPlaying: (state, isPlaying) => {
      state.transportPlaying = isPlaying;
    }
  },
  actions: {
    noteOnTestTone(context, note) {},
    noteOffTestTone(context) {},
    changeMML(context, text) {
      context.commit("updateMml", text);
      try {
        context.commit("updateSequence", compiler.compile(text));
        context.commit("updateMmlError", null);
      } catch (e) {
        context.dispatch("errorMML", e);
      }
    },
    changeCursorMML(context, pos) {},
    errorMML(context, e) {
      context.commit("updateMmlError", e);
    },
    changePianoRoll(context, sequence) {
      context.commit("updateSequence", sequence);
    },
    playSequence(context) {
      context.commit("updateTransportPlaying", true);
    },
    stopSequence(context) {
      context.commit("updateTransportPlaying", false);
    },
    tickSequence(context, position) {},
    beforeNoteOn(context, evt) {},
    noteOn(context, evt) {},
    noteOff(context, evt) {},
    selectNote(context, note) {}
  }
};

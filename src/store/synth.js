import { MmlCompiler as compileMML } from "../lib/mml";
import _ from "lodash";

const initialMML = `//J.S.Bach Invention No.13
T90L16
REA>C<BEB>DC8E8<G+8>E8 <AEA>C <BEB>DC8<A8R4R
>ECE<A>C<EGF8A8>D8F8. D<B>D<GBDFE8G8>C8E8. C<A>C<F8>D8. <BGBE8>C8. <AFAD8B8>C4R4
<RG>CED<G>DFE8G8<B8>G8 C<G>CED<G>DFE8C8G8E8 >C<AEACE<A>CD8F+8A8>C8< BGDG<B>D<GB>C8E8G8B8
AF+D+F+<B>D<F+AG8>G8.ECE<A8>F+8.D<B>D<G8>E8.C<A>C<F+>GF+ED+F+<B>D+E4R4
<<E2L16O2A8>A4G+8AEA>C<BEB>DC8<A8G+8E8AEA>C<BEB>DC8<A8>C8<A8>D<AFADF<A>C<B8>D8G8B8.
GEGCE<GBA8>C8DF<B>D<G8B8>CE<A>C<F8D8G>GFGCG>CED<G>DFE8C8<B8G8>C<G>GED<G>DFE8C8R4RGEGCE<GBA8>C8E8G8
F+ADF+<A>D<F+AG8B8>D8F+8EGCE<G>C<EGF+8A8B8>D+8RECE<A>CEGF+D<B>D<GB>DF+EC<A>C<F+A>C8.<B>C<AB8<B8>E>E<BGE<BGBE2`;

export default {
  namespaced: true,
  state: {
    mml: initialMML,
    mmlError: null,
    sequence: compileMML(initialMML),
    transportPlaying: false
  },
  getters: {
    noteSequence: state => {
      return state.sequence.filter(evt => {
        return evt.type == "note" || evt.type == "pitch";
      });
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
        context.commit("updateSequence", compileMML(text));
        context.commit("updateMmlError", null);
      } catch (e) {
        context.dispatch("errorMML", e);
      }
    },
    changeCursorMML(context, pos) {},
    errorMML(context, e) {
      console.error(e.toString());
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

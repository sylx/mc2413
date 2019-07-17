import { MmlCompiler as compiler } from "../lib/mml";
import _ from "lodash";

const compileMML = src => compiler.compile(src);

let initialMML = `//J.S.Bach Invention No.13
a T90 V15
b V6 R12
c O3V5
abc L16 REA>C<BEB>DC8E8<G+8>E8 <AEA>C <BEB>DC8<A8R4R
abc >ECE<A>C<EGF8A8>D8F8. D<B>D<GBDFE8G8>C8E8. C<A>C<F8>D8. <BGBE8>C8. <AFAD8B8>C4R4
abc <RG>CED<G>DFE8G8<B8>G8 C<G>CED<G>DFE8C8G8E8 >C<AEACE<A>CD8F+8A8>C8< BGDG<B>D<GB>C8E8G8B8
abc AF+D+F+<B>D<F+AG8>G8.ECE<A8>F+8.D<B>D<G8>E8.C<A>C<F+>GF+ED+F+<B>D+E4R4
abc <<E2L16 <A8>A4G+8AEA>C<BEB>DC8<A8G+8E8AEA>C<BEB>
abc DC8<A8>C8<A8>D<AFADF<A>C<B8>D8G8B8.
abc GEGCE<GBA8>C8DF<B>D<G8B8>CE<A>C<F8D8G>GFGCG>CED<G>
abc DFE8C8<B8G8>C<G>GED<G>DFE8C8R4RGEGCE<GBA8>C8E8G8
abc F+ADF+<A>D<F+AG8B8>D8F+8EGCE<G>C<EGF+8A8B8>D+8RECE<A>
abc CEGF+D<B>D<GB>DF+EC<A>C<F+A>C8.<B>C<AB8<B8>E>E<BGE<BGBE2`;

initialMML = `// FF3 Theme

// Intro

t t136 L1
a o5L4v15
b o4L8v11
c o3L2v13

t rrrr
a g+d+ef+ g2f+e e1 d+2...r16
b b2g4ab> c4<b4a4g4 f+2ef+ga b4f+ga4d+4
c ec <a>d< b>f+ b<b>>

t rrrr
a c2e2 d+2^8.r16<b> e2g2 f+2...r16
b e4ede4g4 f+4f+ef+2 >c4<cdef+gab4f+4d+4<b4>
c L8 c4<cdef+ga brf+rd+r<br> erede4c4 f+rf+ef+2

t rrr t126 r4 t118 r4 t112 r4 t96 r4
a e2g2 f+2^8.r16d+4 a2>c2< bag+f+
b g2e4g4 <b4b>c+d+2 e4f+4g4e4 d+4c+4<b4a4
c cdef+g4f+e d+ef+ga4b4> L2 c<a f+<b

// Theme

t t144
a o4L4v15
b o3L4v11
c o3L2v13

abc [

a b>ef+<b> a2g+f+ ed+8e8f+ee2d+2 c+f+g+c+ b2ag+ f+f8g+8f+c+ g+2f+2<
b b2.>c+8d+8ec+d+f+ c+d+8e8f+g+8a+8 bf+d+<b> f+2ff+8g+8 af+fb a2a+2 b2a2<
c ed+ c+<b aa+ b1> ag+ f+f f+e d+<b>

a b>ef+<b> a2g+f+ ed+8e8f+ee2d+2 c+f+g+c+ b2ag+ f+f8g+8f+c+ g+2f+f+16g+16a16b16>
b b2.>c+8d+8ec+d+f+ c+d+8e8f+g+8a+8 bf+d+<b> f+2ff+8g+8 af+fb a2a+2 b2a2
c ed+ c+c c+<a+ b1> ag+ f+f f+e d+<b>

//a >>
//b >
//c

// a c+2.^-8r8c+< b2.^-8r8g+ aa8g+8f+f f+g+ab>
a c+2^8r8c+< b2^8r8g+ aa8g+8f+f f+g+ab>
b L8 e4ag+a4e4 e4bag+f+eg+> d<af+4g+c+d+f f+4<b>c+def+4
c L8 ar<ab>c+d+ef+ g+rg+f+g+rer f+4d4c+4bg+ f+4e4d4c+4<

a d2^8r8d c+2^8r8<a bb8>c8<bb8>c8< bag+f+<
b g2^gab a2^agf+ e4edcde4 d+2e4f+4<
c br>babrgr f+r>c+r<ar<ab> cr>cr<ef+g4 f+4d+4<b4a4>

b L4
c L2

abc ]0
`;

// initialMML = `
// a L8 cdefgab>[cdefgab>c<bagfed]0
// `;

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

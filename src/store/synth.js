import { MmlCompiler as compileMML } from "../lib/mml-parser";

import MmlParser from "@/lib/mml-parser";
import _ from "lodash";

const testSeq = text => {
  let seq = [],
    index = 0;
  _.range(4, 2).forEach(o => {
    ["a", "a+", "b", "c", "c+", "d", "d+", "e", "f", "f+", "g", "g+"].forEach(
      n => {
        seq.push({
          id: ++index,
          type: "note",
          interval: `${n}${o}`,
          time: index * 0.25,
          duration: 1.0,
          velocity: (1 / 12 / 2) * index
        });
      }
    );
  });
  return seq;
};

export default {
  namespaced: true,
  state: {
    sequence: testSeq()
  },
  getters: {
    noteSequence: state => {
      return state.sequence.filter(evt => {
        return evt.type == "note";
      });
    }
  },
  mutations: {
    updateSequence(state, sequence) {
      state.sequence = sequence;
    }
  },
  actions: {
    noteOnTestTone(context, note) {},
    noteOffTestTone(context) {},
    changeMML(context, text) {
      context.commit("updateSequence", compileMML(text));
    },
    changePianoRoll(context, sequence) {
      context.commit("updateSequence", sequence);
    }
  }
};

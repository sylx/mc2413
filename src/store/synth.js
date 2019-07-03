import MmlParser from "@/lib/mml-parser";
import _ from "lodash";

const compileMML = text => {
  return [
    {
      id: 1,
      type: "note",
      interval: "a4",
      time: 4.0,
      duration: 1.0
    }
  ];
};

export default {
  namespaced: true,
  state: {
    sequence: []
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

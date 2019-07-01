import Tone from "tone";
import parser from "mml-parser";

const compile = mml => {};

const MmlPlugin = store => {
  store.subscribeAction((action, state) => {
    if (action.type == "CHANGE_MML") {
      state.action("update_sequence", {
        data: compile(action.payload)
      });
    }
  });
};

export default MmlPlugin;

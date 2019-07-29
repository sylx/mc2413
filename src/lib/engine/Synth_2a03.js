import hasParamsMixin from "./hasParamsMixin";
import Tone from "tone";
import _ from "lodash";

class Synth_2a03 extends hasParamsMixin(Tone.Synth) {
  getName() {
    return "2a03";
  }
  getParamNames() {
    return {
      wv: [
        {
          name: "soundwave",
          type: "select",
          options: ["sqrt", "sine", "tri", "noise"],
          default: "sqrt"
        },
        {
          name: "tune",
          type: "number",
          max: 127,
          default: 0
        },
        {
          name: "fine",
          type: "number",
          max: 127,
          default: 0
        }
      ]
    };
  }
  setParam(key, name, value) {
    if (key == "wv") {
      if (name == "soundwave") {
        if (value == "sqrt") {
          this.oscillator.type = "square";
        } else if (value == "tri") {
          this.oscillator.type = "triangle";
        }
      }
    }
  }
}

export default Synth_2a03;

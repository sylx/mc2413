import SynthBase from "./SynthBase";
import Tone from "tone";
import _ from "lodash";

class Synth_2a03 extends SynthBase {
  getName() {
    return "2a03";
  }
  initSynth(master) {
    this.synth = new Tone.Synth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 0.01
      },
      portamento: 0.0
    });
    this.synth.connect(master);
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
          this.synth.oscillator.type = "square";
        } else if (value == "tri") {
          this.synth.oscillator.type = "triangle";
        }
      }
    }
  }
}

export default Synth_2a03;

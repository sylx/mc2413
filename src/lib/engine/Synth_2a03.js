import hasParamsMixin from "./hasParamsMixin";
import Tone from "tone";
import _ from "lodash";

class Oscillator_2a03 extends Tone.Oscillator {
  constructor() {
    super({
      type: "sine",
      frequency: 440,
      detune: 0,
      phase: 0,
      partials: [],
      partialCount: 0
    });
  }
}

class Synth_2a03 extends hasParamsMixin(Tone.Synth) {
  constructor(master) {
    super({});
    this._writable(["oscillator", "frequency", "detune", "envelope"]);
    this.oscillator = new Oscillator_2a03();
    this.oscillator.chain(this.envelope, this.output);
    this.frequency = this.oscillator.frequency;
    this.detune = this.oscillator.detune;
    this.connect(master);
  }
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

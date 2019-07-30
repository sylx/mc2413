import hasParamsMixin from "./hasParamsMixin";
import Tone from "tone";
import _ from "lodash";

class ScriptOscillatorNode extends Tone.OscillatorNode {
  constructor(bufsize, proc) {
    super();
    const osc = this.context.createScriptProcessor(bufsize);
    osc.start = Tone.noOp;
    osc.stop = Tone.noOp;

    this._oscillator = osc;
    this._oscillator.onaudioprocess = proc;
    osc.connect(this._context.destination);
  }
}

class Oscillator_experimental extends Tone.Oscillator {
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
  createNode() {
    const bufsize = 4096;
    this.scriptNode = this.context.createScriptProcessor(bufsize);
    let phase = 0;
    const fs = this.context.sampleRate;

    this.scriptNode.onaudioprocess = (ev => {
      const in0 = ev.inputBuffer.getChannelData(0);
      const buf0 = ev.outputBuffer.getChannelData(0);
      const buf1 = ev.outputBuffer.getChannelData(1);
      const now = this._oscillator.now() + 4096 / fs;
      //      console.log(this.frequency.getValueAtTime(now), now);
      for (let i = 0; i < bufsize; ++i) {
        const t0 = fs / this.frequency.getValueAtTime(now + bufsize / fs);
        var s = (2 * phase) / t0;
        buf0[i] = buf1[i] = s - 1;
        phase++;
        if (phase >= t0) {
          phase = 0;
        }
      }
    }).bind(this);
    this.scriptNode.connect(this.output);
  }
  _start(time) {
    super._start(time);
    this.createNode();
    this._oscillator.connect(this.scriptNode);
    this._oscillator.disconnect(this.output);
  }
}

class Synth_experimental extends hasParamsMixin(Tone.Synth) {
  constructor(master) {
    super({});
    this._writable(["oscillator", "frequency", "detune", "envelope"]);
    this.oscillator = new Oscillator_experimental();
    this.oscillator.chain(this.envelope, this.output);
    this.frequency = this.oscillator.frequency;
    this.detune = this.oscillator.detune;
    this.connect(master);
  }
  getName() {
    return "experimental";
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

export default Synth_experimental;

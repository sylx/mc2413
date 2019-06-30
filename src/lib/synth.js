import Tone from "tone";

class Synth {
  constructor() {
    this.channel = new Tone.Channel({
      volume: -20
    }).toMaster();

    this.tone = new Tone.Synth({
      oscillator: {
        type: "sine"
      }
    }).connect(this.channel);
  }
  keyOn(note, time) {
    this.tone.triggerAttack(note, time);
  }
  keyOff(time) {
    this.tone.triggerRelease(time);
  }
}

const SynthPlugin = store => {
  const synth = new Synth();
  store.subscribe((mutation, state) => {
    if (mutation.type == "test_keydown") {
      synth.keyOn(mutation.payload);
    }
    if (mutation.type == "test_keyup") {
      synth.keyOff();
    }
  });
};

export default SynthPlugin;
export { Synth, SynthPlugin };

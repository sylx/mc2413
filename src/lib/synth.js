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
  keySet(note, time) {
    this.tone.setNote(note, time);
  }
  keyOff(time) {
    this.tone.triggerRelease(time);
  }
}

const synth = new Synth();

const SynthPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type == "UPDATE_TEST") {
      let note = mutation.payload;
      if (note) {
        synth.keyOn(note);
      } else {
        synth.keyOff();
      }
    }
  });
};

export default SynthPlugin;
export { Synth, SynthPlugin };

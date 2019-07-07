import Tone from "tone";

class Synth {
  constructor() {
    this.initSynth();
  }
  initSynth() {
    this.masterChannel = new Tone.Channel({
      volume: 0
    }).toMaster();

    this.tone = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      portamento: 0.05
    }).connect(this.masterChannel);
  }
  noteOn(note, velocity, time) {
    this.tone.triggerAttack(note, time, velocity);
  }
  noteChange(note, time) {
    this.tone.setNote(note, time);
  }
  noteOff(time) {
    this.tone.triggerRelease(time);
  }
  connectStore(store) {
    let test_note = null;

    store.subscribeAction((action, state) => {
      let type = action.type,
        payload = action.payload;
      switch (type) {
        case "synth/noteOnTestTone":
          if (test_note != payload) {
            if (test_note === null) {
              this.noteOn(payload, 0.5);
            } else {
              this.noteChange(payload);
            }
          }
          test_note = payload;
          break;
        case "synth/noteOffTestTone":
          this.noteOff();
          test_note = null;
          break;
        default:
          break;
      }
    });
  }
}

class Sequencer {
  constructor(synth) {
    this.synth = synth;
  }
  connectStore(store) {
    store.subscribe((mutation, state) => {});
  }
}

class MC2413 {
  constructor() {
    this.synth = new Synth();
    this.sequencer = new Sequencer(this.synth);
  }
  connectStore(store) {
    this.synth.connectStore(store);
    this.sequencer.connectStore(store);
  }
}

export default MC2413;
export { Synth, Sequencer };

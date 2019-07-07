import Tone from "tone";

window.Tone = Tone;

class Synth {
  constructor() {
    this.initSynth();
  }
  initSynth() {
    this.masterChannel = new Tone.Channel({
      volume: -10
    }).toMaster();

    this.tone = new Tone.Synth({
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
  noteOnOff(note, duration, time, velocity) {
    this.tone.triggerAttackRelease(note, duration, time, velocity);
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

const transport = Tone.Transport;

class Sequencer {
  constructor(synth) {
    this.synth = synth;
    transport.PPQ = 192;
    transport.loop = false;
  }
  connectStore(store) {
    this.store = store;
    store.subscribeAction((action, state) => {
      let type = action.type,
        payload = action.payload;
      switch (type) {
        case "synth/playSequence":
          if (transport.state == "started") transport.stop(0);
          this.storeEvent(state);
          transport.start();
          break;
        case "synth/stopSequence":
          transport.stop();
          break;
      }
    });
  }
  storeEvent(state) {
    const synth = this.synth;
    transport.cancel();
    this.indicator = new Tone.Loop(
      (time => {
        Tone.Draw.schedule(() => {
          this.store.dispatch(
            "synth/tickSequence",
            Tone.Time(transport.position).toTicks() / 192
          );
        }, time);
      }).bind(this),
      0.01
    ).start();

    const data = [];
    state.synth.sequence.forEach(
      (evt => {
        switch (evt.type) {
          case "bpm":
            transport.schedule(time => {
              transport.bpm.value = evt.bpm;
            }, Tone.Time(evt.time * 192, "i"));
            break;
          case "note":
          case "pitch":
            transport.schedule(time => {
              synth.noteOnOff(
                evt.interval.replace(/\+/, "#"),
                Tone.Time(evt.duration * 192, "i"),
                time,
                evt.velocity
              );
              Tone.Draw.schedule(() => {
                this.store.dispatch("synth/noteOn", evt);
              }, time);
              Tone.Draw.schedule(() => {
                this.store.dispatch("synth/noteOff", evt);
              }, Tone.Time(Tone.Time(time).toTicks() + evt.duration * 192, "i"));
            }, Tone.Time(evt.time * 192, "i"));
            break;
        }
      }).bind(this)
    );
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

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
  noteOn(interval, velocity, time) {
    this.tone.triggerAttack(this.normalizeInterval(interval), time, velocity);
  }
  noteChange(interval, time) {
    this.tone.setNote(this.normalizeInterval(interval), time);
  }
  noteOff(time) {
    this.tone.triggerRelease(time);
  }
  noteOnOff(interval, duration, time, velocity) {
    this.tone.triggerAttackRelease(
      this.normalizeInterval(interval),
      duration,
      time,
      velocity
    );
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
        case "synth/selectNote":
          this.noteOn(payload.interval, 0.5);
          setTimeout(
            (() => {
              this.noteOff();
            }).bind(this),
            250
          );
          break;
        default:
          break;
      }
    });
  }
  normalizeInterval(interval) {
    const trans = {
      "A+": "A#",
      "A-": "G#",
      "B+": "C",
      "B-": "A#",
      "C+": "C#",
      "C-": "B",
      "D+": "D#",
      "D-": "C#",
      "E+": "F",
      "E-": "D#",
      "F+": "F#",
      "F-": "E",
      "G+": "G#",
      "G-": "F#"
    };
    let n = interval.toUpperCase().match(/([A-G][#+-]*)(\d+)/);
    if (!n) return "";
    let name = n[1];
    if (trans[n[1]]) name = trans[n[1]];
    return name + n[2];
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
      0.05
    ).start();

    const data = [];
    state.synth.sequence.a.forEach(
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
                evt.interval,
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

            if (evt.time > 2) {
              transport.schedule(time => {
                Tone.Draw.schedule(() => {
                  this.store.dispatch("synth/beforeNoteOn", evt);
                }, time);
              }, Tone.Time((evt.time - 2) * 192, "i"));
            }

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

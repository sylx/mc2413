import Tone from "tone";
import _ from "lodash";

class SynthController {
  constructor() {
    this.tone = {};
    this.selected_tone = "a";
    this.initSynth();
  }
  initSynth() {
    this.masterChannel = new Tone.Channel({
      volume: -10
    }).toMaster();

    this.createChannel("a");
  }
  createChannel(name) {
    const tone = new Tone.Synth({
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
    tone.connect(this.masterChannel);
    tone.name = name;
    this.tone[name] = tone;
  }
  getTone(name) {
    if (!name) name = this.selected_tone;
    return this.tone[name];
  }
  selectTone(name) {
    this.selected_tone = name;
  }
  noteOn(interval, velocity, time, channel) {
    this.getTone(channel).triggerAttack(
      this.normalizeInterval(interval),
      time,
      velocity
    );
  }
  noteChange(interval, time, channel) {
    this.getTone(channel).setNote(this.normalizeInterval(interval), time);
  }
  noteOff(time, channel) {
    this.getTone(channel).triggerRelease(time);
  }
  noteOnOff(interval, duration, time, velocity, channel) {
    this.getTone(channel).triggerAttackRelease(
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
        case "engine/noteOnTestTone":
          if (test_note != payload) {
            if (test_note === null) {
              this.noteOn(payload, 0.5);
            } else {
              this.noteChange(payload);
            }
          }
          test_note = payload;
          break;
        case "engine/noteOffTestTone":
          this.noteOff();
          test_note = null;
          break;
        case "engine/selectNote":
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
    let octave = n[2];
    if (trans[n[1]]) name = trans[n[1]];
    if (n[1] == "C-") octave--;
    if (n[1] == "B+") octave++;
    return name + octave;
  }
}

export default SynthController;

import Tone from "tone";
import _ from "lodash";

import Synth_2a03 from "./Synth_2a03";

class SynthController {
  constructor() {
    this.clearChannel();
    this.masterChannel = new Tone.Channel({
      volume: -10
    }).toMaster();

    this.SynthTypes = {
      "2a03": Synth_2a03
    };
    this.synthParams = {};
  }
  createChannel(name, type) {
    if (!type) type = "2a03"; //default
    const tone = new this.SynthTypes[type](this.masterChannel);
    this.channel[name] = tone;
  }
  clearChannel() {
    this.channel = {};
  }
  getChannel(name) {
    return this.channel[name];
  }
  noteOn(interval, velocity, time, channel) {
    return this.getChannel(channel).triggerAttack(
      this.normalizeInterval(interval),
      time,
      velocity
    );
  }
  noteChange(interval, time, channel) {
    return this.getChannel(channel).setNote(
      this.normalizeInterval(interval),
      time
    );
  }
  noteOff(time, channel) {
    return this.getChannel(channel).triggerRelease(time);
  }
  noteOnOff(interval, duration, time, velocity, channel) {
    return this.getChannel(channel).triggerAttackRelease(
      this.normalizeInterval(interval),
      duration,
      time,
      velocity
    );
  }
  registerSynthParams(params) {
    this.synthParams = params;
  }
  setSynthParams(ch, name) {
    const chann = this.getChannel(ch);
    const tone = this.synthParams[name];
    chann.setParams(tone);
  }
  connectStore(store) {
    let test_note = null;
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case "engine/updateTrackType":
          this.clearChannel();
          _.forIn(mutation.payload, (type, name) => {
            this.createChannel(name, type);
          });
          break;
        case "engine/updateTone":
          this.registerSynthParams(mutation.payload);
          break;
      }
    });

    store.subscribeAction(
      ((action, state) => {
        let type = action.type,
          payload = action.payload;
        switch (type) {
          case "engine/noteOnTestTone":
            if (test_note != payload) {
              if (test_note === null) {
                this.noteOn(payload, 0.5, undefined, "a");
              } else {
                this.noteChange(payload);
              }
            }
            test_note = payload;
            break;
          case "engine/noteOffTestTone":
            this.noteOff(undefined, "a");
            test_note = null;
            break;
          case "engine/selectNote":
            this.noteOnOff(
              payload.interval,
              0.25,
              undefined,
              payload.velocity,
              payload.tr
            );
            break;
          default:
            break;
        }
      }).bind(this)
    );
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

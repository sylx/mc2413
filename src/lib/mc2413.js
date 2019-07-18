import Tone from "tone";
import _ from "lodash";

window.Tone = Tone;

class Synth {
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

const _beats = (beats, add) => Tone.Time(beats * 192 + (add ? add : 0), "i");

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
          Tone.context.latencyHint = "playback";
          transport.start();
          break;
        case "synth/stopSequence":
          transport.stop();
          Tone.context.latencyHint = "interactive";
          break;
      }
    });
  }
  storeEvent(state) {
    transport.cancel();
    this.indicator = new Tone.Loop(
      (time => {
        Tone.Draw.schedule(() => {
          const time =
            Tone.Time(transport.position).toTicks() / 192 -
            Tone.Time(
              Tone.context.lookAhead + Tone.context.baseLatency
            ).toTicks() /
              192;
          this.store.dispatch("synth/tickSequence", time > 0 ? time : 0);
        }, time);
      }).bind(this),
      0.05
    ).start();

    _.forIn(state.synth.sequence, this.processTrack.bind(this));
  }
  processTrack(data, name) {
    this.synth.createChannel(name);
    let part = new Tone.Part(
      this.processEvent.bind(this),
      _.map(data, d => [_beats(d.time), d])
    ).start();
    part.loopEnd = Infinity;

    //bpm change(global)
    data
      .filter(evt => evt.type == "bpm")
      .forEach(evt => {
        transport.schedule(time => {
          transport.bpm.value = evt.bpm;
        }, _beats(evt.time));
      });
    //runtime loop
    data
      .filter(evt => evt.type === "runtime_loop")
      .forEach(evt => {
        part.loop = evt.count === 0 ? true : evt.count;
        transport.schedule(time => {
          part.loopStart = _beats(evt.start);
          part.loopEnd = _beats(evt.end);
        }, _beats(evt.time, 1)); //noteと同じタイミングだとnoteがスキップされるので、ずらす
      });
    //before note
    data
      .filter(evt => evt.type == "note" || evt.type == "pitch")
      .forEach(evt => {
        let before = evt.time - 2;
        if (before > 2) {
          Tone.Draw.schedule(() => {
            this.store.dispatch("synth/beforeNoteOn", evt);
          }, _beats(before));
        }
      });
  }
  processEvent(time, evt) {
    switch (evt.type) {
      case "note":
      case "pitch":
        this.synth.noteOnOff(
          evt.interval,
          _beats(evt.duration),
          time,
          evt.velocity,
          evt.tr
        );
        Tone.Draw.schedule(() => {
          this.store.dispatch("synth/noteOn", evt);
        }, time);
        Tone.Draw.schedule(() => {
          this.store.dispatch("synth/noteOff", evt);
        }, Tone.Time(Tone.Time(time).toTicks() + evt.duration * 192, "i"));
        break;
    }
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

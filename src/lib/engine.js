import Tone from "tone";
import _ from "lodash";
window.Tone = Tone;

import SynthController from "./engine/SynthController";

const transport = Tone.Transport;
const _beats = (beats, add) => Tone.Time(beats * 192 + (add ? add : 0), "i");

class Sequencer {
  constructor(controller) {
    this.controller = controller;
    transport.PPQ = 192;
    transport.loop = false;
    this.part = {};
  }
  connectStore(store) {
    this.store = store;
    store.subscribeAction((action, state) => {
      let type = action.type,
        payload = action.payload;
      switch (type) {
        case "engine/playSequence":
          if (transport.state == "started") transport.stop(0);
          this.storeEvent(state);
          Tone.context.latencyHint = "playback";
          transport.start();
          break;
        case "engine/stopSequence":
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
          this.store.dispatch("engine/tickSequence", time > 0 ? time : 0);
        }, time);
      }).bind(this),
      0.05
    ).start();

    if (state.engine.tempo) {
      transport.bpm.value = state.engine.tempo;
    }
    _.forIn(state.engine.sequence, this.processTrack.bind(this));
  }
  processTrack(data, name) {
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
    //set_tone
    data
      .filter(evt => evt.type === "set_tone")
      .forEach(evt => {
        const controller = this.controller;
        transport.schedule(time => {
          controller.setSynthParams(evt.tr, evt.tone);
        }, _beats(evt.time));
      });

    //before note
    data
      .filter(evt => evt.type == "note" || evt.type == "pitch")
      .forEach(evt => {
        let before = evt.time - 2;
        if (before > 2) {
          Tone.Draw.schedule(() => {
            this.store.dispatch("engine/beforeNoteOn", evt);
          }, _beats(before));
        }
      });
  }
  processEvent(time, evt) {
    switch (evt.type) {
      case "note":
      case "pitch":
        this.controller.noteOnOff(
          evt.interval,
          _beats(evt.duration),
          time,
          evt.velocity,
          evt.tr
        );
        Tone.Draw.schedule(() => {
          this.store.dispatch("engine/noteOn", evt);
        }, time);
        Tone.Draw.schedule(() => {
          this.store.dispatch("engine/noteOff", evt);
        }, Tone.Time(Tone.Time(time).toTicks() + evt.duration * 192, "i"));
        break;
    }
  }
}

class Engine {
  constructor() {
    this.controller = new SynthController();
    this.sequencer = new Sequencer(this.controller);
  }
  connectStore(store) {
    this.controller.connectStore(store);
    this.sequencer.connectStore(store);
  }
}

export default Engine;
export { SynthController, Sequencer };

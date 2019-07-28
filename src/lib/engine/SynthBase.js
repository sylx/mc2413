import _ from "lodash";

class SynthBase {
  constructor(master) {
    this.params = {};
    const names = this.getParamNames();
    this.initSynth(master);
    _.forIn(names, (values, key) => {
      values.forEach(obj => {
        this.setParam(key, obj.name, obj.default);
      });
    });
  }
  initSynth() {
    this.synth = null;
  }
  triggerAttack() {
    return this.synth.triggerAttack.apply(this.synth, arguments);
  }
  triggerAttackRelease() {
    return this.synth.triggerAttackRelease.apply(this.synth, arguments);
  }
  triggerRelease() {
    return this.synth.triggerRelease.apply(this.synth, arguments);
  }
  setNote() {
    return this.synth.setNote.apply(this.synth, arguments);
  }
  getName() {
    return "base";
  }
  getParamNames() {
    return {};
  }
  setParams(parent) {
    const names = this.getParamNames();
    _.forIn(parent.params, (values, key) => {
      if (!this.params[key]) {
        this.params[key] = {};
      }
      values.forEach((node, i) => {
        this.setParam(key, names[key][i].name, node.value);
        this.params[key][names[key][i].name] = {
          value: node.value,
          start: node.start,
          end: node.end
        };
      });
    });
  }
  getParams() {
    return this.params;
  }
  setParam(key, name, value) {
    return value;
  }
}

export default SynthBase;

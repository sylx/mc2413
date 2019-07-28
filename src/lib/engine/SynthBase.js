class SynthBase {
  constructor() {}
  getName() {
    return "base";
  }
  setToneParams(params) {}
  getToneParams() {}
  checkToneParams(params) {}
  setParam(key, num, value) {}
  getParam(key, num, value) {}
}

export default SynthBase;

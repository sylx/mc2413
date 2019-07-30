import _ from "lodash";

function hasParamsMixin(base = null) {
  class hasParams extends base {
    constructor(master) {
      super();
      this.params = {};
      const names = this.getParamNames();
      _.forIn(names, (values, key) => {
        values.forEach(obj => {
          this.setParam(key, obj.name, obj.default);
        });
      });
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
        values.forEach((node, i) => {
          this.setParam(key, names[key][i].name, node.value);
        });
      });
    }
    setParam(key, name, value) {
      return value;
    }
  }
  return hasParams;
}

export default hasParamsMixin;

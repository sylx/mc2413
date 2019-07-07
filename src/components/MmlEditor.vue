<template>
  <div>
    <codemirror ref="cm" :value="mml" :options="cmOptions" />
  </div>
</template>

<style lang="scss">
.CodeMirror {
  text-align: left;
  border: 1px solid #ccc;
}
</style>

<script>
import { mapState } from "vuex";
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";

import CM from "codemirror";

CM.defineMode("text/mml", () => {
  return {
    token(stream, state) {
      if (stream.match(/[a-g][+#-]*/i)) {
        return null;
      } else if (stream.match(/\d+/)) {
        return "variable";
      } else if (stream.match(/[tlvq]/i)) {
        return "keyword";
      } else {
        stream.next();
        return null;
      }
    }
  };
});

// require styles
export default {
  name: "mml-editor",
  components: {
    codemirror
  },
  data() {
    return {
      cmOptions: {
        mode: "text/mml",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        lineWrapping: true
      }
    };
  },
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror;
    },
    ...mapState("synth", {
      mml: "mml"
    })
  },
  mounted() {
    this.initCodeMirror(this.codemirror);
  },
  methods: {
    initCodeMirror(cm) {
      cm.on("change", (cm, ch) => {
        this.$store.dispatch("synth/changeMML", cm.getValue());
      });
    }
  }
};
</script>

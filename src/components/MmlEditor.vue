<template>
  <div>
    <codemirror ref="cm" :value="mml" :options="cmOptions" />
    <b-alert class="mt-4" v-if="mmlError" show variant="danger">{{
      mmlError.msg
    }}</b-alert>
  </div>
</template>

<style lang="scss">
.CodeMirror {
  text-align: left;
  border: 1px solid #ccc;
  font-size: 150%;
  line-height: 150%;
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
      } else if (stream.match(/[\d^&]+/)) {
        return "variable";
      } else if (stream.match(/[><tlvqo]/i)) {
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
      mml: "mml",
      mmlError: "mmlError"
    })
  },
  mounted() {
    const cm = this.codemirror;
    this.initCodeMirror(cm);
    this.$store.subscribeAction((action, state) => {
      if (action.type == "synth/noteOn") {
        const note = action.payload,
          start = new CM.Pos(note.start.line - 1, note.start.column - 1),
          end = new CM.Pos(note.end.line - 1, note.end.column - 1);
        cm.getDoc().setSelection(start, end);
      }
    });
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

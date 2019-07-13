<template>
  <div>
    <codemirror ref="cm" :value="mml" :options="cmOptions" />
    <b-alert class="mt-4" v-if="mmlError" show variant="danger">{{
      mmlError.message
    }}</b-alert>
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
//import "codemirror/theme/base16-dark.css";
import "../assets/mid-school2.less";

import "codemirror/addon/selection/active-line.js";
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/lint.css";

import CM from "codemirror";

CM.defineMode("mml", () => {
  return {
    token(stream, state) {
      if (stream.match(/[a-gr][+#-]*/i)) {
        return "operator";
      } else if (stream.match(/[\d^.&]+/)) {
        return "number";
      } else if (stream.match(/[><tlvqo]/i)) {
        return "keyword";
      } else if (stream.match(/\/\/.*/)) {
        return "comment";
      } else {
        stream.next();
        return null;
      }
    }
  };
});

let lastError = null;
CM.registerHelper("lint", "mml", function(text, cm) {
  const err = lastError;
  if (err) {
    const start = new CM.Pos(err.start.line - 1, err.start.column - 1),
      end = new CM.Pos(err.end.line - 1, err.end.column - 1);
    return [{ from: start, to: end, message: err.message }];
  }
  return [];
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
        mode: "mml",
        theme: "mid-school2",
        lineNumbers: true,
        line: true,
        lineWrapping: true,
        styleActiveLine: true,
        styleSelectedText: true,
        lint: true,
        gutters: ["CodeMirror-lint-markers"]
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
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == "synth/updateMmlError") {
        lastError = mutation.payload;
      }
    });
    this.$store.subscribeAction((action, state) => {
      const note = action.payload;
      let start, end;
      switch (action.type) {
        case "synth/noteOn":
        case "synth/selectNote":
          this.changeCursorByProc = true;
          start = new CM.Pos(note.start.line - 1, note.start.column - 1);
          end = new CM.Pos(note.end.line - 1, note.end.column - 1);
          cm.getDoc().setSelection(start, end);
          cm.focus();
          if (action.type == "synth/selectNote") {
            cm.setCursor(start);
          }
          break;
      }
    });
  },
  methods: {
    initCodeMirror(cm) {
      cm.on("change", (cm, ch) => {
        this.$store.dispatch("synth/changeMML", cm.getValue());
      });
      cm.on("cursorActivity", cm => {
        if (this.changeCursorByProc) {
          this.changeCursorByProc = false;
          return;
        }
        const cursor = cm.getCursor();
        this.$store.dispatch("synth/changeCursorMML", {
          line: cursor.line + 1,
          column: cursor.ch + 1
        });
      });
    }
  }
};
</script>

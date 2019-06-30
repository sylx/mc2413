<template>
  <div>
    <codemirror ref="cm" :value="code" :options="cmOptions" />
  </div>
</template>

<style lang="scss">
.CodeMirror {
  text-align: left;
  border: 1px solid #ccc;
}
</style>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-dark.css";

import CM from "codemirror";

CM.defineMode("text/mml", () => {
  return {
    token(stream, state) {
      console.log(stream);
      if (stream.match("hoge")) {
        return "tag";
      } else if (stream.match("moe")) {
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
  computed: {
    codemirror() {
      return this.$refs.cm.codemirror;
    }
  },
  data() {
    return {
      code: "hoge hoge moemoe",
      cmOptions: {
        mode: "text/mml",
        theme: "base16-dark",
        lineNumbers: true,
        line: true
      }
    };
  },
  mounted() {
    this.initCodeMirror(this.codemirror);
  },
  methods: {
    initCodeMirror(cm) {}
  }
};
</script>

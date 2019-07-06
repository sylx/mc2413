<template>
  <div ref="wrapper" ondragstart="return false;" ondrop="return false;">
    <svg>
      <defs>
        <pattern
          id="ptn-grid"
          :width="quantize_width * quantize"
          height="112"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          :x="32 + grid_offset"
        >
          <g
            v-for="b in util.range(quantize)"
            :key="b"
            :transform="getTransform(b * quantize_width, 0)"
          >
            <rect class="a" y="0" :width="quantize_width" height="112" />
            <rect class="b" y="10" :width="quantize_width" height="9" />
            <rect class="b" y="28" :width="quantize_width" height="9" />
            <rect class="b" y="46" :width="quantize_width" height="9" />
            <rect class="b" y="74" :width="quantize_width" height="10" />
            <rect class="b" y="94" :width="quantize_width" height="9" />
            <line
              :class="getLineClass(b, quantize)"
              x1="0"
              y1="0"
              x2="0"
              y2="112"
            />
            <line class="d" x1="0" y1="0" :x2="quantize_width" y2="0" />
            <line class="c" x1="0" y1="64" :x2="quantize_width" y2="64" />
          </g>
        </pattern>
      </defs>
      <g :transform="getTransform(0, stage_pos.y * -1, scale)">
        <rect
          x="32"
          :width="stage_width"
          :height="octaves * 112"
          fill="url(#ptn-grid)"
          @mousedown="onDrag('start', $event)"
          @mouseup="onDrag('end', $event)"
          @mousemove="onDrag('move', $event)"
          @wheel.prevent="onDrag('wheel', $event)"
        ></rect>
        <g id="piano">
          <g
            v-for="o in util.range(octaves)"
            :key="`key-${o}`"
            :transform="getTransform(0, (9 - o) * 112)"
            :data-octave="o"
            @mousedown="onKeyboard('down', $event)"
            @mousemove="onKeyboard('move', $event)"
            @mouseup="onKeyboard('up', $event)"
            @mouseout="onKeyboard('out', $event)"
          >
            <rect class="a" y="96" width="32" height="16" data-note="c" />
            <rect class="a" y="80" width="32" height="16" data-note="d" />
            <rect class="a" y="64" width="32" height="16" data-note="e" />
            <rect class="a" y="48" width="32" height="16" data-note="f" />
            <rect class="a" y="32" width="32" height="16" data-note="g" />
            <rect class="a" y="16" width="32" height="16" data-note="a" />
            <rect class="a" y="0" width="32" height="16" data-note="b" />
            <rect class="b" y="94" width="20" height="8" data-note="c#" />
            <rect class="b" y="74" width="20" height="8" data-note="d#" />
            <rect class="b" y="46" width="20" height="8" data-note="f#" />
            <rect class="b" y="28" width="20" height="8" data-note="g#" />
            <rect class="b" y="10" width="20" height="8" data-note="a#" />
            <text class="c" transform="translate(22 108)">C{{ o }}</text>
          </g>
        </g>
        <g id="note" :transform="getTransform(stage_pos.x * -1, 0)">
          <g
            v-for="n in note"
            :key="n.id"
            :transform="
              getTransform(
                getXfromLength(n.time) + 32,
                getYfromNote(n.interval)
              )
            "
          >
            <rect
              class="note"
              :width="getXfromLength(n.duration)"
              :height="getHeightfromNote(n.interval)"
            />
            <text v-if="scale >= 2.0" transform="translate(2 6.5)">
              {{ getNoteName(n.interval) }}
            </text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style lang="scss">
svg {
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  #ptn-grid {
    .a {
      fill: #25282b;
    }
    .b {
      fill: #212326;
    }
    line {
      fill: none;
      stroke-miterlimit: 10;
      stroke-width: 1px;
    }
    .c,
    .tick {
      stroke: #36393b;
    }
    .d,
    .beat {
      stroke: #595b5d;
    }
    .measure {
      stroke-width: 2px;
      stroke: lighten(#595b5d, 15%);
    }
  }
  text {
    user-select: none;
  }
  #piano {
    $whole-tone-color: #b7c1cc;
    $half-tone-color: #5f6f7f;
    .a {
      fill: $whole-tone-color;
      stroke: $half-tone-color;
      stroke-miterlimit: 10;
      stroke-width: 0.25px;
      &:hover,
      &.active {
        fill: lighten($whole-tone-color, 15%);
      }
    }
    .b {
      fill: $half-tone-color;
      &:hover,
      &.active {
        fill: lighten($half-tone-color, 15%);
      }
    }
    .c {
      font-size: 6px;
      fill: #212326;
      font-family: ArialMT, Arial;
    }
    text {
      pointer-events: none;
    }
  }
  #note {
    .note {
      fill: #855181;
      stroke: #422f40;
      stroke-miterlimit: 10;
      stroke-width: 0.25px;
    }
    text {
      font-size: 5px;
      fill: #f7f7f8;
      font-family: ArialMT, Arial;
      pointer-events: none;
    }
  }
}
</style>
<script>
import { mapGetters } from "vuex";
import Color from "color";
import _ from "lodash";

const NOTE_MAP = {
  C: { y: 103, height: 9 },
  D: { y: 84, height: 10 },
  E: { y: 64, height: 10 },
  F: { y: 55, height: 9 },
  G: { y: 37, height: 9 },
  A: { y: 19, height: 9 },
  B: { y: 0, height: 10 },
  "C#": { y: 94, height: 9 },
  "D#": { y: 74, height: 10 },
  "F#": { y: 46, height: 9 },
  "G#": { y: 28, height: 9 },
  "A#": { y: 10, height: 9 }
};

export default {
  name: "piano-roll",
  props: {
    scale: {
      type: Number,
      default: 2.0
    },
    quantize: {
      type: Number,
      default: 8
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: String,
      default: "b4"
    }
  },
  data() {
    return {
      util: _,
      octaves: 10,
      stage_pos: {
        x: 0,
        y: 0
      },
      stage_width: 10000,
      last_pos: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateStageWidth);
    this.updateStageWidth();

    this.setStagePos(
      this.x * this.scale,
      this.getYfromNote(this.y) * this.scale
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateStageWidth);
  },
  computed: {
    quantize_width() {
      return (16 * 16) / this.quantize;
    },
    grid_offset() {
      return (this.stage_pos.x % (this.quantize_width * this.quantize)) * -1;
    },
    ...mapGetters("synth", {
      note: "noteSequence"
    })
  },
  watch: {
    scale(newVal, oldVal) {
      this.stage_pos.x *= newVal / oldVal;
      this.stage_pos.y *= newVal / oldVal;
      this.updateStageWidth();
    }
  },
  methods: {
    getTransform(x, y, scale) {
      let s = "";
      if (x !== null && y !== null) s += `translate(${x},${y})`;
      if (scale) s += ` scale(${scale})`;
      return s;
    },
    getLineClass(b, quantize) {
      if (b == 0) return "measure";
      return b % (quantize / 4) == 0 ? "beat" : "tick";
    },
    onDrag(type, e) {
      switch (type) {
        case "start":
          this.last_pos = {
            x: e.offsetX,
            y: e.offsetY
          };
          break;
        case "move":
          if (!e.buttons) this.last_pos = null;
          if (this.last_pos !== null) {
            this.setStagePos(
              this.stage_pos.x + (this.last_pos.x - e.offsetX) / this.scale,
              this.stage_pos.y + (this.last_pos.y - e.offsetY) / this.scale
            );
            this.last_pos = {
              x: e.offsetX,
              y: e.offsetY
            };
          }
          break;
        case "end":
          this.last_pos = null;
          break;
        case "wheel":
          this.setStagePos(
            this.stage_pos.x,
            this.stage_pos.y + e.deltaY / 2.0 / this.scale
          );
          break;
      }
    },
    onKeyboard(type, e) {
      let note = e.target.dataset.note + e.target.parentNode.dataset.octave;
      switch (type) {
        case "down":
          this.$store.dispatch("synth/noteOnTestTone", note);
          break;
        case "up":
          this.$store.dispatch("synth/noteOffTestTone");
          break;
        case "move":
          if (e.buttons) {
            this.$store.dispatch("synth/noteOnTestTone", note);
          }
          break;
        case "out":
          this.$store.dispatch("synth/noteOffTestTone");
          break;
      }
    },
    updateStageWidth() {
      this.stage_width = this.$refs.wrapper.offsetWidth / this.scale;
    },
    setStagePos(x, y) {
      this.stage_pos.x = Math.max(0, x);
      this.stage_pos.y = Math.min(
        Math.max(0, y),
        112 * 10 * this.scale - this.$refs.wrapper.offsetHeight
      );
    },
    normalizeNote(note) {
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
      let n = note.toUpperCase().match(/([A-G][#+-]*)(\d+)/);
      if (!n) return null;
      let name = n[1];
      if (trans[n[1]]) name = trans[n[1]];
      return {
        name: name,
        octave: n[2]
      };
    },
    getNoteName(note) {
      const n = this.normalizeNote(note);
      if (!n) return "";
      return n.name;
    },
    getYfromNote(note) {
      const n = this.normalizeNote(note);
      if (!n) return 0;
      return 112 * (9 - n.octave) + NOTE_MAP[n.name].y;
    },
    getHeightfromNote(note) {
      const n = this.normalizeNote(note);
      return NOTE_MAP[n.name].height;
    },
    getXfromLength(len) {
      return len * 16 * 4;
    }
  }
};
</script>

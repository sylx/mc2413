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

const NOTE_COLOR_MIN = "#2283e5";
const NOTE_COLOR_MID = "#855181";
const NOTE_COLOR_MAX = "#e42222";

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
      last_pos: null,
      selection: null,
      cursorX: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateStageWidth);
    this.updateStageWidth();

    this.setStagePos(
      this.x * this.scale,
      this.getYfromNote(this.y) * this.scale
    );

    this.$store.subscribeAction((action, state) => {
      if (action.type == "synth/tickSequence") {
        const time = action.payload;
        let x = this.getXfromTime(time);
        this.cursorX = x;
        const cx = this.stage_width / 2;
        if (x > this.stage_pos.x + cx || x < this.stage_pos.x) {
          this.setStagePos(x - cx, this.stage_pos.y);
        }
      }
      if (action.type == "synth/beforeNoteOn") {
        const note = action.payload;
        this.setCenterInterval(note.interval);
      }
      if (action.type == "synth/noteOn") {
        const note = action.payload;
        this.flushKeyboard(true, note);
      }
      if (action.type == "synth/noteOff") {
        const note = action.payload;
        this.flushKeyboard(false, note, 100);
      }
      if (action.type == "synth/changeCursorMML") {
        const pos = action.payload;
        let note = null,
          last = { line: 1, column: 1 };
        this.note.some(n => {
          if (
            n.start.line == pos.line &&
            n.start.column <= pos.column &&
            n.end.column > pos.column
          ) {
            note = n;
            return true;
          }
        });
        if (note) {
          this.setCenterInterval(note.interval, note.time);
          this.cursorX = this.getXfromTime(note.time);
        }
      }
    });
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
          this.$refs.stage.classList.remove("trans");
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
          this.$refs.stage.classList.add("trans");
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
        "E#": "F",
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
        org_name: n[1].toUpperCase(),
        octave: n[2]
      };
    },
    getNoteName(note) {
      const n = this.normalizeNote(note);
      if (!n) return "";
      return n.org_name;
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
    getXfromTime(len) {
      return len * 16 * 4;
    },
    getNoteColor(note, active) {
      const v = note.velocity;
      let color;
      if (v > 0.5) {
        color = Color(NOTE_COLOR_MID);
        color = color.mix(Color(NOTE_COLOR_MAX), (v - 0.5) * 2);
      } else {
        color = Color(NOTE_COLOR_MIN);
        color = color.mix(Color(NOTE_COLOR_MID), v * 2);
      }
      return active
        ? color
            .lighten(0.5)
            .rgb()
            .string()
        : color.rgb().string();
    },
    //bad function
    flushKeyboard(on, note, delay) {
      const nn = this.normalizeNote(note.interval);
      const name = nn.name.toLowerCase(),
        octave = nn.octave;

      const dom = this.$refs.piano.querySelector(
        `g[data-octave="${octave}"] rect[data-note="${name}"]`
      );
      if (dom) {
        const fn = () => {
          if (on) {
            dom.classList.add("active");
          } else {
            dom.classList.remove("active");
          }
        };
        if (delay) {
          _.delay(fn, delay);
        } else {
          fn();
        }
      }
    },
    onClickNote(evt, note) {
      if (this.selection) {
        this.$set(this.selection, "selected", false);
      }
      this.$set(note, "selected", true);
      this.setCenterInterval(note.interval, note.time);
      this.cursorX = this.getXfromTime(note.time);
      this.selection = note;
      this.$store.dispatch("synth/selectNote", note);
    },
    setCenterInterval(interval, time) {
      let y = this.getYfromNote(interval) * this.scale,
        x =
          this.getXfromTime(time) -
          this.$refs.wrapper.offsetWidth / 2 / this.scale;
      if (x < 0) x = 0;
      let ydir = null;
      if (y < this.stage_pos.y) ydir = "up";
      if (y > this.stage_pos.y + this.$refs.wrapper.offsetHeight) ydir = "down";

      if (ydir || x != this.stage_pos.x) {
        this.setStagePos(
          time ? x : this.stage_pos.x,
          ydir
            ? ydir == "up"
              ? y
              : y - this.$refs.wrapper.offsetHeight
            : this.stage_pos.y
        );
      }
    }
  }
};

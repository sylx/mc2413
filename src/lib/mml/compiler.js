import MmlParser from "./parser.js";
import _ from "lodash";

const triggerError = (message, start, end) => {
  const err = new SyntaxError(message);
  err.start = _.clone(start);
  if (end) {
    err.end = _.clone(end);
  } else {
    err.end = {
      line: start.line,
      column: start.column + 1
    };
  }
  throw err;
};

const limit = (min, max, value) => {
  return Math.max(min, Math.min(max, value));
};

class TokenScanner {
  constructor(token) {
    this.token = token;
    this.index = 0;
  }
  hasNext() {
    return this.index < this.token.length;
  }
  peek() {
    return this.token[this.index] || null;
  }
  prev() {
    return this.index > 0 ? this.token[this.index - 1] || null : null;
  }
  next() {
    return this.token[this.index++];
  }
  match(name) {
    let c = this.peek();
    return c && c.name === name;
  }
  expect(name) {
    let c = this.peek();
    if (c && c.name == name) {
      return this.next();
    }
    triggerError(`compile error: Expected ${name}`, c.start, c.end);
  }
  setIndex(index) {
    this.index = index;
  }
  getIndex() {
    return this.index;
  }
}

class MmlCompiler {
  constructor() {
    this.defaultParams = {
      octave: 4,
      length: 1.0,
      velocity: 8 / 15,
      quantize: 1.0
    };
    this.tempo = null;
    this.clear();
  }
  clear() {
    this.index = 1;
    this.tracks = {};
    this.tones = {};
  }
  getTrack(name) {
    if (this.tracks[name]) {
      return this.tracks[name];
    }
    return this.createTrack(name);
  }
  createTrack(name) {
    this.tracks[name] = _.merge(
      {
        time: 0,
        type: null,
        data: [],
        name
      },
      this.defaultParams
    );
    return this.tracks[name];
  }
  getData() {
    return _.mapValues(this.tracks, tr => tr.data);
  }
  getTone() {
    return this.tones;
  }
  getTrackType() {
    return _.mapValues(this.tracks, tr => tr.type);
  }
  compile(src) {
    this.clear();
    const ast = MmlParser.parse(src);
    if (ast.status === false) {
      const expected = ast.expected.join(" or ");
      triggerError(
        `parse error: expected ${expected}`,
        {
          line: ast.index.line,
          column: ast.index.column
        },
        {
          line: ast.index.line,
          column: src.split(/\n/)[ast.index.line - 1].length + 1
        }
      );
    }
    //base layer
    const token = {};
    ast.value.forEach(n => {
      if (n.name == "track") {
        n.value.target.forEach(name => {
          let track = this.getTrack(name);
          if (!token[name]) token[name] = [];
          Array.prototype.push.apply(token[name], n.value.mml);
        });
      } else if (n.name == "define_tone") {
        const def = n.value;
        this.tones[def.name] = _.merge(
          {
            start: n.start,
            end: n.end
          },
          def
        );
      } else if (n.name == "define_track") {
        const def = n.value;
        def.target.forEach(tr => {
          let track = this.getTrack(tr);
          track.type = def.type;
        });
      } else if (n.name == "define_tempo") {
        this.tempo = n.value;
      }
    });
    _.forIn(this.tracks, (track, name) => {
      if (token[name]) this.compileMml(track, token[name]);
    });
    return this.getData();
  }
  compileMml(track, token) {
    let is_slur = false;
    const calcDuration = (length, quantize) => {
      return length * quantize;
    };
    const calcLength = node => {
      const len = node.value;
      let length = 0,
        last_ln = null,
        tie = 1;
      len.forEach((ln, i) => {
        switch (ln) {
          case 0:
            break;
          case "+":
          case "^":
          case "\\":
          case "-":
            if (last_ln === null) {
              length += track.length * tie;
              last_ln = track.length;
            } else {
              last_ln = null;
            }
            tie = ln == "+" || ln == "^" ? 1 : -1;
            if (i == len.length - 1) {
              length += track.length * tie;
            }
            break;
          case ".":
            if (last_ln === null) {
              length += track.length * tie;
              last_ln = track.length;
            }
            last_ln = last_ln / 2;
            length += last_ln * tie;
            break;
          default:
            last_ln = 4 / ln;
            length += last_ln * tie;
            break;
        }
        //        console.log(len, ln, length);
      });
      if (length <= 0) {
        triggerError(`compile error: Invalid length`, node.start, node.end);
      }
      return length;
    };
    const push = event => {
      track.data.push(
        _.merge(
          {
            id: this.index++,
            tr: track.name
          },
          event
        )
      );
    };

    const scanner = new TokenScanner(token);

    const loop_stack = [];
    while (scanner.hasNext()) {
      const s = scanner;
      const c = s.next();
      let ln, peek;
      switch (c.name) {
        case "interval":
          ln = s.match("length") ? calcLength(s.next()) : track.length;
          push({
            type: is_slur ? "pitch" : "note",
            interval: String(c.value) + String(track.octave),
            time: track.time,
            duration: s.match("slur") ? ln : calcDuration(ln, track.quantize),
            velocity: track.velocity,
            start: c.start,
            end: s.prev().end
          });
          track.time += ln;
          is_slur = false;
          break;
        case "rest":
          ln = s.match("length") ? calcLength(s.next()) : track.length;
          track.time += ln;
          break;
        case "octave_set":
          track.octave = limit(0, 9, s.expect("amount").value);
          break;
        case "octave_shift":
          track.octave += c.value == ">" ? 1 : -1;
          track.octave = limit(0, 8, track.octave);
          break;
        case "length_set":
          track.length = calcLength(s.expect("length"));
          break;
        case "velocity_set":
          track.velocity = limit(0, 1, s.expect("amount").value / 15);
          break;
        case "quantize_set":
          track.quantize = limit(0, 1, s.expect("amount").value / 8);
          break;
        case "slur":
          is_slur = true;
          break;
        case "bpm_set":
          push({
            type: "bpm",
            time: track.time,
            bpm: limit(1, 600, s.expect("amount").value),
            start: c.start,
            end: s.prev().end
          });
          break;
        case "loop_start":
          loop_stack.push({
            index: s.getIndex(),
            count: null,
            time: track.time
          });
          break;
        case "loop_branch":
          peek = loop_stack[loop_stack.length - 1];
          if (peek.count === 1) {
            loop_stack.pop();
            s.setIndex(peek.endIndex);
          }
          break;
        case "loop_end":
          if (loop_stack.length == 0) {
            triggerError(`compileError: missing "["`, c.start, c.end);
          }
          peek = loop_stack[loop_stack.length - 1];
          if (peek.count === null) {
            if (c.value === 0) {
              push({
                type: "runtime_loop",
                count: c.value,
                time: peek.time,
                start: peek.time,
                end: track.time
              });
            }
            peek.count = c.value;
            peek.endIndex = s.getIndex();
          }
          peek.count--;
          if (peek.count > 0) {
            s.setIndex(peek.index);
          } else {
            loop_stack.pop();
          }
          break;
        case "set_tone":
          // if (!this.tones[c.value]) {
          //   triggerError(`compileError: undefined tone`, c.start, c.end);
          // }
          //   if (this.tones[c.value].type != track.type) {
          //     const to_type = this.tones[c.value].type;
          //     const tr_type = track.type;
          //     triggerError(
          //       `compileError: invalid tone type. tone type is ${to_type},but track type is ${tr_type}`,
          //       c.start,
          //       c.end
          //     );
          //   }
          push({
            type: "set_tone",
            tone: c.value,
            time: track.time
          });
          break;
        default:
          break;
      }
    }
  }
}

export default new MmlCompiler();

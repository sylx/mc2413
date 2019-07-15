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
}

const MmlCompiler = src => {
  let index = 1,
    time = 0,
    octave = 4,
    length = 1,
    velocity = 8 / 15,
    quantize = 1.0;
  let is_slur = false;

  const calcDuration = (length, quantize) => {
    return length * quantize;
  };
  const calcLength = node => {
    const len = node.value;
    let length = 0,
      last_ln = null,
      tie = 1;
    len.forEach(ln => {
      switch (ln) {
        case 0:
          break;
        case "+":
        case "^":
          tie = 1;
          break;
        case "-":
        case "\\":
          tie = -1;
          break;
        case ".":
          length += last_ln = (last_ln / 2) * tie;
          break;
        default:
          length += last_ln = (4 / ln) * tie;
          break;
      }
    });
    if (length <= 0) {
      triggerError(`compile error: Invalid length`, node.start, node.end);
    }
    return length;
  };
  const data = [];
  const push = event => {
    data.push(
      _.merge(
        {
          id: index++
        },
        event
      )
    );
  };

  const token = MmlParser.parse(src);
  if (token.status === false) {
    const expected = token.expected.join(" or ");
    triggerError(
      `parse error: expected ${expected}`,
      {
        line: token.index.line,
        column: token.index.column
      },
      {
        line: token.index.line,
        column: src.split(/\n/)[token.index.line].length
      }
    );
  }
  const scanner = new TokenScanner(token.value);

  while (scanner.hasNext()) {
    const s = scanner;
    const c = s.next();
    let ln;
    switch (c.name) {
      case "interval":
        ln = s.match("length") ? calcLength(s.next()) : length;
        push({
          type: is_slur ? "pitch" : "note",
          interval: String(c.value) + String(octave),
          time: time,
          duration: s.match("slur") ? ln : calcDuration(ln, quantize),
          velocity,
          start: c.start,
          end: s.prev().end
        });
        time += ln;
        is_slur = false;
        break;
      case "rest":
        ln = s.match("length") ? calcLength(s.next()) : length;
        time += ln;
        break;
      case "octave_set":
        octave = limit(0, 9, s.expect("amount").value);
        break;
      case "octave_shift":
        octave += c.value == ">" ? 1 : -1;
        octave = limit(0, 8, octave);
        break;
      case "length_set":
        length = calcLength(s.expect("length"));
        break;
      case "velocity_set":
        velocity = limit(0, 1, s.expect("amount").value / 15);
        break;
      case "quantize_set":
        quantize = limit(0, 1, s.expect("amount").value / 8);
        break;
      case "slur":
        is_slur = true;
        break;
      case "bpm_set":
        push({
          type: "bpm",
          time: time,
          bpm: limit(1, 600, s.expect("amount").value),
          start: c.start,
          end: s.prev().end
        });
        break;
    }
  }
  return data;
};

export default MmlCompiler;

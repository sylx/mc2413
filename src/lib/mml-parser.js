import P from "parsimmon";
import _ from "lodash";

//空白+:
const space = P.regexp(/[ \t:\r\n]*/).node("empty");
const space_exists = P.regexp(/[ \t:\r\n]+/).node("empty");
//数値
const number = P.regexp(/\d+/).map(a => {
  return parseInt(a);
});
//無
const empty = P.of("").node("empty");

//音程
const interval = P.regexp(/[a-g][#+-]?/i)
  .map(s => {
    return s.toLowerCase();
  })
  .node("interval")
  .desc("note");
//休符
const rest = P.regexp(/r/i)
  .node("rest")
  .desc("R");

//音長
const length = P.alt(number, P.regexp(/[.^+\-\\]/))
  .many()
  .node("length")
  .desc("length");

//スラー
const slur = P.string("&").node("slur");

//音長のあるもの(省略可)
const withLength = P.seq(
  P.alt(interval, rest),
  length.or(empty).skip(space), //optional
  slur.or(empty).skip(space) //optional
);

// ex)L8 L4. L4&16
const setLength = P.seq(
  P.alt(
    P.regexp(/l/i)
      .map(s => s.toLowerCase())
      .node("length_set")
      .desc("L")
  ),
  length
);

const withAmount = P.seq(
  P.alt(
    P.regexp(/o/i)
      .node("octave_set")
      .desc("O"),
    P.regexp(/q/i)
      .node("quantize_set")
      .desc("Q"),
    P.regexp(/t/i)
      .node("bpm_set")
      .desc("T"),
    P.regexp(/v/i)
      .node("velocity_set")
      .desc("V")
  ),
  number.node("amount")
).desc("number");

const command = P.alt(
  P.string(">").node("octave_shift"),
  P.string("<").node("octave_shift")
);

const comment = P.seqMap(P.string("//"), P.regexp(/.*/), (a, b) => "");

function isEmpty(x) {
  if (x.name && x.name == "empty") return true;
  if (x.value) {
    let v = x.value;
    if (v.hasOwnProperty("length") && v.length == 0) return true;
  }
  return x ? false : true;
}

const MmlParser = P.alt(
  withLength,
  setLength,
  withAmount,
  command,
  comment,
  space_exists
)
  .skip(space)
  .many()
  .map(r => {
    return r.flat().filter(x => {
      return !isEmpty(x);
    });
  });

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
        octave = s.expect("amount").value;
        break;
      case "octave_shift":
        octave += c.value == ">" ? 1 : -1;
        break;
      case "length_set":
        length = calcLength(s.expect("length"));
        break;
      case "velocity_set":
        velocity = s.expect("amount").value / 15;
        break;
      case "quantize_set":
        quantize = s.expect("amount").value / 8;
        break;
      case "slur":
        is_slur = true;
        break;
      case "bpm_set":
        push({
          type: "bpm",
          time: time,
          bpm: parseInt(s.expect("amount").value),
          start: c.start,
          end: s.prev().end
        });
        break;
    }
  }
  return data;
};

export default MmlCompiler;
export { MmlParser, MmlCompiler };

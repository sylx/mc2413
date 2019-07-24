import P from "parsimmon";
import _ from "lodash";

function isEmpty(x) {
  if (x.name && x.name == "empty") return true;
  if (x.value) {
    let v = x.value;
    if (v.hasOwnProperty("length") && v.length == 0) return true;
  }
  return x ? false : true;
}

//空白
const optWhitespace = P.regexp(/[ \t]*/).node("empty"); // "empty" nodes may be ignored..
const whitespace = P.regexp(/[ \t]+/).node("empty");
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
  length.or(empty).skip(optWhitespace), //optional
  slur.or(empty).skip(optWhitespace) //optional
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

const comment = P.seqMap(P.string("//"), P.regexp(/.*/), (a, b) => "").trim(
  optWhitespace
);

const loop_start = P.string("[").node("loop_start");
const loop_branch = P.string("|").node("loop_branch");
const loop_end = P.seqMap(P.string("]"), number.or(empty), (cl, count) => {
  if (count.name == "empty") return 2;
  return count;
}).node("loop_end");

const mml = P.alt(
  withLength,
  setLength,
  withAmount,
  command,
  loop_start,
  loop_branch,
  loop_end,
  comment
)
  .skip(optWhitespace)
  .many()
  .map(r => {
    return r.flat().filter(x => {
      return !isEmpty(x);
    });
  });

const track = P.seqMap(
  P.regexp(/[a-z0-9]+/i),
  whitespace,
  mml,
  (tr, sp, mml) => {
    return {
      target: _.filter(tr.split("").map(a => _.trim(a).toLowerCase())),
      mml: mml
    };
  }
)
  .trim(optWhitespace)
  .node("track")
  .desc("track");

const MmlParser = P.alt(comment, track, optWhitespace)
  .sepBy(P.newline)
  .map(r => {
    return r.filter(x => {
      return !isEmpty(x);
    });
  });

export default MmlParser;

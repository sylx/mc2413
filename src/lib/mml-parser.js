import P from "parsimmon";

//空白+:
const space = P.regexp(/[ \t:\r\n]*/);
//数値
const number = P.regexp(/\d+/).map(a => {
  return parseInt(a);
});
//無
const empty = P.of("").node("empty");

//音程
const interval = P.regexp(/[a-g][#+-]*/i)
  .map(s => {
    return s.toLowerCase();
  })
  .node("interval")
  .desc("note");
//休符
const rest = P.regexp(/r/i)
  .node("rest")
  .desc("rest");

//音長
const length = P.alt(number, P.regexp(/[.^+\-\\]/))
  .many()
  .node("length")
  .desc("length");

//スラー
const slur = P.string("&").node("slur");

//コード
const chord = P.seqMap(
  P.string("'"),
  interval.many(),
  P.string("'"),
  (qo, c, qc) => {
    return c.map(x => x.value);
  }
)
  .node("chord")
  .desc("chord");

//音調のあるもの(省略可)
const withLength = P.seq(
  P.alt(interval, rest, chord),
  length.or(empty), //optional
  slur.or(empty) //optional
);

// ex)L8 L4. L4&16
const setLength = P.seq(
  P.alt(
    P.regexp(/l/i)
      .map(s => s.toLowerCase())
      .node("length_set")
  ),
  length
);

const withAmount = P.seq(
  P.alt(
    P.regexp(/o/i).node("octave_set"),
    P.regexp(/q/i).node("quantize_set"),
    P.regexp(/t/i).node("tempo_set"),
    P.regexp(/t/i).node("velocity_set")
  ),
  number.node("amount")
);

const command = P.alt(
  P.string(">").node("octave_shift"),
  P.string("<").node("octave_shift")
);

function isEmpty(x) {
  if (x.name && x.name == "empty") return true;
  if (x.value) {
    let v = x.value;
    if (v.hasOwnProperty("length") && v.length == 0) return true;
  }
  return x ? false : true;
}

const Mml = P.alt(withLength, setLength, withAmount, command)
  .skip(space)
  .many()
  .map(r => {
    return r.flat().filter(x => {
      return !isEmpty(x);
    });
  });

export default Mml;

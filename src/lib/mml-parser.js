import P from "parsimmon";

//空白+:は無視する
const space = P.regexp(/[ \t:\r\n]*/);
//音程
const interval = P.regexp(/[a-g][#+-]*/i)
  .map(s => {
    return s.toLowerCase();
  })
  .node("interval");
//休符
const rest = P.regexp(/r/i).node("rest");

//音長
const length = P.regexp(/[\d.^+\-\\]+/)
  .map(s => {
    return s;
  })
  .node("length");

const tie = P.string("^").node("tie");

const slur = P.string("&").node("slur");

const withLength = P.seq(
  P.alt(interval, rest, tie),
  length.or(P.of("")), //optional
  slur.or(P.of("")) //optional
);

// ex)L8 L4. L4&16
const setLength = P.seq(
  P.alt(
    P.regexp(/l/i)
      .map(s => s.toLowerCase)
      .node("set_length"),
    tie
  ),
  length
);

const amount = P.regexp(/\d+/)
  .map(a => {
    return parseInt(a);
  })
  .node("amount");

const withAmount = P.seq(
  P.alt(
    P.regexp(/o/i).node("set_octave"),
    P.regexp(/q/i).node("set_gate"),
    P.regexp(/t/i).node("set_tempo")
  ),
  amount
);

const command = P.alt(
  P.string(">").node("octave up"),
  P.string("<").node("octave down")
);

const MmlParser = P.alt(withLength, setLength, withAmount, command)
  .skip(space)
  .many();

export default MmlParser;

import P from "parsimmon";

//空白+:は無視する
const space = P.regexp(/[ \t:\r\n]*/);
const number = P.regexp(/\d+/).map(a => {
  return parseInt(a);
});

//音程
const interval = P.regexp(/[a-g][#+-]*/i)
  .map(s => {
    return s.toLowerCase();
  })
  .node("interval");
//休符
const rest = P.regexp(/r/i).node("rest");

//音長
const length = P.alt(number, P.regexp(/[.^+\-\\]/))
  .many()
  .node("length");

const slur = P.string("&").node("slur");

const withLength = P.seq(
  P.alt(interval, rest),
  length.or(P.of("")), //optional
  slur.or(P.of("")) //optional
);

// ex)L8 L4. L4&16
const setLength = P.seq(
  P.alt(
    P.regexp(/l/i)
      .map(s => s.toLowerCase())
      .node("set_length")
  ),
  length
);

const withAmount = P.seq(
  P.alt(
    P.regexp(/o/i).node("octave_set"),
    P.regexp(/q/i).node("gate_set"),
    P.regexp(/t/i).node("tempo_set")
  ),
  number
);

const command = P.alt(
  P.string(">").node("octave_up"),
  P.string("<").node("octave_down")
);

function isEmpty(x) {
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

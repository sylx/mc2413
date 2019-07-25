import P from "parsimmon";
import util from "util";
import _ from "lodash";

function dumpAST(p, text) {
  let r = p.parse(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

test("combi", () => {
  const lang = P.createLanguage({
    hoge: () => P.string("hoge"),
    moe: () => P.string("moe"),
    hogemoe: r => r.hoge.then(r.moe),
    hogemoe2: r =>
      P.seqMap(r.hoge, r.moe, (h, m) => {
        return h + m;
      }),
    alt: r => P.alt(r.hoge, r.moe).many()
  });
  expect(lang.hoge.parse("hoge")).toMatchObject({ status: true });
  expect(lang.moe.parse("hoge")).toMatchObject({ status: false });
  expect(lang.hoge.many().parse("hogehoge")).toMatchObject({ status: true });
  expect(lang.hogemoe.parse("moehoge")).toMatchObject({ status: false });
  expect(lang.hogemoe.parse("hogemoe")).toMatchObject({ status: true });
  expect(lang.hogemoe2.tryParse("hogemoe")).toEqual("hogemoe");
  expect(lang.hogemoe2.many().tryParse("hogemoehogemoe")).toEqual([
    "hogemoe",
    "hogemoe"
  ]);
  expect(lang.hogemoe.parse("hogemoehoge")).toMatchObject({ status: false });
  expect(lang.alt.parse("hoge")).toMatchObject({ status: true });
  expect(lang.alt.parse("moe")).toMatchObject({ status: true });
  expect(lang.alt.parse("moehogehogehogemoe")).toMatchObject({ status: true });
});

test("combi2", () => {
  //とりあえず予約語
  const hoge = P.string("hoge");
  const moe = P.string("moe");
  //hoge moeが任意の順序で現れる
  const hogemoe = P.alt(hoge, moe).many();
  expect(hogemoe.tryParse("hogemoehogemoemoe")).toEqual([
    "hoge",
    "moe",
    "hoge",
    "moe",
    "moe"
  ]);
  //hogemoeでwhitespaceを許容
  const hogemoe_withspace = P.alt(hoge, moe)
    .skip(P.optWhitespace)
    .many();
  expect(
    hogemoe_withspace.tryParse("hoge moe hogemoe       moe\nhogehoge")
  ).toEqual(["hoge", "moe", "hoge", "moe", "moe", "hoge", "hoge"]);
  //必ずmoehogeの順序で、hogeは省略可能
  const moehoge = P.seq(moe, hoge.or(P.of("")))
    .tie()
    .many();
  expect(moehoge.tryParse("moehogemoe")).toEqual(["moehoge", "moe"]);
  expect(moehoge.parse("hogemoe")).toMatchObject({ status: false });
});

test("map", () => {
  const note = P.regexp(/[a-g][#+-]*/i).map(x => {
    return x.toLowerCase();
  });
  expect(note.many().tryParse("cDE-")).toEqual(["c", "d", "e-"]);
});

test("gate", () => {
  function rangeValue(min, max) {
    return P((input, i) => {
      const parser = P.regexp(/\d+/);
      let r = parser._(input);
      let v = parseInt(r.value);
      console.log(input, i);
      if (r.status && v >= min && v <= max) {
        return P.makeSuccess(i + r.value.length, v);
      } else {
        return P.makeFailure(i, `${v} is out of range(${min},${max})`);
      }
    });
  }
  const hoge = P.string("hoge");
  //  const parser=P.seq(hoge,rangeValue(1,8));
  //  console.log(parser.parse("hoge008"));
  const map = P.seq(
    hoge,
    P.regexp(/\d+/).map(x => {
      let v = parseInt(x);
      if (v >= 1 && v <= 8) {
        return v;
      } else {
        return P.makeFailure(0, `out of range`);
      }
    })
  );
  //  console.log(map.parse("hoge0018"));
  expect(true).toBe(true);
});

test("error", () => {
  expect(
    P.string("hoge")
      .desc("keyword_hoge")
      .parse("moe")
  ).toMatchObject({
    status: false,
    expected: ["keyword_hoge"]
  });
});

test("sepBy", () => {
  const identifier = P.regexp(/[a-z0-9_-]+/i).map(x => x.toLowerCase());
  const number = P.regexp(/[0-9]+/).map(x => parseInt(x));
  const interpretEscape = str => {
    const escapes = {
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "\t"
    };
    return str.replace(/\\(u[0-9a-fA-F]{4}|[^u])/, (_, escape) => {
      let type = escape.charAt(0);
      let hex = escape.slice(1);
      if (type === "u") {
        return String.fromCharCode(parseInt(hex, 16));
      }
      if (escapes.hasOwnProperty(type)) {
        return escapes[type];
      }
      return type;
    });
  };
  const string = P.regexp(/"((?:\\.|.)*?)"/, 1)
    .map(interpretEscape)
    .desc("string");

  const param = P.seqMap(
    identifier.map(x => x.toLowerCase()).skip(P.optWhitespace),
    P.string(":").skip(P.optWhitespace),
    P.alt(number, string)
      .trim(P.optWhitespace)
      .node("defineParamValue")
      .sepBy(P.string(",")),
    (ident, colon, values) => [ident, values]
  ).trim(P.optWhitespace);
  const defineParams = P.seqMap(
    P.string("@"),
    identifier.desc("identifier"),
    P.whitespace,
    identifier.trim(P.optWhitespace).desc("type"),
    P.string("{"),
    param.many(),
    P.string("}"),
    (s, name, div, type, o, params, c) => {
      return {
        identifier: name,
        type: type,
        params: _.zipObject(params.map(x => x[0]), params.map(x => x[1]))
      };
    }
  )
    .trim(P.optWhitespace)
    .node("defineParam");

  expect(param.parse(' HOGE : 1 , 2,"moe",4')).toMatchObject({
    status: true
    //    value: ["hoge", [1, 2, "moe", 4]]
  });
  expect(
    defineParams.parse(
      `@v01 nes {
PARAM1: 1,2,3
PA_RAM2: "string\\""
}`
    )
  ).toMatchObject({
    status: true,
    value: {
      name: "defineParam",
      value: {
        identifier: "v01",
        type: "nes",
        params: {
          param1: [{ value: 1 }, { value: 2 }, { value: 3 }],
          pa_ram2: [{ value: 'string"' }]
        }
      }
    }
  });
});

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

function interpretEscape(str) {
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
}

//空白
const optWhitespace = P.regexp(/[ \t]*/)
  .node("empty")
  .desc("whitespace"); // "empty" nodes may be ignored..
const whitespace = P.regexp(/[ \t]+/)
  .node("empty")
  .desc("whitespace");
//数値
const number = P.regexp(/\d+/).map(a => {
  return parseInt(a);
});
//文字列
const string = P.regexp(/"((?:\\.|.)*?)"/, 1)
  .map(interpretEscape)
  .desc("string");

const identifier = P.regexp(/[a-z0-9_-]+/i).map(x => x.toLowerCase());

//無
const empty = P.of("").node("empty");

//コメント
const comment = P.regexp(/\s*\/\/.*/)
  .node("empty")
  .desc("comment");

const Mml = P.createLanguage({
  interval: r => {
    return P.regexp(/[a-g][#+-]?/i)
      .map(s => {
        return s.toLowerCase();
      })
      .node("interval")
      .desc("note");
  },
  rest: r => {
    return P.regexp(/r/i)
      .node("rest")
      .desc("R");
  },
  length: r => {
    return P.alt(number, P.regexp(/[.^+\-\\]/))
      .many()
      .node("length")
      .desc("length");
  },
  slur: r => P.string("&").node("slur"),
  withLength: r => {
    return P.seq(
      P.alt(r.interval, r.rest),
      r.length.or(empty).skip(optWhitespace), //optional
      r.slur.or(empty).skip(optWhitespace) //optional
    );
  },
  setLength: r => {
    return P.seq(
      P.alt(
        P.regexp(/l/i)
          .map(s => s.toLowerCase())
          .node("length_set")
          .desc("L")
      ),
      r.length
    );
  },
  withAmount: r => {
    return P.seq(
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
  },
  command: r => {
    return P.alt(
      P.string(">").node("octave_shift"),
      P.string("<").node("octave_shift")
    );
  },
  loop_start: r => P.string("[").node("loop_start"),
  loop_branch: r => P.string("|").node("loop_branch"),
  loop_end: r => {
    return P.seqMap(P.string("]"), number.or(empty), (cl, count) => {
      if (count.name == "empty") return 2;
      return count;
    }).node("loop_end");
  },
  setTone: r => {
    return P.seqMap(
      P.string("@"),
      P.alt(
        number,
        P.seqMap(P.string("`"), identifier, P.string("`"), (o, name, c) => name)
      ).desc("name"),
      (atmark, name) => name
    )
      .node("set_tone")
      .desc("@0 or @`a`");
  },
  mml: r => {
    return P.alt(
      r.withLength,
      r.setLength,
      r.withAmount,
      r.command,
      r.loop_start,
      r.loop_branch,
      r.loop_end,
      r.setTone,
      comment
    )
      .skip(optWhitespace)
      .many()
      .map(r => {
        return r.flat().filter(x => {
          return !isEmpty(x);
        });
      });
  }
});

const trackName = P.seqMap(
  P.regexp(/[a-z0-9]/i),
  P.seqMap(P.string("-"), P.regexp(/[a-z0-9]/i), (a, b) => b).or(empty),
  (start, end) => {
    if (isEmpty(end)) {
      return [start.toLowerCase()];
    } else {
      // expand trackname
      const s = start.toLowerCase(),
        e = end.toLowerCase(),
        sc = s.charCodeAt(0),
        ec = e.charCodeAt(0),
        CODE_A = "a".charCodeAt(0),
        CODE_Z = "z".charCodeAt(0),
        CODE_0 = "0".charCodeAt(0),
        CODE_9 = "9".charCodeAt(0);
      const ret = [];
      if (sc >= CODE_A && sc <= CODE_Z && ec >= CODE_A && ec <= CODE_Z) {
        return _.range(sc, ec + 1).map(x => String.fromCharCode(x));
      } else if (sc >= CODE_0 && sc <= CODE_9 && ec >= CODE_0 && ec <= CODE_9) {
        return _.range(sc, ec + 1).map(x => String.fromCharCode(x));
      } else {
        return [s, e];
      }
    }
  }
)
  .many()
  .map(a => _.flatten(a))
  .desc("trackName");

const track = P.seqMap(trackName, whitespace, Mml.mml, (tr, sp, mml) => {
  return {
    target: tr,
    mml: mml
  };
})
  .trim(optWhitespace)
  .node("track")
  .desc("track");

const setParams = P.createLanguage({
  whitespace: r => P.alt(P.whitespace, comment).many(), //with newline...
  optWhitespace: r => P.alt(r.whitespace, empty),
  value: r => {
    return P.seqMap(
      identifier
        .map(x => x.toLowerCase())
        .trim(optWhitespace)
        .desc("key"),
      P.string(":"),
      P.alt(number, string, P.of(""))
        .trim(r.optWhitespace)
        .node("define_tone_value")
        .sepBy(P.string(",")),
      (ident, colon, values) => [ident, values]
    );
  },
  toneName: r => {
    return P.alt(
      number,
      P.seqMap(P.string("`"), identifier, P.string("`"), (o, v, c) => v)
    );
  },
  tone: r => {
    return P.seqMap(
      P.string("@"),
      r.toneName.desc("name"),
      P.string(":").trim(r.optWhitespace),
      identifier.desc("type"),
      r.optWhitespace,
      P.string("{"),
      r.value.many().trim(r.optWhitespace),
      P.string("}"),
      comment.or(empty),
      (s, name, div, type, sp, o, params, c) => {
        return {
          name,
          type,
          params: _.zipObject(params.map(x => x[0]), params.map(x => x[1]))
        };
      }
    )
      .trim(optWhitespace)
      .node("define_tone");
  }
});

const setGlobal = P.createLanguage({
  track: r => {
    return P.seqMap(
      P.string("track"),
      whitespace,
      trackName,
      whitespace,
      identifier,
      (sig, sp1, target, sp2, type) => {
        return {
          target,
          type
        };
      }
    ).node("define_track");
  },
  tempo: r => {
    return P.seqMap(P.string("tempo"), whitespace, number, (sig, sp, tempo) => {
      return tempo;
    }).node("define_tempo");
  },
  define: r => {
    return P.seqMap(
      P.string("#"),
      P.alt(r.tempo, r.track),
      comment.or(empty),
      (def, node, c) => node
    ).trim(optWhitespace);
  }
});

const MmlParser = P.alt(comment, track, setParams.tone, setGlobal.define, empty)
  .sepBy(P.newline)
  .map(r => {
    return r.filter(x => {
      return !isEmpty(x);
    });
  });

export default MmlParser;

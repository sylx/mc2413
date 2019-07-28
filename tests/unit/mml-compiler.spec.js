import util from "util";
import { MmlCompiler as compiler } from "../../src/lib/mml";

const compile = src => compiler.compile(src);

function dumpSEQ(text) {
  let r = compile(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

test("time & length", () => {
  expect(compile("a l4 r2a8.^32-32")).toMatchObject({
    a: [
      {
        id: 1,
        type: "note",
        interval: "a4",
        time: 2.0,
        duration: 0.5 + 0.25 + 0.125 - 0.125
      }
    ]
  });
});
test("tie & set_length", () => {
  expect(compile("a L8 c2^.^")).toMatchObject({
    a: [
      {
        type: "note",
        interval: "c4",
        time: 0.0,
        duration: 2.0 + 0.5 + 0.25 + 0.5
      }
    ]
  });
  expect(compile("a L8 c2-.-")).toMatchObject({
    a: [
      {
        duration: 2.0 - 0.5 - 0.25 - 0.5
      }
    ]
  });
  expect(compile("a L4 c2.^-8")).toMatchObject({
    a: [
      {
        duration: 2.0 + 1.0 + 1.0 - 0.5
      }
    ]
  });
  expect(compile("a L4 c^")).toMatchObject({
    a: [
      {
        duration: 1.0 + 1.0
      }
    ]
  });
});
test("octave", () => {
  expect(compile("a o5>a4")).toMatchObject({
    a: [
      {
        interval: "a6"
      }
    ]
  });
});
test("set_lenght", () => {
  expect(compile("a l16 a")).toMatchObject({
    a: [
      {
        duration: 0.25
      }
    ]
  });
});
test("set_velocity", () => {
  expect(compile("a v15 a")).toMatchObject({
    a: [
      {
        velocity: 1.0
      }
    ]
  });
});
test("quantize", () => {
  expect(compile("a q4 a4 q8 b4")).toMatchObject({
    a: [
      {
        time: 0,
        duration: 0.5
      },
      {
        time: 1.0,
        duration: 1.0
      }
    ]
  });
  expect(compile("a q4 a & b c")).toMatchObject({
    a: [
      {
        type: "note",
        duration: 1
      },
      {
        type: "pitch",
        duration: 0.5
      },
      {
        type: "note",
        time: 2
      }
    ]
  });
});
test("set_tempo", () => {
  expect(compile("a t120 c4 t138")).toMatchObject({
    a: [
      {
        type: "bpm",
        bpm: 120
      },
      {
        type: "note"
      },
      {
        type: "bpm",
        bpm: 138,
        time: 1
      }
    ]
  });
});

test("loop", () => {
  expect(compile("a o4l4[c]4d")).toMatchObject({
    a: [
      {
        type: "note",
        interval: "c4",
        time: 0
      },
      {
        type: "note",
        interval: "c4"
      },
      {
        type: "note",
        interval: "c4"
      },
      {
        type: "note",
        interval: "c4"
      },
      {
        type: "note",
        interval: "d4",
        time: 4
      }
    ]
  });
  expect(
    compile(
      `a o4l4 c [
a d
a ] e`
    )
  ).toMatchObject({
    a: [
      {
        type: "note",
        interval: "c4",
        time: 0
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "e4",
        time: 3
      }
    ]
  });
  expect(compile("a o4l4 [c [d] e]")).toMatchObject({
    a: [
      {
        type: "note",
        interval: "c4",
        time: 0
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "e4",
        time: 3
      },
      {
        type: "note",
        interval: "c4",
        time: 4
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "e4",
        time: 7
      }
    ]
  });
  expect(compile("a o4l4 [c|d]2 e")).toMatchObject({
    a: [
      {
        type: "note",
        interval: "c4",
        time: 0
      },
      {
        interval: "d4",
        time: 1
      },
      {
        interval: "c4",
        time: 2
      },
      {
        interval: "e4",
        time: 3
      }
    ]
  });

  expect(compile("a o4l4 d [c [d] e2]0")).toMatchObject({
    a: [
      {},
      {
        type: "note",
        interval: "c4",
        time: 1
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "d4"
      },
      {
        type: "note",
        interval: "e4",
        time: 4
      },
      {
        type: "runtime_loop",
        count: 0,
        time: 1,
        start: 1,
        end: 6
      }
    ]
  });
});

test("define_tempo", () => {
  compiler.compile("#tempo 138");
  expect(compiler.tempo).toEqual(138);
});

test("define_track", () => {
  compiler.compile("#track a 2a03");
  expect(compiler.getTrack("a").type).toEqual("2a03");
});

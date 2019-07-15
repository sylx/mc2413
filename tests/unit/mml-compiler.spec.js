import util from "util";
import { MmlCompiler as compiler } from "../../src/lib/mml";

const compile = src => compiler.compile(src);

function dumpSEQ(text) {
  let r = compile(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

test("time & length", () => {
  expect(compile("a r2a8.^32-32")).toMatchObject({
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
        id: 1,
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
        id: 1,
        type: "note",
        interval: "c4",
        time: 0.0,
        duration: 2.0 - 0.5 - 0.25 - 0.5
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

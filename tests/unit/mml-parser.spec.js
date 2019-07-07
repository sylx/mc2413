import util from "util";
import {
  MmlParser as mml,
  MmlCompiler as compile
} from "../../src/lib/mml-parser";

function dumpAST(text) {
  let r = mml.parse(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

function dumpSEQ(text) {
  let r = compile(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

test("simple note", () => {
  expect(mml.parse("c")).toMatchObject({ status: true });
  expect(mml.parse("c8.")).toMatchObject({ status: true });
  expect(mml.parse("8c")).toMatchObject({ status: false });
});

test("length", () => {
  expect(mml.parse("c8.")).toMatchObject({ status: true });
  expect(mml.parse("r4.^16")).toMatchObject({ status: true });
  expect(mml.parse("4.^16")).toMatchObject({ status: false });
  expect(mml.parse("C4&D4")).toMatchObject({ status: true });
  expect(mml.parse("o1q2")).toMatchObject({ status: true });
  expect(mml.parse("cde>c<e")).toMatchObject({ status: true });
  // expect(dumpAST("l8q16o4cde>c<ef8^32&>c\ncde")).toMatchObject({
  //   status: true
  // });
  // expect(dumpAST("c4.^32")).toMatchObject({
  //   status: true
  // });
  // expect(dumpAST("l4q5")).toMatchObject({
  //   status: true
  // });
  // expect(dumpAST("cde'ceg'2")).toMatchObject({
  //   status: true
  // });
  // expect(mml.parse("'8'")).toMatchObject({ status: false });
});

test("compile", () => {
  expect(compile("r2a8.^32-32")[0]).toMatchObject({
    id: 1,
    type: "note",
    interval: "a4",
    time: 2.0,
    duration: 0.75
  });
  expect(compile("o5>a4")[0]).toMatchObject({
    interval: "a6"
  });
  expect(compile("l16 a")[0]).toMatchObject({
    duration: 0.25
  });
  expect(compile("v15 a")[0]).toMatchObject({
    velocity: 1.0
  });
  expect(compile("q4 a4 q8 b4")).toMatchObject([
    {
      time: 0,
      duration: 0.5
    },
    {
      time: 1.0,
      duration: 1.0
    }
  ]);
  expect(compile("q4 a & b c")).toMatchObject([
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
  ]);
});
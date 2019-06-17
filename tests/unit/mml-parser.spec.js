import util from "util";
import mml from "../../src/lib/mml-parser";

function dumpAST(text) {
  let r = mml.parse(text);
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
  expect(dumpAST("l8q16o4cde>c<ef8^32&>c\ncde")).toMatchObject({
    status: true
  });
  expect(dumpAST("c4.^32")).toMatchObject({
    status: true
  });
  expect(dumpAST("l4q5")).toMatchObject({
    status: true
  });
  expect(dumpAST("cde'ceg'2")).toMatchObject({
    status: true
  });
});

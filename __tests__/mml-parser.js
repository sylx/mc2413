import parser from "../src/lib/mml-parser";

test("simple note", () => {
  expect(parser.parse("c")).toMatchObject({ status: true });
  expect(parser.parse("c8.")).toMatchObject({ status: true });
  expect(parser.parse("8c")).toMatchObject({ status: false });
});

test("length", () => {
  expect(parser.parse("c8.")).toMatchObject({ status: true });
  expect(parser.parse("r4.^16")).toMatchObject({ status: true });
  expect(parser.parse("4.^16")).toMatchObject({ status: false });
  expect(parser.parse("C4&D4")).toMatchObject({ status: true });
  expect(parser.parse("o1q2")).toMatchObject({ status: true });
  expect(parser.parse("cde>c<e")).toMatchObject({ status: true });
});

import util from "util";
import { MmlParser as mml } from "../../src/lib/mml";

function dumpAST(text) {
  let r = mml.parse(text);
  console.log(util.inspect(r, false, null, true));
  return r;
}

function track(name, data) {
  return {
    status: true,
    value: [
      {
        name: "track",
        value: {
          target: name.split(""),
          mml: data
        }
      }
    ]
  };
}

test("track", () => {
  expect(mml.parse("a c")).toMatchObject({
    status: true,
    value: [
      {
        name: "track",
        value: {
          target: ["a"],
          mml: [
            {
              name: "interval",
              value: "c"
            }
          ]
        }
      }
    ]
  });
  expect(mml.parse("ABC cde")).toMatchObject(
    track("abc", [
      {
        name: "interval",
        value: "c"
      },
      {
        name: "interval",
        value: "d"
      },
      {
        name: "interval",
        value: "e"
      }
    ])
  );
  expect(mml.parse("123 cde")).toMatchObject({ status: true });
  expect(mml.parse("_ cde")).toMatchObject({ status: false });
  expect(mml.parse("8c\ncde")).toMatchObject({ status: false });
});

test("empty track", () => {
  expect(mml.parse("cde ")).toMatchObject({
    status: true,
    value: [
      {
        name: "track",
        value: {
          target: ["c", "d", "e"],
          mml: []
        }
      }
    ]
  });
  expect(mml.parse("cde \n")).toMatchObject(track("cde", []));
});

test("length", () => {
  expect(mml.parse("a c8.")).toMatchObject({
    status: true,
    value: [
      {
        name: "track",
        value: {
          mml: [{ name: "interval" }, { name: "length", value: [8, "."] }]
        }
      }
    ]
  });
  expect(mml.parse("a r4.^16")).toMatchObject(
    track("a", [{ name: "rest" }, { name: "length", value: [4, ".", "^", 16] }])
  );

  expect(mml.parse("a 4.^16")).toMatchObject({ status: false });
});

test("comment", () => {
  expect(mml.parse("// comment")).toMatchObject({ status: true });
  expect(mml.parse("a cde // comment")).toMatchObject({
    status: true
  });
});

test("blank line", () => {
  expect(
    mml.parse(`
a c
`)
  ).toMatchObject({
    status: true
  });
});

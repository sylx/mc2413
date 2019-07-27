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
  expect(mml.parse(" a c")).toMatchObject({
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
  expect(mml.parse(" 23 cde")).toMatchObject({ status: true });
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
  expect(mml.parse("// comment")).toMatchObject({ status: true, value: [] });
  expect(mml.parse(" // comment")).toMatchObject({ status: true });
  expect(mml.parse("a cde // comment")).toMatchObject({
    status: true
  });
  expect(mml.parse("//line1\n//line2")).toMatchObject({
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

test("loop", () => {
  expect(mml.parse("a a[cde]4")).toMatchObject(
    track("a", [
      {},
      { name: "loop_start" },
      {},
      {},
      {},
      { name: "loop_end", value: 4 }
    ])
  );
  expect(mml.parse("a a[cd|e]f")).toMatchObject(
    track("a", [
      {},
      { name: "loop_start" },
      {},
      {},
      { name: "loop_branch" },
      {},
      { name: "loop_end", value: 2 },
      {
        value: "f"
      }
    ])
  );
});

test("defineTone", () => {
  expect(
    mml.parse(`@v01 nes:
{
PARAM1: 1,"b",3
 PARAM2 : "a",,""
}
a a8.
`)
  ).toMatchObject({
    status: true,
    value: [
      {
        name: "define_tone",
        value: {
          name: "v01",
          type: "nes",
          params: {
            param1: [{ value: 1 }, { value: "b" }, { value: 3 }],
            param2: [{ value: "a" }, { value: "" }, { value: "" }]
          }
        }
      },
      {
        name: "track",
        value: {
          target: ["a"],
          mml: [{ name: "interval" }, { name: "length", value: [8, "."] }]
        }
      }
    ]
  });
  expect(
    mml.parse(`@v01 //comment
 nes: //comment
 { //comment
 PARAM1: 1 //comment
//comment
 PARAM2: 2
 } //comment
//comment
`)
  ).toMatchObject({
    status: true,
    value: [
      {
        name: "define_tone",
        value: {
          name: "v01",
          type: "nes",
          params: {
            param1: [{ value: 1 }],
            param2: [{ value: 2 }]
          }
        }
      }
    ]
  });
});
test("setTone", () => {
  expect(mml.parse("a c@1de")).toMatchObject(
    track("a", [{}, { name: "set_tone", value: 1 }, {}, {}])
  );
  expect(mml.parse("a c@`1d`e")).toMatchObject(
    track("a", [{}, { name: "set_tone", value: "1d" }, {}])
  );
  expect(mml.parse("a c@e")).toMatchObject({
    status: false
  });
});

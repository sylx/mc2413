import P from "parsimmon";

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
  const note = P.regexp(/[a-g][\#\+\-]*/i).map(x => {
    return x.toLowerCase();
  });
  expect(note.many().tryParse("cDE-")).toEqual(["c", "d", "e-"]);
});

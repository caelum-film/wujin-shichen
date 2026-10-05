import assert from "node:assert/strict";
import test from "node:test";
import { hexagrams, hexagramByLines, resolveCast } from "./hexagrams.ts";
import { tidal } from "./yijing.ts";

test("sixty-four unique hexagrams", () => {
  assert.equal(hexagrams.length, 64);
  assert.equal(new Set(hexagrams.map((item) => item.lines)).size, 64);
  assert.equal(new Set(hexagrams.map((item) => item.n)).size, 64);
});

test("tidal lines match the book", () => {
  for (const item of tidal) {
    const hex = hexagramByLines(item.lines);
    assert.ok(hex, item.name);
    assert.equal(hex?.name, item.name);
    assert.equal(hex?.n, item.hex);
  }
});

test("changing lines flip into another hexagram", () => {
  const cast = resolveCast([9, 8, 8, 8, 8, 7]);
  assert.equal(cast.primary?.lines[0], "1");
  assert.equal(cast.changed?.lines[0], "0");
  assert.deepEqual(cast.moving, [0]);
});

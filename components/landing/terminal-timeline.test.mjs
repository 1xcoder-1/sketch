import assert from "node:assert/strict";
import { test } from "node:test";

const timeline = await import("./terminal-timeline.ts").catch(() => null);

test("terminal timeline is available", () => {
  assert.ok(timeline, "The scripted terminal timeline has not been implemented");
});

test("reveals install, code, and completion in order", () => {
  assert.equal(timeline.getTerminalFrame(0).stage, 0);
  assert.equal(timeline.getTerminalFrame(1000).stage, 1);
  assert.equal(timeline.getTerminalFrame(3500).stage, 2);
  assert.equal(timeline.getTerminalFrame(5000).stage, 3);
  assert.equal(timeline.getTerminalFrame(7000).stage, 4);
  assert.equal(timeline.getTerminalFrame(9000).stage, 5);
});

test("install progress counts up and stays within its bounds", () => {
  assert.equal(timeline.getTerminalFrame(0).progress, 0);
  assert.equal(timeline.getTerminalFrame(2100).progress, 50);
  assert.equal(timeline.getTerminalFrame(3500).progress, 100);
  for (let time = 0; time < 11000; time += 100) {
    const { progress } = timeline.getTerminalFrame(time);
    assert.ok(progress >= 0 && progress <= 100);
  }
});

test("holds the completed frame before restarting without stale output", () => {
  assert.equal(timeline.getTerminalFrame(10999).stage, 5);
  assert.equal(timeline.getTerminalFrame(11000).stage, 0);
  assert.equal(timeline.getTerminalFrame(11000).progress, 0);
  assert.deepEqual(timeline.getTerminalFrame(22500), timeline.getTerminalFrame(500));
});

test("reduced motion always shows the completed demo", () => {
  for (const time of [0, 1000, 5000, 11000]) {
    const frame = timeline.getTerminalFrame(time, true);
    assert.equal(frame.stage, 5);
    assert.equal(frame.progress, 100);
    assert.equal(frame.spinner, "✓");
  }
});

test("spinner advances independently of the output stage", () => {
  assert.equal(timeline.getTerminalFrame(1000).stage, timeline.getTerminalFrame(1100).stage);
  assert.notEqual(timeline.getTerminalFrame(1000).spinner, timeline.getTerminalFrame(1100).spinner);
});

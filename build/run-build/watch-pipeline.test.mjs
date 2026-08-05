import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { createWatchPipeline } from './watch-pipeline.mjs';

describe('createWatchPipeline', () => {
  test('runs drain steps serially', async () => {
    let active = 0;
    let peak = 0;
    let remaining = 3;

    const { flushPipeline } = createWatchPipeline({
      drain: async () => {
        active++;
        peak = Math.max(peak, active);
        await new Promise(resolve => setImmediate(resolve));
        active--;
        remaining--;
        return remaining > 0;
      }
    });

    await flushPipeline();
    assert.equal(peak, 1);
    assert.equal(remaining, 0);
  });

  test('coalesces overlapping flush calls without concurrent drains', async () => {
    let active = 0;
    let peak = 0;
    const gate = Promise.withResolvers();

    const { flushPipeline } = createWatchPipeline({
      drain: async () => {
        active++;
        peak = Math.max(peak, active);
        await gate.promise;
        active--;
        return false;
      }
    });

    const first = flushPipeline();
    await new Promise(resolve => setImmediate(resolve));
    const second = flushPipeline();
    gate.resolve();
    await Promise.all([first, second]);

    assert.equal(peak, 1);
  });

  test('honors shouldContinue when shutting down', async () => {
    let drainCalls = 0;
    let shuttingDown = false;

    const { flushPipeline } = createWatchPipeline({
      shouldContinue: () => !shuttingDown,
      drain: async () => {
        drainCalls++;
        if (drainCalls === 1) {
          shuttingDown = true;
        }
        return drainCalls < 3;
      }
    });

    await flushPipeline();
    assert.equal(drainCalls, 1);
  });
});

describe('performance timer', () => {
  const { performanceTimer } = axe.utils;
  const originalLog = performanceTimer._log;
  let messages = [];
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const getNumber = msg => {
    const match = msg.match(/([0-9.]+)ms/);
    return match ? parseFloat(match[1]) : 0;
  };

  beforeEach(() => {
    performanceTimer._log = msg => {
      messages.push(msg);
    };
  });

  afterEach(async () => {
    try {
      performanceTimer.end();
    } catch {
      // ignore - performanceTimer.end() was called in a test instead
    }
    try {
      performanceTimer.auditEnd();
    } catch {
      // ignore - performanceTimer.auditEnd() was called in a test instead
    }
    performanceTimer._log = originalLog;
    messages = [];
    // Force a next tick in the test to avoid flakiness
    await sleep(0);
  });

  it('warns using performanceTimer before axe started', () => {
    performanceTimer.mark('foo_start');
    performanceTimer.mark('foo_end');
    performanceTimer.measure('foo', 'foo_start', 'foo_end');
    performanceTimer.logMeasures('foo');
    assert.equal(messages.length, 1);
    assert.match(
      messages[0],
      /Axe must be started before using performanceTimer/
    );
  });

  it('measures time elapsed between marks', async () => {
    performanceTimer.start();
    performanceTimer.mark('foo_start');
    await sleep(100);
    performanceTimer.mark('foo_end');
    performanceTimer.measure('foo', 'foo_start', 'foo_end');
    performanceTimer.logMeasures('foo');

    assert.equal(messages.length, 1);
    assert.closeTo(getNumber(messages[0]), 100, 10);
  });

  it('measures time elapsed if auditStart() was called', () => {
    performanceTimer.auditStart();
    performanceTimer.mark('foo_start');
    performanceTimer.mark('foo_end');
    performanceTimer.measure('foo', 'foo_start', 'foo_end');
    performanceTimer.logMeasures('foo');

    assert.equal(messages.length, 1);
    assert.match(messages[0], /Measure foo took [0-9.]+ms/);
  });

  it('measures the time axe takes from .start() to .end()', () => {
    performanceTimer.start();
    performanceTimer.end();
    assert.equal(messages.length, 1);
    assert.match(messages[0], /Measure axe took [0-9.]+ms/);
  });

  it('measures the time axe takes from .auditStart() to .auditEnd()', () => {
    performanceTimer.auditStart();
    performanceTimer.auditEnd();
    assert.equal(messages.length, 1);
    assert.match(messages[0], /Measure audit_start_to_end took [0-9.]+ms/);
  });

  describe('logMeasures', () => {
    beforeEach(() => {
      performanceTimer.start();
    });

    it('logs a specific measure when provided', () => {
      performanceTimer.mark('foo_start');
      performanceTimer.mark('foo_end');
      performanceTimer.measure('foo', 'foo_start', 'foo_end');

      performanceTimer.mark('bar_start');
      performanceTimer.mark('bar_end');
      performanceTimer.measure('bar', 'bar_start', 'bar_end');

      // Mot measured, should not show up
      performanceTimer.mark('baz_start');
      performanceTimer.mark('baz_end');

      performanceTimer.logMeasures('foo');
      assert.equal(messages.length, 1);
      assert.match(messages[0], /Measure foo took [0-9.]+ms/);
    });

    it('logs all measures if no measure name is provided', () => {
      performanceTimer.mark('foo_start');
      performanceTimer.mark('foo_end');
      performanceTimer.measure('foo', 'foo_start', 'foo_end');

      performanceTimer.mark('bar_start');
      performanceTimer.mark('bar_end');
      performanceTimer.measure('bar', 'bar_start', 'bar_end');

      // Mot measured, should not show up
      performanceTimer.mark('baz_start');
      performanceTimer.mark('baz_end');

      performanceTimer.logMeasures();
      assert.equal(messages.length, 2);
      assert.match(messages[0], /Measure foo took [0-9.]+ms/);
      assert.match(messages[1], /Measure bar took [0-9.]+ms/);
    });
  });

  describe('timeElapsed', () => {
    it('returns the time elapsed since axe started', async () => {
      performanceTimer.start();
      await sleep(100);
      assert.closeTo(performanceTimer.timeElapsed(), 100, 10);
    });

    it('returns the time elapsed since auditStart() was called', async () => {
      performanceTimer.auditStart();
      await sleep(100);
      assert.closeTo(performanceTimer.timeElapsed(), 100, 10);
    });

    it('does not use auditStart if axe started', async () => {
      performanceTimer.start();
      await sleep(100);

      performanceTimer.auditStart();
      assert.closeTo(performanceTimer.timeElapsed(), 100, 10);
    });
  });
});

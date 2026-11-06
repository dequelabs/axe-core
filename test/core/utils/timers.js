describe('utils.timers', () => {
  const { setAxeTimeout, clearAxeTimeout } =
    axe._thisWillBeDeletedDoNotUse.utils;
  let clock;

  afterEach(() => {
    clock?.restore();
    clock = null;
  });

  describe('setAxeTimeout', () => {
    it('calls the callback after the delay', done => {
      setAxeTimeout(done, 0);
    });

    it('passes extra arguments to the callback', done => {
      setAxeTimeout(
        (a, b) => {
          assert.equal(a, 'foo');
          assert.equal(b, 'bar');
          done();
        },
        0,
        'foo',
        'bar'
      );
    });

    it('calls the callback when fake timers are installed', done => {
      clock = sinon.useFakeTimers();
      setAxeTimeout(done, 0);
    });
  });

  describe('clearAxeTimeout', () => {
    it('cancels a timer started by setAxeTimeout', done => {
      const timeoutId = setAxeTimeout(() => {
        done(new Error('Cleared timer should not be called'));
      }, 0);
      clearAxeTimeout(timeoutId);
      setAxeTimeout(done, 10);
    });

    it('cancels a timer when fake timers are installed', done => {
      clock = sinon.useFakeTimers();
      const timeoutId = setAxeTimeout(() => {
        done(new Error('Cleared timer should not be called'));
      }, 0);
      clearAxeTimeout(timeoutId);
      setAxeTimeout(done, 10);
    });
  });
});

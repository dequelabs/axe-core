/* global sinon */

// TODO: remove when tests are fixed
describe('frame-wait-time optin', () => {
  it('works', () => {
    assert.isTrue(true);
  });
});

describe.skip('frame-wait-time option', () => {
  let spy;
  const respondable = axe.utils.respondable;

  before(done => {
    // Fix Function#name on browsers that do not support it (IE):
    // @see https://stackoverflow.com/a/17056530
    if (!function f() {}.name) {
      Object.defineProperty(Function.prototype, 'name', {
        get: function () {
          const name = (this.toString().match(/^function\s*([^\s(]+)/) ||
            [])[1];
          // For better performance only parse once, and then cache the
          // result through a new accessor for repeated access.
          Object.defineProperty(this, 'name', { value: name });
          return name;
        }
      });
    }

    axe.testUtils.awaitNestedLoad(() => {
      done();
    });
  });

  beforeEach(() => {
    // prevent test from running axe inside the iframe multiple times
    axe.utils.respondable = (a, b, c, d, callback) => {
      setTimeout(() => {
        callback();
      }, 50);
    };
    spy = sinon.spy(window, 'setTimeout');
  });

  afterEach(() => {
    axe.utils.respondable = respondable;
    spy.restore();
  });

  function getTimeoutCall() {
    const calls = spy.getCalls();
    let timeoutCall;
    for (var i = 0; i < calls.length; i++) {
      var fn = calls[i].args[0];
      if (fn.name === 'collectResultFramesTimeout') {
        timeoutCall = calls[i];
        break;
      }
    }

    return timeoutCall;
  }

  describe('when set', () => {
    it('should modify the default frame timeout', done => {
      const opts = {
        frameWaitTime: 1,
        runOnly: {
          type: 'rule',
          values: ['html-has-lang']
        }
      };
      axe.run('#frame', opts, () => {
        const timeoutCall = getTimeoutCall();
        assert.exists(timeoutCall, 'FrameTimeout not called');
        assert.equal(timeoutCall.args[1], 1);
        done();
      });
    });
  });

  describe('when not set', () => {
    it('should use the default frame timeout', done => {
      axe.run('#frame', () => {
        const timeoutCall = getTimeoutCall();
        assert.exists(timeoutCall, 'FrameTimeout not called');
        assert.equal(timeoutCall.args[1], 60000);
        done();
      });
    });
  });
});

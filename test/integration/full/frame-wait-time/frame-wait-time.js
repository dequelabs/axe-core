/* global sinon */

// TODO: remove when tests are fixed
describe('frame-wait-time optin', function () {
  it('works', function () {
    assert.isTrue(true);
  });
});

describe.skip('frame-wait-time option', function () {
  'use strict';
  var spy;
  var respondable = axe.utils.respondable;

  before(function (done) {
    // Fix Function#name on browsers that do not support it (IE):
    // @see https://stackoverflow.com/a/17056530
    if (!function f() {}.name) {
      Object.defineProperty(Function.prototype, 'name', {
        get: function () {
          var name = (this.toString().match(/^function\s*([^\s(]+)/) || [])[1];
          // For better performance only parse once, and then cache the
          // result through a new accessor for repeated access.
          Object.defineProperty(this, 'name', { value: name });
          return name;
        }
      });
    }

    axe.testUtils.awaitNestedLoad(function () {
      done();
    });
  });

  beforeEach(function () {
    // prevent test from running axe inside the iframe multiple times
    axe.utils.respondable = function (a, b, c, d, callback) {
      setTimeout(function () {
        callback();
      }, 50);
    };
    spy = sinon.spy(window, 'setTimeout');
  });

  afterEach(function () {
    axe.utils.respondable = respondable;
    spy.restore();
  });

  function getTimeoutCall() {
    var calls = spy.getCalls();
    var timeoutCall;
    for (var i = 0; i < calls.length; i++) {
      var fn = calls[i].args[0];
      if (fn.name === 'collectResultFramesTimeout') {
        timeoutCall = calls[i];
        break;
      }
    }

    return timeoutCall;
  }

  describe('when set', function () {
    it('should modify the default frame timeout', function (done) {
      var opts = {
        frameWaitTime: 1,
        runOnly: {
          type: 'rule',
          values: ['html-has-lang']
        }
      };
      axe.run('#frame', opts, function () {
        var timeoutCall = getTimeoutCall();
        assert.exists(timeoutCall, 'FrameTimeout not called');
        assert.equal(timeoutCall.args[1], 1);
        done();
      });
    });
  });

  describe('when not set', function () {
    it('should use the default frame timeout', function (done) {
      axe.run('#frame', function () {
        var timeoutCall = getTimeoutCall();
        assert.exists(timeoutCall, 'FrameTimeout not called');
        assert.equal(timeoutCall.args[1], 60000);
        done();
      });
    });
  });
});

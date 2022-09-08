function afterMessage(win, callback) {
  var handler = function () {
    win.removeEventListener('message', handler);
    // Wait one more tick for stuff to resolve
    setTimeout(function () {
      callback();
    }, 10);
  };
  win.addEventListener('message', handler);
}

function once(callback) {
  var called = false;
  return function () {
    if (!called) {
      callback.apply(this, arguments);
    }
    called = true;
  };
}

describe('frame-messenger', function () {
  var fixture,
    axeVersion,
    axeApplication,
    frame,
    frameWin,
    respondable,
    frameSubscribe,
    axeLog;
  var postMessage = window.postMessage;
  var captureError = axe.testUtils.captureError;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  beforeEach(function (done) {
    respondable = axe.utils.respondable;
    axeVersion = axe.version;
    axeLog = axe.log;
    axeApplication = axe._audit.application;

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', function () {
      frameWin = frame.contentWindow;
      frameSubscribe = frameWin.axe.utils.respondable.subscribe;
      done();
    });
    frame.addEventListener('error', done);

    fixture = document.querySelector('#fixture');
    fixture.appendChild(frame);
  });

  afterEach(function () {
    axe.version = axeVersion;
    axe._audit.application = axeApplication;
    axe.log = axeLog;
    axe.reset();
    window.postMessage = postMessage;
  });

  describe('subscribe', function () {
    it('is called with the same topic', function (done) {
      var called = false;
      frameSubscribe('greeting', function () {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function () {
          assert.isTrue(called);
          done();
        }, done)
      );
    });

    (shadowSupported ? it : xit)(
      'works with frames in shadow DOM',
      function (done) {
        fixture.innerHTML = '<div id="shadow-root"></div>';
        var shadowRoot = fixture
          .querySelector('#shadow-root')
          .attachShadow({ mode: 'open' });
        frame = document.createElement('iframe');
        frame.src = '../mock/frames/test.html';

        frame.addEventListener('load', function () {
          var called = false;
          frameWin = frame.contentWindow;
          frameSubscribe = frameWin.axe.utils.respondable.subscribe;

          frameSubscribe('greeting', function (msg) {
            assert.equal(msg, 'hello');
            called = true;
          });
          respondable(frameWin, 'greeting', 'hello');
          afterMessage(
            frameWin,
            captureError(function () {
              assert.isTrue(called);
              done();
            }, done)
          );
        });
        shadowRoot.appendChild(frame);
      }
    );

    it('is not called on a different topic', function (done) {
      var called = false;
      frameSubscribe('otherTopic', function () {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function () {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different axe-core versions', function (done) {
      var called = false;
      axe.version = '1.0.0';
      frameSubscribe('greeting', function () {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function () {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called with the "x.y.z" wildcard', function (done) {
      var called = false;
      axe.version = 'x.y.z';
      frameSubscribe('greeting', function () {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function () {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different applications', function (done) {
      var called = false;
      axe._audit.application = 'Coconut';
      frameSubscribe('greeting', function () {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function () {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('logs errors passed to respondable, rather than passing them on', function (done) {
      axe.log = captureError(function (e) {
        assert.equal(e.message, 'expected message');
        done();
      }, done);

      frameSubscribe('greeting', function () {
        done(new Error('subscribe should not be called'));
      });
      respondable(frameWin, 'greeting', new Error('expected message'));
    });

    it('throws if frame.parent is not the window', function () {
      frameWin.parent = frameWin;
      assert.throws(function () {
        respondable(frameWin, 'greeting');
      });
    });

    it('is not called when the source is not a frame in the page', function (done) {
      var doneOnce = once(done);
      var called = false;
      frameWin.axe.log = function () {
        called = true;
      };

      frameSubscribe('greeting', function () {
        doneOnce(new Error('subscribe should not be called'));
      });
      respondable(frameWin, 'greeting');
      // Swap parent after the message is sent, but before it is received:
      frameWin.parent = frameWin;

      setTimeout(
        captureError(function () {
          assert.isTrue(called);
          doneOnce();
        }, doneOnce),
        100
      );
    });

    it('throws when targeting itself', function () {
      assert.throws(function () {
        respondable(window, 'greeting');
      });
      assert.throws(function () {
        frameWin.respondable(frameWin, 'greeting');
      });
    });

    it('throws when targeting a window that is not a frame in the page', function () {
      var blankPage = window.open('');
      var frameCopy = window.open(frameWin.location.href);

      // seems ie11 can't open new windows?
      if (!blankPage) {
        return;
      }

      // Cleanup
      setTimeout(function () {
        blankPage.close();
        frameCopy.close();
      });

      assert.throws(function () {
        respondable(blankPage, 'greeting');
      });
      assert.throws(function () {
        respondable(frameCopy, 'greeting');
      });
    });

    it('is not triggered by "repeaters"', function (done) {
      var calls = 0;
      frameSubscribe('greeting', function () {
        calls++;
      });
      // Repeat fire the event
      frameWin.addEventListener('message', function handler(evt) {
        frameWin.postMessage(evt.data, '*');
        frameWin.removeEventListener('message', handler);
      });

      respondable(frameWin, 'greeting', 'hello');
      setTimeout(
        captureError(function () {
          assert.equal(calls, 1);
          done();
        }, done),
        100
      );
    });

    it('is not called if origin does not match', function (done) {
      axe.configure({
        allowedOrigins: ['http://customOrigin.com']
      });
      var spy = sinon.spy();

      frameSubscribe('greeting', spy);
      respondable(frameWin, 'greeting', 'hello');

      setTimeout(function () {
        assert.isFalse(spy.called);
        done();
      }, 500);
    });

    it('is called if origin is <unsafe_all_origins>', function (done) {
      axe.configure({
        allowedOrigins: ['<unsafe_all_origins>']
      });
      var spy = sinon.spy();

      frameSubscribe('greeting', spy);
      respondable(frameWin, 'greeting', 'hello');

      setTimeout(function () {
        assert.isTrue(spy.called);
        done();
      }, 500);
    });
  });
});

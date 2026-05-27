function afterMessage(win, callback) {
  const handler = () => {
    win.removeEventListener('message', handler);
    // Wait one more tick for stuff to resolve
    setTimeout(() => {
      callback();
    }, 10);
  };
  win.addEventListener('message', handler);
}

function once(callback) {
  let called = false;
  return function () {
    if (!called) {
      callback.apply(this, arguments);
    }
    called = true;
  };
}

describe('frame-messenger', () => {
  let fixture,
    axeVersion,
    axeApplication,
    frame,
    frameWin,
    respondable,
    frameSubscribe,
    axeLog;
  const postMessage = window.postMessage;
  const captureError = axe.testUtils.captureError;

  beforeEach(done => {
    respondable = axe.utils.respondable;
    axeVersion = axe.version;
    axeLog = axe.log;
    axeApplication = axe._audit.application;

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', () => {
      frameWin = frame.contentWindow;
      frameSubscribe = frameWin.axe.utils.respondable.subscribe;
      done();
    });
    frame.addEventListener('error', done);

    fixture = document.querySelector('#fixture');
    fixture.appendChild(frame);
  });

  afterEach(() => {
    axe.version = axeVersion;
    axe._audit.application = axeApplication;
    axe.log = axeLog;
    axe.reset();
    window.postMessage = postMessage;
  });

  describe('subscribe', () => {
    it('is called with the same topic', done => {
      let called = false;
      frameSubscribe('greeting', () => {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(() => {
          assert.isTrue(called);
          done();
        }, done)
      );
    });

    it('works with frames in shadow DOM', done => {
      fixture.innerHTML = '<div id="shadow-root"></div>';
      const shadowRoot = fixture
        .querySelector('#shadow-root')
        .attachShadow({ mode: 'open' });
      frame = document.createElement('iframe');
      frame.src = '../mock/frames/test.html';

      frame.addEventListener('load', () => {
        let called = false;
        frameWin = frame.contentWindow;
        frameSubscribe = frameWin.axe.utils.respondable.subscribe;

        frameSubscribe('greeting', msg => {
          assert.equal(msg, 'hello');
          called = true;
        });
        respondable(frameWin, 'greeting', 'hello');
        afterMessage(
          frameWin,
          captureError(() => {
            assert.isTrue(called);
            done();
          }, done)
        );
      });
      shadowRoot.appendChild(frame);
    });

    it('is not called on a different topic', done => {
      let called = false;
      frameSubscribe('otherTopic', () => {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(() => {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different axe-core versions', done => {
      let called = false;
      axe.version = '1.0.0';
      frameSubscribe('greeting', () => {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(() => {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called with the "x.y.z" wildcard', done => {
      let called = false;
      axe.version = 'x.y.z';
      frameSubscribe('greeting', () => {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(() => {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different applications', done => {
      let called = false;
      axe._audit.application = 'Coconut';
      frameSubscribe('greeting', () => {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(() => {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('logs errors passed to respondable, rather than passing them on', done => {
      axe.log = captureError(e => {
        assert.equal(e.message, 'expected message');
        done();
      }, done);

      frameSubscribe('greeting', () => {
        done(new Error('subscribe should not be called'));
      });
      respondable(frameWin, 'greeting', new Error('expected message'));
    });

    it('throws if frame.parent is not the window', () => {
      frameWin.parent = frameWin;
      assert.throws(() => {
        respondable(frameWin, 'greeting');
      });
    });

    it('is not called when the source is not a frame in the page', done => {
      const doneOnce = once(done);
      let called = false;
      frameWin.axe.log = () => {
        called = true;
      };

      frameSubscribe('greeting', () => {
        doneOnce(new Error('subscribe should not be called'));
      });
      respondable(frameWin, 'greeting');
      // Swap parent after the message is sent, but before it is received:
      frameWin.parent = frameWin;

      setTimeout(
        captureError(() => {
          assert.isTrue(called);
          doneOnce();
        }, doneOnce),
        100
      );
    });

    it('throws when targeting itself', () => {
      assert.throws(() => {
        respondable(window, 'greeting');
      });
      assert.throws(() => {
        frameWin.respondable(frameWin, 'greeting');
      });
    });

    it('throws when targeting a window that is not a frame in the page', () => {
      const blankPage = window.open('');
      const frameCopy = window.open(frameWin.location.href);

      // seems ie11 can't open new windows?
      if (!blankPage) {
        return;
      }

      // Cleanup
      setTimeout(() => {
        blankPage.close();
        frameCopy.close();
      });

      assert.throws(() => {
        respondable(blankPage, 'greeting');
      });
      assert.throws(() => {
        respondable(frameCopy, 'greeting');
      });
    });

    it('is not triggered by "repeaters"', done => {
      let calls = 0;
      frameSubscribe('greeting', () => {
        calls++;
      });
      // Repeat fire the event
      frameWin.addEventListener('message', function handler(evt) {
        frameWin.postMessage(evt.data, '*');
        frameWin.removeEventListener('message', handler);
      });

      respondable(frameWin, 'greeting', 'hello');
      setTimeout(
        captureError(() => {
          assert.equal(calls, 1);
          done();
        }, done),
        100
      );
    });

    it('is not called if origin does not match', done => {
      axe.configure({
        allowedOrigins: ['http://customOrigin.com']
      });
      const spy = sinon.spy();

      frameSubscribe('greeting', spy);
      respondable(frameWin, 'greeting', 'hello');

      setTimeout(() => {
        assert.isFalse(spy.called);
        done();
      }, 500);
    });

    it('is called if origin is <unsafe_all_origins>', done => {
      axe.configure({
        allowedOrigins: ['<unsafe_all_origins>']
      });
      const spy = sinon.spy();

      frameSubscribe('greeting', spy);
      respondable(frameWin, 'greeting', 'hello');

      setTimeout(() => {
        assert.isTrue(spy.called);
        done();
      }, 500);
    });
  });
});

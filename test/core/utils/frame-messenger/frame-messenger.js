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

  it('can be subscribed to', done => {
    frameSubscribe('greeting', () => {
      done();
    });
    respondable(frameWin, 'greeting', 'hello');
  });

  it('forwards the message', done => {
    const expected = { hello: 'world' };
    frameSubscribe(
      'greeting',
      captureError(actual => {
        assert.deepEqual(actual, expected);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', expected);
  });

  it('passes a truthy keepalive value', done => {
    frameSubscribe(
      'greeting',
      captureError((_, keepalive) => {
        assert.isTrue(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 'truthy');
  });

  it('passes a falsy keepalive value', done => {
    frameSubscribe(
      'greeting',
      captureError((_, keepalive) => {
        assert.isFalse(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 0);
  });

  it('can not publish to a parent frame', done => {
    let isCalled = false;
    axe.utils.respondable.subscribe('greeting', () => {
      isCalled = true;
    });
    assert.throws(() => {
      frameWin.axe.utils.respondable(window, 'greeting', 'hello', 0);
    });
    setTimeout(
      captureError(() => {
        assert.isFalse(isCalled);
        done();
      }, done),
      100
    );
  });

  it('does not expose private methods', () => {
    const methods = Object.keys(respondable).sort();
    assert.deepEqual(
      methods,
      ['subscribe', 'isInFrame', 'updateMessenger'].sort()
    );
  });

  it('passes serialized information only', done => {
    const div = document.createElement('div');
    frameSubscribe(
      'greeting',
      captureError(message => {
        assert.deepEqual(message, {});
        done();
      }, done)
    );

    respondable(frameWin, 'greeting', div);
  });

  it('posts message to allowed origins', () => {
    axe.configure({
      allowedOrigins: [window.location.origin, 'http://customOrigin.com']
    });

    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 2);
    assert.deepEqual(spy.firstCall.args[1], window.location.origin);
    assert.deepEqual(spy.secondCall.args[1], 'http://customOrigin.com');
  });

  it('posts message to allowed origins using <same_origin>', () => {
    axe.configure({
      allowedOrigins: ['<same_origin>']
    });

    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 1);
    assert.deepEqual(spy.firstCall.args[1], window.location.origin);
  });

  it('posts message to allowed origins using <unsafe_all_origins>', () => {
    axe.configure({
      allowedOrigins: ['http://customOrigin.com', '<unsafe_all_origins>']
    });

    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 1);
    assert.equal(spy.firstCall.args[1], '*');
  });

  it('does not post message if no allowed origins', () => {
    axe.configure({
      allowedOrigins: []
    });
    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('does not post message if no allowed origins', () => {
    axe._audit.allowedOrigins = null;
    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('does not post message if allowed origins is empty', () => {
    axe.configure({
      allowedOrigins: []
    });
    const spy = sinon.spy(frameWin, 'postMessage');
    const posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('throws error if origin is invalid', () => {
    axe.configure({
      allowedOrigins: ['foo.com']
    });
    assert.throws(() => {
      respondable(frameWin, 'greeting');
    }, 'allowedOrigins value "foo.com" is not a valid origin');
  });

  it('does not log error if message is null', done => {
    axe.configure({
      allowedOrigins: ['<unsafe_all_origins>']
    });
    let called = false;
    frameWin.axe.log = () => {
      called = true;
    };

    frameWin.postMessage(null, '*');

    setTimeout(() => {
      try {
        assert.isFalse(called);
        done();
      } catch (e) {
        done(e);
      }
    }, 500);
  });

  describe('isInFrame', () => {
    it('is false for the page window', () => {
      const frameRespondable = frameWin.axe.utils.respondable;
      assert.isFalse(respondable.isInFrame());
      assert.isFalse(frameRespondable.isInFrame(window));
    });

    it('is true for iframes', () => {
      const frameRespondable = frameWin.axe.utils.respondable;
      assert.isTrue(frameRespondable.isInFrame());
      assert.isTrue(respondable.isInFrame(frameWin));
    });
  });
});

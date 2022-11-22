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

  it('can be subscribed to', function (done) {
    frameSubscribe('greeting', function () {
      done();
    });
    respondable(frameWin, 'greeting', 'hello');
  });

  it('forwards the message', function (done) {
    var expected = { hello: 'world' };
    frameSubscribe(
      'greeting',
      captureError(function (actual) {
        assert.deepEqual(actual, expected);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', expected);
  });

  it('passes a truthy keepalive value', function (done) {
    frameSubscribe(
      'greeting',
      captureError(function (_, keepalive) {
        assert.isTrue(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 'truthy');
  });

  it('passes a falsy keepalive value', function (done) {
    frameSubscribe(
      'greeting',
      captureError(function (_, keepalive) {
        assert.isFalse(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 0);
  });

  it('can not publish to a parent frame', function (done) {
    var isCalled = false;
    axe.utils.respondable.subscribe('greeting', function () {
      isCalled = true;
    });
    assert.throws(function () {
      frameWin.axe.utils.respondable(window, 'greeting', 'hello', 0);
    });
    setTimeout(
      captureError(function () {
        assert.isFalse(isCalled);
        done();
      }, done),
      100
    );
  });

  it('does not expose private methods', function () {
    var methods = Object.keys(respondable).sort();
    assert.deepEqual(
      methods,
      ['subscribe', 'isInFrame', 'updateMessenger'].sort()
    );
  });

  it('passes serialized information only', function (done) {
    var div = document.createElement('div');
    frameSubscribe(
      'greeting',
      captureError(function (message) {
        assert.deepEqual(message, {});
        done();
      }, done)
    );

    respondable(frameWin, 'greeting', div);
  });

  it('posts message to allowed origins', function () {
    axe.configure({
      allowedOrigins: [window.location.origin, 'http://customOrigin.com']
    });

    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 2);
    assert.deepEqual(spy.firstCall.args[1], window.location.origin);
    assert.deepEqual(spy.secondCall.args[1], 'http://customOrigin.com');
  });

  it('posts message to allowed origins using <same_origin>', function () {
    axe.configure({
      allowedOrigins: ['<same_origin>']
    });

    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 1);
    assert.deepEqual(spy.firstCall.args[1], window.location.origin);
  });

  it('posts message to allowed origins using <unsafe_all_origins>', function () {
    axe.configure({
      allowedOrigins: ['http://customOrigin.com', '<unsafe_all_origins>']
    });

    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isTrue(posted);
    assert.equal(spy.callCount, 1);
    assert.equal(spy.firstCall.args[1], '*');
  });

  it('does not post message if no allowed origins', function () {
    axe.configure({
      allowedOrigins: []
    });
    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('does not post message if no allowed origins', function () {
    axe._audit.allowedOrigins = null;
    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('does not post message if allowed origins is empty', function () {
    axe.configure({
      allowedOrigins: []
    });
    var spy = sinon.spy(frameWin, 'postMessage');
    var posted = respondable(frameWin, 'greeting');
    assert.isFalse(posted);
    assert.isFalse(spy.called);
  });

  it('throws error if origin is invalid', function () {
    axe.configure({
      allowedOrigins: ['foo.com']
    });
    assert.throws(function () {
      respondable(frameWin, 'greeting');
    }, 'allowedOrigins value "foo.com" is not a valid origin');
  });

  it('does not log error if message is null', function (done) {
    axe.configure({
      allowedOrigins: ['<unsafe_all_origins>']
    });
    var called = false;
    frameWin.axe.log = function () {
      called = true;
    };

    frameWin.postMessage(null, '*');

    setTimeout(function () {
      try {
        assert.isFalse(called);
        done();
      } catch (e) {
        done(e);
      }
    }, 500);
  });

  describe('isInFrame', function () {
    it('is false for the page window', function () {
      var frameRespondable = frameWin.axe.utils.respondable;
      assert.isFalse(respondable.isInFrame());
      assert.isFalse(frameRespondable.isInFrame(window));
    });

    it('is true for iframes', function () {
      var frameRespondable = frameWin.axe.utils.respondable;
      assert.isTrue(frameRespondable.isInFrame());
      assert.isTrue(respondable.isInFrame(frameWin));
    });
  });
});

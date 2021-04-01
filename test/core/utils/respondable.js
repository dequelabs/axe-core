function afterMessage(win, callback) {
  var handler = function() {
    win.removeEventListener('message', handler);
    // Wait one more tick for stuff to resolve
    setTimeout(function() {
      callback();
    }, 10);
  };
  win.addEventListener('message', handler);
}

function once(callback) {
  var called = false;
  return function() {
    if (!called) {
      callback.apply(this, arguments);
    }
    called = true;
  };
}

describe('axe.utils.respondable', function() {
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
  var isIE11 = axe.testUtils.isIE11;
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  this.timeout(1000);

  beforeEach(function(done) {
    respondable = axe.utils.respondable;
    axeVersion = axe.version;
    axeLog = axe.log;
    axeApplication = axe._audit.application;

    frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', function() {
      frameWin = frame.contentWindow;
      frameSubscribe = frameWin.axe.utils.respondable.subscribe;
      done();
    });

    fixture = document.querySelector('#fixture');
    fixture.appendChild(frame);
  });

  afterEach(function() {
    fixture.innerHTML = '';
    axe.version = axeVersion;
    axe._audit.application = axeApplication;
    axe.log = axeLog;
    window.postMessage = postMessage;
  });

  it('can be subscribed to', function(done) {
    frameSubscribe('greeting', function() {
      done();
    });
    respondable(frameWin, 'greeting', 'hello');
  });

  it('forwards the message', function(done) {
    var expected = { hello: 'world' };
    frameSubscribe(
      'greeting',
      captureError(function(actual) {
        assert.deepEqual(actual, expected);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', expected);
  });

  it('passes a truthy keepalive value', function(done) {
    frameSubscribe(
      'greeting',
      captureError(function(_, keepalive) {
        assert.isTrue(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 'truthy');
  });

  it('passes a falsy keepalive value', function(done) {
    frameSubscribe(
      'greeting',
      captureError(function(_, keepalive) {
        assert.isFalse(keepalive);
        done();
      }, done)
    );
    respondable(frameWin, 'greeting', 'hello', 0);
  });

  it('can not publish to a parent frame', function(done) {
    var isCalled = false;
    axe.utils.respondable.subscribe('greeting', function() {
      isCalled = true;
    });
    assert.throws(function() {
      frameWin.axe.utils.respondable(window, 'greeting', 'hello', 0);
    });
    setTimeout(
      captureError(function() {
        assert.isFalse(isCalled);
        done();
      }, done),
      100
    );
  });

  it('does not expose private methods', function() {
    var methods = Object.keys(respondable).sort();
    assert.deepEqual(methods, ['subscribe', 'isInFrame'].sort());
  });

  it('passes serialized information only', function(done) {
    var div = document.createElement('div');
    frameSubscribe(
      'greeting',
      captureError(function(message) {
        assert.deepEqual(message, {});
        done();
      }, done)
    );

    respondable(frameWin, 'greeting', div);
  });

  describe('subscribe', function() {
    it('is called with the same topic', function(done) {
      var called = false;
      frameSubscribe('greeting', function() {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function() {
          assert.isTrue(called);
          done();
        }, done)
      );
    });

    (shadowSupported ? it : xit)('works with frames in shadow DOM', function(
      done
    ) {
      fixture.innerHTML = '<div id="shadow-root"></div>';
      var shadowRoot = fixture
        .querySelector('#shadow-root')
        .attachShadow({ mode: 'open' });
      frame = document.createElement('iframe');
      frame.src = '../mock/frames/test.html';

      frame.addEventListener('load', function() {
        var called = false;
        frameWin = frame.contentWindow;
        frameSubscribe = frameWin.axe.utils.respondable.subscribe;

        frameSubscribe('greeting', function(msg) {
          assert.equal(msg, 'hello');
          called = true;
        });
        respondable(frameWin, 'greeting', 'hello');
        afterMessage(
          frameWin,
          captureError(function() {
            assert.isTrue(called);
            done();
          }, done)
        );
      });
      shadowRoot.appendChild(frame);
    });

    it('is not called on a different topic', function(done) {
      var called = false;
      frameSubscribe('otherTopic', function() {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function() {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different axe-core versions', function(done) {
      var called = false;
      axe.version = '1.0.0';
      frameSubscribe('greeting', function() {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function() {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called with the "x.y.z" wildcard', function(done) {
      var called = false;
      axe.version = 'x.y.z';
      frameSubscribe('greeting', function() {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function() {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('is not called for different applications', function(done) {
      var called = false;
      axe._audit.application = 'Coconut';
      frameSubscribe('greeting', function() {
        called = true;
      });
      respondable(frameWin, 'greeting');
      afterMessage(
        frameWin,
        captureError(function() {
          assert.isFalse(called);
          done();
        }, done)
      );
    });

    it('logs errors passed to respondable, rather than passing them on', function(done) {
      axe.log = captureError(function(e) {
        assert.equal(e.message, 'expected message');
        done();
      }, done);

      frameSubscribe('greeting', function() {
        done(new Error('subscribe should not be called'));
      });
      respondable(frameWin, 'greeting', new Error('expected message'));
    });

    (isIE11 ? it.skip : it)(
      // In IE win.parent is read-only
      'throws if frame.parent is not the window',
      function() {
        frameWin.parent = frameWin;
        assert.throws(function() {
          respondable(frameWin, 'greeting');
        });
      }
    );

    (isIE11 ? it.skip : it)(
      // In IE win.parent is read-only
      'is not called when the source is not a frame in the page',
      function(done) {
        var doneOnce = once(done);
        var called = false;
        frameWin.axe.log = function() {
          called = true;
        };

        frameSubscribe('greeting', function() {
          doneOnce(new Error('subscribe should not be called'));
        });
        respondable(frameWin, 'greeting');
        // Swap parent after the message is sent, but before it is received:
        frameWin.parent = frameWin;

        setTimeout(
          captureError(function() {
            assert.isTrue(called);
            doneOnce();
          }, doneOnce),
          100
        );
      }
    );

    it('throws when targeting itself', function() {
      assert.throws(function() {
        respondable(window, 'greeting');
      });
      assert.throws(function() {
        frameWin.respondable(frameWin, 'greeting');
      });
    });

    it('throws when targeting a window that is not a frame in the page', function() {
      var blankPage = window.open('');
      var frameCopy = window.open(frameWin.location.href);
      // Cleanup
      setTimeout(function() {
        blankPage.close();
        frameCopy.close();
      });

      assert.throws(function() {
        respondable(blankPage, 'greeting');
      });
      assert.throws(function() {
        respondable(frameCopy, 'greeting');
      });
    });

    it('is not triggered by "repeaters"', function(done) {
      var calls = 0;
      frameSubscribe('greeting', function() {
        calls++;
      });
      // Repeat fire the event
      frameWin.addEventListener('message', function handler(evt) {
        frameWin.postMessage(evt.data, '*');
        frameWin.removeEventListener('message', handler);
      });

      respondable(frameWin, 'greeting', 'hello');
      setTimeout(
        captureError(function() {
          assert.equal(calls, 1);
          done();
        }, done),
        100
      );
    });
  });

  describe('respond', function() {
    it('passes the response back', function(done) {
      var receivedResponse;
      frameSubscribe(
        'greeting',
        captureError(function(message, keepalive, respond) {
          assert.isFalse(keepalive);
          respond({ greet: 'bonjour' });
        }, done)
      );

      respondable(frameWin, 'greeting', 'hello', false, function(message) {
        receivedResponse = message;
      });

      afterMessage(
        window,
        captureError(function() {
          assert.deepEqual(receivedResponse, { greet: 'bonjour' });
          done();
        }, done)
      );
    });

    it('prohibits multiple response calls when respond sets keepalive to false', function(done) {
      var receivedResponse;
      frameSubscribe('greeting', function(message, keepalive, respond) {
        assert.isTrue(keepalive);
        respond({ responseNum: 1 }, false);
        setTimeout(function() {
          respond({ responseNum: 2 });
        }, 10);
      });

      respondable(frameWin, 'greeting', '', true, function(message) {
        receivedResponse = message;
      });

      afterMessage(window, function() {
        assert.deepEqual(receivedResponse, { responseNum: 1 });
        setTimeout(function() {
          assert.deepEqual(receivedResponse, { responseNum: 1 });
          done();
        }, 100);
      });
    });

    it('allows multiple response calls with keepalive: true', function(done) {
      var receivedResponse;
      frameSubscribe('greeting', function(message, keepalive, respond) {
        assert.isTrue(keepalive);
        respond({ responseNum: 1 }, true);
        setTimeout(function() {
          respond({ responseNum: 2 });
        }, 30);
      });

      respondable(frameWin, 'greeting', '', true, function(message) {
        receivedResponse = message;
      });

      afterMessage(window, function() {
        assert.deepEqual(receivedResponse, { responseNum: 1 });
        afterMessage(window, function() {
          assert.deepEqual(receivedResponse, { responseNum: 2 });
          done();
        });
      });
    });

    it('responds until after keepalive: false is called', function(done) {
      var concat = '';
      frameSubscribe('greeting', function(_, keepalive, respond) {
        respond('1', true);
        respond('2', true);
        respond('3', false);
        respond('4', true);
        respond('5', false);
      });

      respondable(frameWin, 'greeting', '', true, function(result) {
        concat += result;
      });
      setTimeout(function() {
        assert.equal(concat, '123');
        done();
      }, 200);
    });

    it('receives errors if the subscriber throws', function(done) {
      var errorMessage = 'Something went wrong';
      frameSubscribe('greeting', function() {
        throw new frameWin.TypeError(errorMessage);
      });

      respondable(
        frameWin,
        'greeting',
        '',
        true,
        captureError(function(result) {
          assert.instanceOf(result, TypeError);
          assert.equal(result.message.split(/\n/)[0], errorMessage);
          done();
        }, done)
      );
    });

    it('receives errors responded by the subscriber', function(done) {
      var errorMessage = 'Something went wrong';
      frameSubscribe('greeting', function(data, keepalive, respond) {
        respond(new frameWin.TypeError(errorMessage));
      });

      respondable(frameWin, 'greeting', '', true, function(result) {
        assert.instanceOf(result, TypeError);
        assert.equal(result.message.split(/\n/)[0], errorMessage);
        done();
      });
    });

    it('can pass messages back to the subscriber (without triggering the subscriber)', function(done) {
      frameSubscribe(
        'greeting',
        captureError(function(message, _, respond) {
          assert.equal(message, '1');
          respond('2', true, function(message) {
            assert.equal(message, '3');
            done();
          });
        }, done)
      );

      respondable(
        frameWin,
        'greeting',
        '1',
        false,
        captureError(function(message, _, respond) {
          assert.equal(message, '2');
          respond('3');
        }, done)
      );
    });

    it('it errors if multiple callbacks are registered', function(done) {
      var calledFirst = captureError(function(message, _, respond) {
        respond('2a', true, calledThird);
        assert.throws(function() {
          respond('2b', true, function() {
            done(new Error('Should never be called'));
          });
        });
      }, done);

      var calledSecond = captureError(function(message, _, respond) {
        assert.equal(message, '2a');
        respond('3a');
      }, done);

      var calledThird = captureError(function(message) {
        assert.equal(message, '3a');
        setTimeout(function() {
          done(); // No further messages received
        }, 50);
      }, done);

      frameSubscribe('greeting', calledFirst);
      respondable(frameWin, 'greeting', '1', false, calledSecond);
    });

    it('logs errors in respondable callbacks', function(done) {
      var doneOnce = once(done);
      var logged = false;
      axe.log = function(e) {
        logged = true;
        assert.equal(e.message, 'This should not go to the frame');
      };

      frameSubscribe(
        'greeting',
        captureError(function(message, _, respond) {
          assert.equal(message, '1');

          respond('2', true, function() {
            doneOnce(new Error('should not call callback'));
          });
        }, doneOnce)
      );

      respondable(frameWin, 'greeting', '1', false, function(message) {
        assert.equal(message, '2');
        setTimeout(
          captureError(function() {
            assert.isTrue(logged);
            doneOnce();
          }, done),
          100
        );

        throw new Error('This should not go to the frame');
      });
    });

    it('is not called if the frame is not in the page', function(done) {
      var receivedResponse;
      frameSubscribe('greeting', function(message, keepalive, respond) {
        respond({ greet: 'ola' });
      });

      respondable(frameWin, 'greeting', 'hello', false, function(message) {
        receivedResponse = message;
        fixture.innerHTML = '';
      });

      afterMessage(window, function() {
        assert.deepEqual(receivedResponse, { greet: 'ola' });
        done();
      });
    });

    it('is not triggered by "repeaters"', function(done) {
      // Repeat fire the event
      window.addEventListener('message', function handler(evt) {
        frameWin.parent.postMessage(evt.data, '*');
        window.removeEventListener('message', handler);
      });

      frameSubscribe('greeting', function(message, _, respond) {
        respond('2', true);
      });

      var calls = 0;
      respondable(frameWin, 'greeting', '1', false, function() {
        calls++;
      });

      setTimeout(
        captureError(function() {
          assert.equal(calls, 1);
          done();
        }, done),
        100
      );
    });
  });

  describe('isInFrame', function() {
    it('is false for the page window', function() {
      var frameRespondable = frameWin.axe.utils.respondable;
      assert.isFalse(respondable.isInFrame());
      assert.isFalse(frameRespondable.isInFrame(window));
    });

    it('is true for iframes', function() {
      var frameRespondable = frameWin.axe.utils.respondable;
      assert.isTrue(frameRespondable.isInFrame());
      assert.isTrue(respondable.isInFrame(frameWin));
    });
  });
});

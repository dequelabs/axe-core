describe('axe.utils.respondable', function () {
  let fixture = document.querySelector('#fixture');
  let respondable = axe.utils.respondable;
  let noop = sinon.spy();
  let frameWin;

  beforeEach(function (done) {
    let frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', function () {
      frameWin = frame.contentWindow;
      done();
    });
    frame.addEventListener('error', done);

    fixture.appendChild(frame);
  });

  afterEach(function () {
    axe._thisWillBeDeletedDoNotUse.utils.setDefaultFrameMessenger(respondable);
  });

  it('should error if open is not a function', function () {
    assert.throws(function () {
      respondable.updateMessenger({
        post: noop,
        close: noop
      });
    });
  });

  it('should error if post is not a function', function () {
    assert.throws(function () {
      respondable.updateMessenger({
        open: noop
      });
    });
  });

  it('should error if open function return is not a function', function () {
    assert.throws(function () {
      respondable.updateMessenger({
        post: noop,
        open: function () {
          return 1;
        }
      });
    });
  });

  it('should call the open function and pass the listener', function () {
    let open = sinon.spy();
    respondable.updateMessenger({
      open: open,
      post: noop
    });

    assert.isTrue(open.called);
    assert.isTrue(typeof open.args[0][0] === 'function');
  });

  it('should call previous close function', function () {
    let close = sinon.spy();
    respondable.updateMessenger({
      open: function () {
        return close;
      },
      post: noop
    });

    respondable.updateMessenger({
      open: noop,
      post: noop
    });

    assert.isTrue(close.called);
  });

  it('should use the post function when making a frame post', function () {
    let post = sinon.spy();
    respondable.updateMessenger({
      open: noop,
      post: post
    });

    respondable(frameWin, 'greeting');
    assert.isTrue(post.called);
  });

  it('should pass the post function the correct parameters', function () {
    let post = sinon.spy();
    let callback = sinon.spy();

    respondable.updateMessenger({
      open: noop,
      post: post
    });

    respondable(frameWin, 'greeting', 'hello', true, callback);
    assert.isTrue(
      post.calledWith(
        frameWin,
        sinon.match({
          topic: 'greeting',
          message: 'hello',
          keepalive: true
        }),
        callback
      )
    );
  });

  it('should work as a full integration', function () {
    let listeners = {};
    let listener = sinon.spy();

    respondable.updateMessenger({
      open: function () {
        listeners.greeting = listener;
      },
      post: function (win, data) {
        if (listeners[data.topic]) {
          listeners[data.topic]();
        }
      },
      close: noop
    });

    respondable(frameWin, 'greeting', 'hello');
    assert.isTrue(listener.called);
  });
});

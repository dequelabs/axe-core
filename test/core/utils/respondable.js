describe('axe.utils.respondable', () => {
  const fixture = document.querySelector('#fixture');
  const respondable = axe.utils.respondable;
  const noop = sinon.spy();
  let frameWin;

  beforeEach(done => {
    const frame = document.createElement('iframe');
    frame.src = '../mock/frames/test.html';
    frame.addEventListener('load', () => {
      frameWin = frame.contentWindow;
      done();
    });
    frame.addEventListener('error', done);

    fixture.appendChild(frame);
  });

  afterEach(() => {
    axe._thisWillBeDeletedDoNotUse.utils.setDefaultFrameMessenger(respondable);
  });

  it('should error if open is not a function', () => {
    assert.throws(() => {
      respondable.updateMessenger({
        post: noop,
        close: noop
      });
    });
  });

  it('should error if post is not a function', () => {
    assert.throws(() => {
      respondable.updateMessenger({
        open: noop
      });
    });
  });

  it('should error if open function return is not a function', () => {
    assert.throws(() => {
      respondable.updateMessenger({
        post: noop,
        open: () => {
          return 1;
        }
      });
    });
  });

  it('should call the open function and pass the listener', () => {
    const open = sinon.spy();
    respondable.updateMessenger({
      open: open,
      post: noop
    });

    assert.isTrue(open.called);
    assert.isTrue(typeof open.args[0][0] === 'function');
  });

  it('should call previous close function', () => {
    const close = sinon.spy();
    respondable.updateMessenger({
      open: () => {
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

  it('should use the post function when making a frame post', () => {
    const post = sinon.spy();
    respondable.updateMessenger({
      open: noop,
      post: post
    });

    respondable(frameWin, 'greeting');
    assert.isTrue(post.called);
  });

  it('should pass the post function the correct parameters', () => {
    const post = sinon.spy();
    const callback = sinon.spy();

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

  it('should work as a full integration', () => {
    const listeners = {};
    const listener = sinon.spy();

    respondable.updateMessenger({
      open: () => {
        listeners.greeting = listener;
      },
      post: (win, data) => {
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

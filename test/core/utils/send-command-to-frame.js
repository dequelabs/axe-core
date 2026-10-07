describe('axe.utils.sendCommandToFrame', () => {
  const fixture = document.getElementById('fixture');
  let params;
  const captureError = axe.testUtils.captureError;
  const respondable = axe.utils.respondable;
  const { setDefaultFrameMessenger, getReplyHandler } =
    axe._thisWillBeDeletedDoNotUse.utils;
  const postMessage = window.postMessage;

  beforeEach(() => {
    params = { command: 'rules' };
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
    setDefaultFrameMessenger(respondable);
    window.postMessage = postMessage;
  });

  const assertNotCalled = () => {
    assert.ok(false, 'should not be called');
  };

  it('should return results from frames', done => {
    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(res => {
          assert.lengthOf(res, 1);
          assert.equal(res[0].id, 'html');
          done();
        }, done),
        () => {
          done(new Error('sendCommandToFrame should not error'));
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('adjusts skips ping with options.pingWaitTime=0', done => {
    const frame = document.createElement('iframe');
    params = {
      command: 'rules',
      options: { pingWaitTime: 0 }
    };

    frame.addEventListener('load', () => {
      const topics = [];
      frame.contentWindow.addEventListener('message', event => {
        try {
          topics.push(JSON.parse(event.data).topic);
        } catch {
          /* ignore */
        }
      });
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(() => {
          try {
            assert.deepEqual(topics, ['axe.start']);
            done();
          } catch (e) {
            done(e);
          }
        }, done),
        () => {
          done(new Error('sendCommandToFrame should not error'));
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('should timeout if there is no response from frame', done => {
    const orig = window.setTimeout;
    window.setTimeout = (fn, to) => {
      if (to === 30000) {
        assert.ok('timeout set');
        fn();
      } else {
        // ping timeout
        return orig(fn, to);
      }
      return 'cats';
    };

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      axe._tree = axe.utils.getFlattenedTree(document.documentElement);
      axe.utils.sendCommandToFrame(
        frame,
        params,
        result => {
          assert.equal(result, null);
          done();
        },
        assertNotCalled
      );
      window.setTimeout = orig;
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);
  });

  it('should remove the ping reply handler after the ping times out', done => {
    params.options = { pingWaitTime: 10 };

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      const postSpy = sinon.spy(frame.contentWindow, 'postMessage');
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(res => {
          try {
            assert.isNull(res);
            const { channelId } = JSON.parse(postSpy.firstCall.args[0]);
            assert.isTrue(
              getReplyHandler(channelId) === undefined,
              'ping reply handler was not removed'
            );
            done();
          } catch (e) {
            done(e);
          }
        }, done),
        assertNotCalled
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);
  });

  it('should remove the axe.start reply handler after the frame times out', done => {
    params.options = { pingWaitTime: 0, frameWaitTime: 10 };

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      const postSpy = sinon.spy(frame.contentWindow, 'postMessage');
      axe.utils.sendCommandToFrame(
        frame,
        params,
        assertNotCalled,
        captureError(err => {
          try {
            assert.instanceOf(err, Error);
            const { channelId } = JSON.parse(postSpy.firstCall.args[0]);
            assert.isTrue(
              getReplyHandler(channelId) === undefined,
              'axe.start reply handler was not removed'
            );
            done();
          } catch (e) {
            done(e);
          }
        }, done)
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);
  });

  it('should ignore a ping response that arrives after the ping times out', done => {
    const channels = {};
    const posts = [];
    respondable.updateMessenger({
      open: () => {},
      post: (win, data, replyHandler) => {
        posts.push(data);
        channels[data.channelId] = replyHandler;
        return true;
      }
    });
    params.options = { pingWaitTime: 10 };

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(res => {
          try {
            assert.isNull(res);
            assert.equal(posts[0].topic, 'axe.ping');
            // The late ping response must not start axe in the frame
            channels[posts[0].channelId]();
            assert.lengthOf(posts, 1);
            done();
          } catch (e) {
            done(e);
          }
        }, done),
        err => done(err)
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);
  });

  it('should ignore an axe.start response that arrives after the frame times out', done => {
    const channels = {};
    const posts = [];
    respondable.updateMessenger({
      open: () => {},
      post: (win, data, replyHandler) => {
        posts.push(data);
        channels[data.channelId] = replyHandler;
        return true;
      }
    });
    params.options = { pingWaitTime: 0, frameWaitTime: 10 };
    let resolved = false;

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      axe.utils.sendCommandToFrame(
        frame,
        params,
        () => {
          resolved = true;
        },
        captureError(err => {
          try {
            assert.instanceOf(err, Error);
            assert.equal(posts[0].topic, 'axe.start');
            channels[posts[0].channelId]([{ id: 'html' }]);
            assert.isFalse(resolved);
            assert.lengthOf(posts, 1);
            done();
          } catch (e) {
            done(e);
          }
        }, done)
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frame);
  });

  it('should keep reply handlers of concurrent frames independent', done => {
    const channels = {};
    const posts = [];
    respondable.updateMessenger({
      open: () => {},
      post: (win, data, replyHandler) => {
        posts.push({ data, fromA: win === frameA.contentWindow });
        channels[data.channelId] = replyHandler;
        return true;
      }
    });
    params.options = { pingWaitTime: 20 };

    const frameA = document.createElement('iframe');
    const frameB = document.createElement('iframe');
    const resultsA = [{ id: 'html' }];
    let loaded = 0;

    function onLoad() {
      if (++loaded < 2) {
        return;
      }
      let resA;
      axe.utils.sendCommandToFrame(
        frameA,
        params,
        res => {
          resA = res;
        },
        err => done(err)
      );
      axe.utils.sendCommandToFrame(
        frameB,
        params,
        captureError(res => {
          try {
            assert.isNull(res);
            // A late ping response to the timed-out frame is ignored
            const pingB = posts.find(post => post.fromA === false);
            channels[pingB.data.channelId]();
            assert.lengthOf(posts, 3);
            assert.deepEqual(resA, resultsA);
            done();
          } catch (e) {
            done(e);
          }
        }, done),
        err => done(err)
      );

      // frameA responds to its ping in time, then to axe.start
      const pingA = posts.find(post => post.fromA === true);
      channels[pingA.data.channelId]();
      const startA = posts.find(
        post => post.fromA === true && post.data.topic === 'axe.start'
      );
      channels[startA.data.channelId](resultsA);
    }

    frameA.addEventListener('load', onLoad);
    frameB.addEventListener('load', onLoad);
    frameA.src = '../mock/frames/zombie-frame.html';
    frameB.src = '../mock/frames/zombie-frame.html';
    fixture.appendChild(frameA);
    fixture.appendChild(frameB);
  });

  it('should not send axe.start when a ping response arrives after the timeout', done => {
    params.options = { pingWaitTime: 20 };
    const heldReplies = [];
    window.postMessage = (data, origin) => {
      heldReplies.push([data, origin]);
    };

    const frame = document.createElement('iframe');
    frame.addEventListener('load', () => {
      const topics = [];
      frame.contentWindow.addEventListener('message', event => {
        try {
          topics.push(JSON.parse(event.data).topic);
        } catch {
          /* ignore */
        }
      });
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(res => {
          try {
            assert.isNull(res);
            window.postMessage = postMessage;
            // The reply can only come from the frame, so have the frame
            // deliver the responses it sent while the ping timed out
            heldReplies.forEach(([data, origin]) => {
              const script = frame.contentDocument.createElement('script');
              script.textContent = `window.parent.postMessage(${JSON.stringify(
                data
              )}, ${JSON.stringify(origin)})`;
              frame.contentDocument.body.appendChild(script);
            });
            setTimeout(
              captureError(() => {
                assert.deepEqual(topics, ['axe.ping']);
                done();
              }, done),
              100
            );
          } catch (e) {
            done(e);
          }
        }, done),
        err => done(err)
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });
});

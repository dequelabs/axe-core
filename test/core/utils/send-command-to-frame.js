describe('axe.utils.sendCommandToFrame', () => {
  const fixture = document.getElementById('fixture');
  let params;
  const captureError = axe.testUtils.captureError;

  beforeEach(() => {
    params = { command: 'rules' };
  });

  afterEach(() => {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
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
        captureError(function (res) {
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
      frame.contentWindow.addEventListener('message', function (event) {
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
    window.setTimeout = function (fn, to) {
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
        function (result) {
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
});

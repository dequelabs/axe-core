describe('axe.utils.sendCommandToFrame', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var params = { command: 'rules' };
  var captureError = axe.testUtils.captureError;

  afterEach(function () {
    fixture.innerHTML = '';
    axe._tree = undefined;
    axe._selectorData = undefined;
  });

  var assertNotCalled = function () {
    assert.ok(false, 'should not be called');
  };

  it('should return results from frames', function (done) {
    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(function (res) {
          assert.lengthOf(res, 1);
          assert.equal(res[0].id, 'html');
          done();
        }, done),
        function () {
          done(new Error('sendCommandToFrame should not error'));
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('adjusts skips ping with options.pingWaitTime=0', function (done) {
    var frame = document.createElement('iframe');
    var params = {
      command: 'rules',
      options: { pingWaitTime: 0 }
    };

    frame.addEventListener('load', function () {
      var topics = [];
      frame.contentWindow.addEventListener('message', function (event) {
        try {
          topics.push(JSON.parse(event.data).topic);
        } catch (_) {
          /* ignore */
        }
      });
      axe.utils.sendCommandToFrame(
        frame,
        params,
        captureError(function () {
          try {
            assert.deepEqual(topics, ['axe.start']);
            done();
          } catch (e) {
            done(e);
          }
        }, done),
        function () {
          done(new Error('sendCommandToFrame should not error'));
        }
      );
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/test.html';
    fixture.appendChild(frame);
  });

  it('should timeout if there is no response from frame', function (done) {
    var orig = window.setTimeout;
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

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
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

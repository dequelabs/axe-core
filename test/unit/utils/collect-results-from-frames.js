/*global Context */
describe('utils.collectResultsFromFrames', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  it('should timeout after 30s', function (done) {
    this.timeout(5000);
    var orig = window.setTimeout;
    window.setTimeout = function (fn, to) {
      if (to === 30000) {
        assert.ok('timeout set');
        fn();
      } else { // ping timeout
        return orig(fn, to);
      }
      return 'cats';
    };
    var origLog = dqre.log,
      logCalled = false;
    dqre.log = function (msg, actualFrame) {
      assert.equal(msg, 'Error returning results from frame: ');
      assert.equal(actualFrame, frame);
      logCalled = true;
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = new Context(document);
      utils.collectResultsFromFrames(context, {}, 'stuff', 'morestuff', function () {
        assert.isTrue(logCalled);
        delete window.setTimeout;
        dqre.log = origLog;
        done();
      });
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);

  });
});

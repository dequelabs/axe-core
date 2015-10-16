/*global Context */
describe('utils.collectResultsFromFrames', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

  it('should timeout after 30s', function (done) {
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
    var origLog = axe.log,
      logCalled = false;
    axe.log = function (msg, actualFrame) {
      assert.equal(msg, 'Error returning results from frame: ');
      assert.equal(actualFrame, frame);
      logCalled = true;
    };

    var frame = document.createElement('iframe');
    frame.addEventListener('load', function () {
      var context = new Context(document);
      utils.collectResultsFromFrames(context, {}, 'stuff', 'morestuff', function () {
        assert.isTrue(logCalled);
        window.setTimeout = orig;
        axe.log = origLog;
        done();
      });
    });

    frame.id = 'level0';
    frame.src = '../mock/frames/results-timeout.html';
    fixture.appendChild(frame);

  });

	it('should not throw given a recursive iframe', function (done) {
		axe._load({
			rules: [{
				id: 'iframe',
				selector: 'iframe',
				any: [{
					id: 'iframe',
					evaluate: function () {
						return true;
					}
				}]
			}],
			messages: {}
		});

		var frame = document.createElement('iframe');
		frame.addEventListener('load', function () {
			var context = new Context(document);
			utils.collectResultsFromFrames(context, {}, 'rules', 'morestuff', function () {
				done();
			});
		});

		frame.id = 'level0';
		frame.src = '../mock/frames/recursive.html';
		fixture.appendChild(frame);

	});

});

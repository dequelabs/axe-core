/*global Context */
describe('axe.utils.collectResultsFromFrames', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var noop = function () {};

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe._selectorData = undefined;
	});

	it('should timeout after 60s', function (done) {
		var orig = window.setTimeout;
		window.setTimeout = function (fn, to) {
			if (to === 60000) {
				assert.ok('timeout set');
				fn();
			} else { // ping timeout
				return orig(fn, to);
			}
			return 'cats';
		};

		var frame = document.createElement('iframe');
		frame.addEventListener('load', function () {
			var context = new Context(document);
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);
			axe.utils.collectResultsFromFrames(context, {}, 'stuff', 'morestuff', noop,
			function (err) {
				assert.instanceOf(err, Error);
				assert.equal(err.message.split(/: /)[0], 'Axe in frame timed out');
				window.setTimeout = orig;
				done();
			});
		});

		frame.id = 'level0';
		frame.src = '../mock/frames/results-timeout.html';
		fixture.appendChild(frame);

	});

	it('should override the timeout with `options.frameWaitTime`, if provided', function (done) {
		var orig = window.setTimeout;
		window.setTimeout = function (fn, to) {
			if (to === 90000) {
				assert.ok('timeout set');
				fn();
			} else { // ping timeout
				return orig(fn, to);
			}
			return 'cats';
		};

		var frame = document.createElement('iframe');
		frame.addEventListener('load', function () {
			var context = new Context(document);
			var params = { frameWaitTime: 90000 };
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);
			axe.utils.collectResultsFromFrames(context, params, 'stuff', 'morestuff', noop,
			function (err) {
				assert.instanceOf(err, Error);
				assert.equal(err.message.split(/: /)[0], 'Axe in frame timed out');
				window.setTimeout = orig;
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
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);
			axe.utils.collectResultsFromFrames(context, {}, 'rules', 'morestuff', function () {
				done();
			}, function (e) {
				assert.ok(false, e);
				done();
			});
		});

		frame.id = 'level0';
		frame.src = '../mock/frames/nested0.html';
		fixture.appendChild(frame);

	});

	it('returns errors send from the frame', function (done) {
		var frame = document.createElement('iframe');
		frame.addEventListener('load', function () {
			var context = new Context(document);
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);
			axe.utils.collectResultsFromFrames(context, {}, 'command', 'params', noop,
			function (err) {

				assert.instanceOf(err, Error);
				assert.equal(err.message.split(/\n/)[0], 'error in axe.throw');
				done();
			});

		});

		frame.id = 'level0';
		frame.src = '../mock/frames/throwing.html';
		fixture.appendChild(frame);
	});

});

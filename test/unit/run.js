describe('dqre.run', function () {
	'use strict';

	function iframeReady(src, context, id, cb) {
		var i = document.createElement('iframe');
		i.addEventListener('load', function () {
			cb();
		});
		i.src = src;
		i.id = id;
		context.appendChild(i);
	}

	function createFrames(num, callback) {
		var frame,
			loaded = 0;

		function onLoad() {
			loaded++;
			if (loaded >= (num + 1)) {
				callback();
			}
		}

		for (var i = 0; i < num; i++) {
			frame = document.createElement('frame');
			frame.src = '../mock/frames/e2e.html';

			frame.addEventListener('load', onLoad);
			fixture.appendChild(frame);

		}
		frame = document.createElement('frame');
		frame.src = '../mock/frames/nocode.html';
		frame.addEventListener('load', onLoad);
		fixture.appendChild(frame);
	}

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
		dqre.audit = null;
	});

	it('should throw if no audit is configured', function () {

		assert.throws(function () {
			dqre.run(document, {});
		}, Error, /^No audit configured/);
	});

	it('should work', function (done) {
		dqre.configure({ rules: [], messages: {}});

		createFrames(2, function () {
			dqre.run(document, {}, function () {
				done();
			});

		});
	});
	it('should properly calculate context and return results from matching frames', function (done) {

		dqre.configure({
			rules: [{
				id: 'div#target',
				selector: '#target',
				checks: [{
					id: 'has-target',
					evaluate: function () {
						return true;
					}
				}]
			}],
			messages: {}
		});

		iframeReady('../mock/frames/context.html', fixture, 'context-test', function () {

			dqre.run('#fixture', {}, function (results) {
				assert.deepEqual(results, [{
					id: 'div#target',
					type: 'NODE',
					details: [{
						node: {
							selector: '#target',
							source: '<div id="target"></div>',
							frames: ['#context-test']
						},
						result: 'PASS',
						checks: [{
							certainty: 'DEFINITE',
							interpretation: 'VIOLATION',
							id: 'has-target',
							type: 'PASS',
							data: null,
							async: false,
							result: true,
							error: null/*, @todo add back when it starts to fail (PR-22 / KSD-98)
							relatedNodes: [] */
						}]
					}],
					result: 'PASS'
				}]);

				done();
			});

		});
	});});

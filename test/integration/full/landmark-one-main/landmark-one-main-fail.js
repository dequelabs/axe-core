describe('landmark-one-main test failure', function () {
	'use strict';
	var results;
	before(function (done) {
		function start() {
			axe.run({ runOnly: { type: 'rule', values: ['landmark-one-main'] } }, function (err, r) {
				assert.isNull(err);
				results = r;
				done();
			});
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	describe('violations', function () {
		it('should find 1', function () {
			assert.lengthOf(results.violations[0].nodes, 2);
		});

		it('should find #frame1', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
		});

		it('should find #frame1, #violation2', function () {
			assert.deepEqual(results.violations[0].nodes[1].target, ['#frame1', '#violation2']);
		});
	});

	describe('passes', function () {
		it('should find 0', function () {
			assert.lengthOf(results.passes, 0);
		});
	});

	it('should find 0 inapplicable', function () {
		assert.lengthOf(results.inapplicable, 0);
	});

	it('should find 0 incomplete', function () {
		assert.lengthOf(results.incomplete, 0);
	});
});

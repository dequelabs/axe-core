
describe('html-has-lang test', function () {
	'use strict';
	var results;
	before(function (done) {
		function start() {
			axe.run({ runOnly: { type: 'rule', values: ['html-has-lang'] } }, function (err, r) {
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
		it('should find 2', function () {
			assert.lengthOf(results.violations[0].nodes, 2);
		});
		it('should find first level iframe', function () {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#frame1', '#violation1']);
		});
		it('should find second level iframe', function () {
			assert.deepEqual(results.violations[0].nodes[1].target, ['#frame1', '#frame2', '#violation2']);
		});
	});

	describe('passes', function () {
		it('should find 2', function () {
			assert.lengthOf(results.passes[0].nodes, 2);
		});

		it('should find #pass1', function () {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
		});

		it('should find #pass2', function () {
			assert.deepEqual(results.passes[0].nodes[1].target, ['#frame1', '#frame3', '#pass2']);
		});
	});
});

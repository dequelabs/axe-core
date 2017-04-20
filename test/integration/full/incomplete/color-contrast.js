
describe('contrast cantTell test', function () {
	'use strict';
	var results;
	before(function (done) {
		function start() {
			axe.run('#fixture', {
				runOnly: { type: 'rule', values: ['color-contrast'] }
			}, function (err, r) {
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

	describe('passes/violations', function () {
		it('should find 0 passes', function () {
			assert.lengthOf(results.passes, 0);
		});
		it('should find 0 violations', function () {
			assert.lengthOf(results.violations, 0);
		});
	});

	describe('incomplete data', function () {
		it('should find 1', function () {
			assert.lengthOf(results.incomplete, 1);
		});

		describe('indicating specific reasons', function () {
			it('works for image nodes', function () {
				var resultNodes = results.incomplete[0].nodes;
				resultNodes[0].any.forEach(function(check) {
					assert.match(check.message, /image node/);
				});
			});

			it('works for background gradients', function () {
				var resultNodes = results.incomplete[0].nodes;
				resultNodes[1].any.forEach(function(check) {
					assert.match(check.message, /background gradient/);
				});
			});
		});
	});
});

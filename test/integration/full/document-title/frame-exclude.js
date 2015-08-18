
describe('frame-exclude test', function () {
	'use strict';
	var results;
	before(function (done) {
		window.addEventListener('load', function () {
			axe.a11yCheck({ exclude: [['iframe']] }, { runOnly: { type: 'rule', values: ['frame-title'] } }, function (r) {
				results = r;
				done();
			});
		});
	});

	describe('violations', function () {
		it('should find 0', function () {
			assert.lengthOf(results.violations, 0);
		});
	});

	describe('passes', function () {
		it('should find 0', function () {
			assert.lengthOf(results.passes, 0);
		});
	});
});

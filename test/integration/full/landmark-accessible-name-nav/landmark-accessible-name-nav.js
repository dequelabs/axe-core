describe('landmark-accessible-name-nav', function () {
	'use strict';
	var results;
	before(function (done) {
		function start() {
			axe.run({ runOnly: { type: 'rule', values: ['landmark-accessible-name-nav'] } }, function (err, r) {
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
		it('should find 4', function () {
			assert.lengthOf(results.violations[0].nodes, 4);
		});
		it('should find 3', function () {
			assert.lengthOf(results.passes[0].nodes, 3);
		});
		it('should find 0 inapplicable', function () {
			assert.lengthOf(results.inapplicable, 0);
		});

		it('should find 0 incomplete', function () {
			assert.lengthOf(results.incomplete, 0);
		});
	});


});

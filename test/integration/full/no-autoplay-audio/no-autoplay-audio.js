describe('landmark-no-duplicate-main test failure', function() {
	'use strict';

	var results;
	var isIE11 = axe.testUtils.isIE11;

	before(function(done) {
		if (isIE11) {
			this.skip();
		} else {
			axe.testUtils.awaitNestedLoad(function() {
				axe.run(
					{ runOnly: { type: 'rule', values: ['no-autoplay-audio'] } },
					function(err, r) {
						assert.isNull(err);
						results = r;
						done();
					}
				);
			});
		}
	});

	describe('passes', function() {
		(isIE11 ? xit : it)('should find 5', function() {
			assert.isDefined(results.passes);

			var passNodes = results.passes[0].nodes;
			assert.lengthOf(passNodes, 5);
			assert.deepEqual(passNodes[0].target, ['#pass1']);
			assert.deepEqual(passNodes[1].target, ['#pass2']);
			assert.deepEqual(passNodes[2].target, ['#pass3']);
			assert.deepEqual(passNodes[3].target, ['#pass4']);
			assert.deepEqual(passNodes[4].target, ['#pass5']);
		});
	});

	describe('violations', function() {
		(isIE11 ? xit : it)('should find 4', function() {
			assert.isDefined(results.violations);

			var failNodes = results.violations[0].nodes;
			assert.lengthOf(failNodes, 4);
			assert.deepEqual(failNodes[0].target, ['#fail1']);
			assert.deepEqual(failNodes[1].target, ['#fail2']);
			assert.deepEqual(failNodes[2].target, ['#fail3']);
			assert.deepEqual(failNodes[3].target, ['#fail4']);
		});
	});

	(isIE11 ? xit : it)('should find 0 inapplicable', function() {
		assert.lengthOf(results.inapplicable, 0);
	});

	(isIE11 ? xit : it)('should find 0 incomplete', function() {
		assert.lengthOf(results.incomplete, 0);
	});
});

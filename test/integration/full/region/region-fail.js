describe('region fail test', function() {
	'use strict';
	var results;
	before(function(done) {
		axe.run({ runOnly: { type: 'rule', values: ['region'] } }, function(
			err,
			r
		) {
			assert.isNull(err);
			results = r;
			done();
		});
	});

	describe('violations', function() {
		it('should find one', function() {
			assert.lengthOf(results.violations[0].nodes, 1);
		});

		it('should find html', function() {
			assert.deepEqual(results.violations[0].nodes[0].target, ['html']);
		});

		it('should have all text content as related nodes', function() {
			var wrapper = document.querySelector('#wrapper');
			assert.equal(
				results.violations[0].nodes[0].any[0].relatedNodes.length,
				wrapper.querySelectorAll('h1, li, p, a').length
			);
		});
	});

	describe('passes', function() {
		it('should find none', function() {
			assert.lengthOf(results.passes, 0);
		});
	});
});

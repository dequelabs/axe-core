describe('bypass iframe test fail', function() {
	'use strict';
	var results;
	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			// Stop messing with my tests Mocha!
			var heading = document.querySelector('#mocha h1');
			if (heading) {
				heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
			}

			axe.run({ runOnly: { type: 'rule', values: ['bypass'] } }, function(
				err,
				r
			) {
				assert.isNull(err);
				results = r;
				done();
			});
		});
	});

	describe('violations', function() {
		it('should find 1', function() {
			assert.lengthOf(results.violations[0].nodes, 2);
		});

		it('should find #frame1', function() {
			assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
		});

		it('should find #frame1, #violation2', function() {
			assert.deepEqual(results.violations[0].nodes[1].target, [
				'#frame1',
				'#violation2'
			]);
		});
	});

	describe('passes', function() {
		it('should find none', function() {
			assert.lengthOf(results.passes, 0);
		});
	});
});

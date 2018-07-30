describe('page-has-heading-one test pass', function() {
	'use strict';
	var results;
	before(function(done) {
		function start() {
			// Stop messing with my tests Mocha!
			document.querySelector('#mocha h1').outerHTML =
				'<h2>page-has-heading-one test</h2>';

			axe.run(
				{ runOnly: { type: 'rule', values: ['page-has-heading-one'] } },
				function(err, r) {
					assert.isNull(err);
					results = r;
					console.log(r);
					done();
				}
			);
		}
		if (document.readyState !== 'complete') {
			window.addEventListener('load', start);
		} else {
			start();
		}
	});

	describe('violations', function() {
		it('should find 0', function() {
			assert.lengthOf(results.violations, 0);
		});
	});

	describe('passes', function() {
		it('should find 4', function() {
			assert.lengthOf(results.passes[0].nodes, 4);
		});

		it('should find #pass1', function() {
			assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
		});

		it('should find #frame1, #pass2', function() {
			assert.deepEqual(results.passes[0].nodes[1].target, [
				'#frame1',
				'#pass2'
			]);
		});

		it('should find #frame1, #frame2, #pass3', function() {
			assert.deepEqual(results.passes[0].nodes[2].target, [
				'#frame1',
				'#frame2',
				'#pass3'
			]);
		});

		it('should find #frame1, #frame3, #pass4', function() {
			assert.deepEqual(results.passes[0].nodes[3].target, [
				'#frame1',
				'#frame3',
				'#pass4'
			]);
		});
	});

	it('should find 0 inapplicable', function() {
		assert.lengthOf(results.inapplicable, 0);
	});

	it('should find 0 incomplete', function() {
		assert.lengthOf(results.incomplete, 0);
	});
});

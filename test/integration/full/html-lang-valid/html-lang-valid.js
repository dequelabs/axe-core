describe('html-lang-valid test', function() {
	'use strict';

	var results;

	before(function(done) {
		axe.testUtils.awaitNestedLoad(function() {
			axe.run(
				{ runOnly: { type: 'rule', values: ['html-lang-valid'] } },
				function(err, r) {
					assert.isNull(err);
					results = r;
					done();
				}
			);
		});
	});

	describe('violations', function() {
		var violations = results.violations[0];

		it('should find 3', function() {
			assert.lengthOf(violations.nodes, 3);
		});

		it('should find first level iframe', function() {
			assert.deepEqual(violations.nodes[0].target, ['#frame1', '#violation1']);
		});

		it('should find second level iframe', function() {
			assert.deepEqual(violations.nodes[1].target, [
				'#frame1',
				'#frame2',
				'#violation2'
			]);
		});

		it('should find #violation2c', function() {
			assert.deepEqual(violations.nodes[2].target, [
				'#frame1',
				'#frame5',
				'#violation2c'
			]);
		});
	});

	describe('passes', function() {
		var passes = results.passes[0];

		it('should find 2', function() {
			assert.lengthOf(passes.nodes, 2);
		});

		it('should find #pass1', function() {
			assert.deepEqual(passes.nodes[0].target, [
				'#frame1',
				'#frame3',
				'#pass1'
			]);
		});

		it('should find #pass2b', function() {
			assert.deepEqual(passes.nodes[1].target, [
				'#frame1',
				'#frame4',
				'#pass2b'
			]);
		});
	});
});

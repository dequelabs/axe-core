describe('color-contrast code highlighting test', function() {
	'use strict';
	var results;

	before(function(done) {
		var options = { runOnly: { type: 'rule', values: ['color-contrast'] } };
		axe.run('#fixture', options, function(err, res) {
			if (err) {
				done(err);
			} else {
				results = res;
				done();
			}
		});
	});

	describe('violations', function() {
		it('should find issues', function() {
			assert.lengthOf(results.violations, 1);
			assert.lengthOf(results.violations[0].nodes, 32);
		});
	});

	describe('passes', function() {
		it('should find passes', function() {
			assert.lengthOf(results.passes, 1);
			assert.lengthOf(results.passes[0].nodes, 27);
		});
	});

	describe('incomplete', function() {
		it('should find just the code block', function() {
			assert.lengthOf(results.incomplete, 1);
			assert.lengthOf(results.incomplete[0].nodes, 1);
			assert.equal(
				results.incomplete[0].nodes[0].html,
				'<code class=" language-html">'
			);
		});
	});
});

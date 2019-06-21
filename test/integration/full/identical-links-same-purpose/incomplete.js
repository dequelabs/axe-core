describe('identical-links-same-purpose incomplete test', function() {
	'use strict';

	var runConfig = {
		runOnly: {
			type: 'rule',
			values: ['identical-links-same-purpose']
		}
	};

	it('returns incomplete results and no passes', function(done) {
		axe.run(runConfig, function(err, res) {
			assert.isNull(err);
			assert.isDefined(res);

			assert.lengthOf(res.passes, 0);
			assert.lengthOf(res.incomplete, 1);
			assert.lengthOf(res.incomplete[0].nodes, 4);
			assert.equal(
				res.incomplete[0].nodes[0].html,
				'<a href="/about/contact.html">Contact</a>'
			);
			done();
		});
	});
});

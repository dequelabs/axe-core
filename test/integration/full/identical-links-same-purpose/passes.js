describe('identical-links-same-purpose passes test', function() {
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

			assert.lengthOf(res.passes, 1);
			assert.lengthOf(res.incomplete, 0);
			assert.lengthOf(res.passes[0].nodes, 6);
			assert.deepEqual(res.passes[0].nodes[5].target, ['span:nth-child(6)']);

			done();
		});
	});
});


describe('li overriden with ARIA role', function () {
	'use strict';
	it('should find no matching violations and one pass', function (done) {
		axe.run('#fixture', { runOnly: { type: 'rule', values: ['listitem'] } }, function (err, results) {
			assert.isNull(err);
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 1, 'passes');
			assert.lengthOf(results.passes[0].nodes, 1, 'ARIA container');
			done();
		});
	});
});

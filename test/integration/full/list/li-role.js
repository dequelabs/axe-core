
describe('li overriden with ARIA role', function () {
	'use strict';
	it('should find no matching violations and one pass', function (done) {
		axe.a11yCheck('#fixture', { runOnly: { type: 'rule', values: ['listitem'] } }, function (results) {
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 1, 'passes');
			assert.lengthOf(results.passes[0].nodes, 1, 'ARIA container');
			done();
		});
	});
});

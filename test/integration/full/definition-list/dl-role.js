
describe('definition-list overriden with ARIA role', function () {
	'use strict';
	it('should find no matches', function (done) {
		axe.run({ runOnly: { type: 'rule', values: ['definition-list'] } }, function (err, results) {
			assert.isNull(err);
			assert.lengthOf(results.violations, 0);
			assert.lengthOf(results.passes, 0);
			done();
		});
	});
});

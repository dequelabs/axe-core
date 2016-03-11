
describe('definition-list overriden with ARIA role', function () {
	'use strict';
	it('should find no matches', function (done) {
		axe.a11yCheck(document, { runOnly: { type: 'rule', values: ['definition-list'] } }, function (results) {
			assert.lengthOf(results.violations, 0);
			assert.lengthOf(results.passes, 0);
			done();
		});
	});
});

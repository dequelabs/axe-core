
describe('list overriden with ARIA role', function () {
	'use strict';
	it('should find no matches', function (done) {
		axe.run('#fixture', { runOnly: { type: 'rule', values: ['list'] } }, function (err, results) {
			if (err) throw err;
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 0, 'passes');
			done();
		});
	});
});

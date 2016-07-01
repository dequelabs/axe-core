/*global $ */

describe('jQuery object as a11yCheck context', function () {
	'use strict';
	it('should find no violations', function (done) {
		var target = $('#target')[0];
		axe.a11yCheck({ include: [target] }, {}, function (results) {
			assert.lengthOf(results.violations, 1, 'violations');
			assert.lengthOf(results.passes, 7, 'passes');
			done();
		});
	});
});

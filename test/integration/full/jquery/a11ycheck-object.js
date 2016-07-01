/*global $ */

describe('jQuery object as a11yCheck context', function () {
	'use strict';
	it('should find no violations', function (done) {
		var fixture = $('#fixture');
		axe.a11yCheck(fixture, {}, function (results) {
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 0, 'passes');
			done();
		});
	});
});

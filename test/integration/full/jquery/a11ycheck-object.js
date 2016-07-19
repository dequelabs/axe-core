/*global $ */

describe('jQuery object as a11yCheck context', function () {
	'use strict';
	var config = { runOnly: { type: 'rule', values: ['aria-roles'] } };
	it('should find no violations', function (done) {
		var fixture = $('#fixture');
		axe.a11yCheck(fixture, config, function (results) {
			assert.lengthOf(results.violations, 0, 'violations');
			assert.lengthOf(results.passes, 1, 'passes');
			done();
		});
	});
});

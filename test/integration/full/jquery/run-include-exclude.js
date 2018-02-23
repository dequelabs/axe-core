/*global $ */

describe('jQuery object with axe.run', function () {
	'use strict';

	var config = { runOnly: { type: 'rule', values: ['aria-roles'] } };

	describe('include', function() {
		it('should find violations', function (done) {
			var target = $('#target')[0];
			axe.run({ include: [target] }, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 1, 'violations');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});

	describe('exclude', function() {
		it('should find no violations', function (done) {
			var target = $('#target')[0];
			axe.run({ exclude: [target] }, config, function (err, results) {
				assert.isNull(err);
				assert.lengthOf(results.violations, 0, 'violations');
				assert.lengthOf(results.passes, 0, 'passes');
				done();
			});
		});
	});
});

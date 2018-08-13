describe('axe.utils.getBaseLang', function() {
	'use strict';

	it('returns base lang as peanut for argument peanut-BUTTER', function() {
		var actual = axe.utils.getBaseLang('peanut-BUTTER');
		assert.equal(actual, 'peanut');
	});

	it('returns false when expecting fr instead of en', function() {
		var actual = axe.utils.getBaseLang('en');
		assert.notEqual(actual, 'fr');
	});

	it('returns base lang which is the prefix string before the first - (hyphen)', function() {
		var actual = axe.utils.getBaseLang('en-GB');
		assert.equal(actual, 'en');
	});
});

describe('helpers.incompleteFallbackMessage', function() {
	'use strict';
	before(function() {
		axe._load({
			messages: {},
			rules: [],
			data: {
				incompleteFallbackMessage: 'Dogs are the best'
			}
		});
	});

	it('should return a string', function() {
		var summary = helpers.incompleteFallbackMessage();
		assert.equal(summary, 'Dogs are the best');
	});

	it('should handle doT.js template function', function() {
		axe._load({
			messages: {},
			rules: [],
			data: {
				incompleteFallbackMessage: function anonymous() {
					return 'Dogs are the best';
				}
			}
		});

		var summary = helpers.incompleteFallbackMessage();
		assert.equal(summary, 'Dogs are the best');
	});
});

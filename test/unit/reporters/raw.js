describe('reporters - raw', function () {
	'use strict';

	it('should pass through object', function () {
		var orig = window.runRules;
		window.runRules = function (_, __, cb) {
			cb('foo');
		};

		dqre.a11yCheck(document, { reporter: 'raw'}, function (r) {
			assert.equal(r, 'foo');
		});

		window.runRules = orig;
	});
});

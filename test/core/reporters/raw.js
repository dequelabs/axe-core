describe('reporters - raw', function () {
	'use strict';

	it('should pass through object', function () {
		axe._load({});
		var orig = axe._runRules;
		axe._runRules = function (_, __, cb) {
			cb('foo');
		};

		axe.run({ reporter: 'raw'}, function (err, results) {
			if (err) throw err;
			assert.equal(results, 'foo');
		});

		axe._runRules = orig;
	});
});

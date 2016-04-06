describe('reporters - raw', function () {
	'use strict';

	it('should pass through object', function () {
		axe._load({});
		var orig = axe._runRules;
		axe._runRules = function (_, __, cb) {
			cb('foo');
		};

		axe.run({ reporter: 'raw'}, function (err, results) {
			assert.isNull(err);
			assert.equal(results, 'foo');
		});

		axe._runRules = orig;
	});
});

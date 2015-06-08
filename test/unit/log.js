describe('axe.log', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(axe.log);
	});
	it('should invoke console.log', function () {
		if (!window.console || window.console.log) {
			window.console = { log: function () {} };
		}
		var orig = window.console.log;
		var expected = ['hi', 'hello'];
		var success = false;

		window.console.log = function () {
			success = true;
			assert.equal(arguments[0], expected[0]);
			assert.equal(arguments[1], expected[1]);
		};

		axe.log.apply(axe.log, expected);
		assert.isTrue(success);

		window.console.log = orig;
	});
});
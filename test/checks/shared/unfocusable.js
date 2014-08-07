describe('unfocusable', function () {
	'use strict';

	it('should call and invert kslib.dom.isFocusable - true', function () {
		var orig = kslib.dom.isFocusable;
		kslib.dom.isFocusable = function () {
			return true;
		};
		assert.isFalse(checks.unfocusable.evaluate());
		kslib.dom.isFocusable = orig;
	});

	it('should call and invert kslib.dom.isFocusable - false', function () {
		var orig = kslib.dom.isFocusable;
		kslib.dom.isFocusable = function () {
			return false;
		};
		assert.isTrue(checks.unfocusable.evaluate());
		kslib.dom.isFocusable = orig;
	});

});

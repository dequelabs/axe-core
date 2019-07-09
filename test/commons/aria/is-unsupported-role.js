describe('aria.isUnsupportedRole', function() {
	'use strict';

	it('should return true if the role is unsupported', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			cats: {
				unsupported: true
			}
		};
		assert.isTrue(axe.commons.aria.isUnsupportedRole('cats'));
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return false if the role is supported', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			cats: {
				unsupported: false
			}
		};
		assert.isFalse(axe.commons.aria.isUnsupportedRole('cats'));
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return false if the role is invalid', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {};
		assert.isFalse(axe.commons.aria.isUnsupportedRole('cats'));
		axe.commons.aria.lookupTable.role = orig;
	});
});

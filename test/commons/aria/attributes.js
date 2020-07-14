describe('aria.validateAttr', function() {
	'use strict';

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.attributes;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.attributes = orig;
	});

	it('should return true if attribute is found in lut', function() {
		axe.commons.aria.lookupTable.attributes = {
			cats: {}
		};

		assert.isTrue(axe.commons.aria.validateAttr('cats'));
	});

	it('should return false if attribute is found in lut', function() {
		axe.commons.aria.lookupTable.attributes = {};

		assert.isFalse(axe.commons.aria.validateAttr('cats'));
	});
});

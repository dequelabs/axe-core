describe('aria.requiredAttr', function() {
	'use strict';

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should returned the attributes property for the proper role', function() {
		axe.commons.aria.lookupTable.role = {
			cats: {
				attributes: {
					required: 'yes'
				}
			}
		};
		assert.equal(axe.commons.aria.requiredAttr('cats'), 'yes');
	});

	it('should return an empty array if there are no required attributes', function() {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.requiredAttr('cats');

		assert.deepEqual(result, []);
	});
});

describe('aria.allowedAttr', function() {
	'use strict';

	var orig;
	var origGlobals;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
		origGlobals = axe.commons.aria.lookupTable.globalAttributes;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
		axe.commons.aria.lookupTable.globalAttributes = origGlobals;
	});

	it('should returned the attributes property for the proper role', function() {
		axe.commons.aria.lookupTable.globalAttributes = ['world'];
		axe.commons.aria.lookupTable.role = {
			cats: {
				attributes: {
					allowed: ['hello']
				}
			}
		};

		assert.deepEqual(axe.commons.aria.allowedAttr('cats'), ['hello', 'world']);
	});

	it('should also check required attributes', function() {
		axe.commons.aria.lookupTable.globalAttributes = ['world'];
		axe.commons.aria.lookupTable.role = {
			cats: {
				attributes: {
					required: ['hello'],
					allowed: ['ok']
				}
			}
		};

		assert.deepEqual(axe.commons.aria.allowedAttr('cats'), [
			'ok',
			'world',
			'hello'
		]);
	});

	it('should return an array with globally allowed attributes', function() {
		axe.commons.aria.lookupTable.globalAttributes = ['world'];
		axe.commons.aria.lookupTable.role = {};

		assert.deepEqual(axe.commons.aria.allowedAttr('cats'), ['world']);
	});
});

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

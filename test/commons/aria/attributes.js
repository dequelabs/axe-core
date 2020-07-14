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

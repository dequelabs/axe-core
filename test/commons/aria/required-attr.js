describe('aria.requiredAttr', function() {
	'use strict';

	afterEach(function() {
		axe.reset();
	});

	it('should returned the attributes property for the proper role', function() {
		axe.configure({
			standards: {
				ariaRoles: {
					cats: {
						requiredAttrs: 'yes'
					}
				}
			}
		});

		assert.equal(axe.commons.aria.requiredAttr('cats'), 'yes');
	});

	it('should return an empty array if there are no required attributes', function() {
		var result = axe.commons.aria.requiredAttr('cats');

		assert.deepEqual(result, []);
	});
});

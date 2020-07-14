describe('aria.requiredContext', function() {
	'use strict';

	afterEach(function() {
		axe.reset();
	});

	it('should returned the context property for the proper role', function() {
		axe.configure({
			standards: {
				ariaRoles: {
					cats: {
						requiredContext: 'yes'
					}
				}
			}
		});
		assert.equal(axe.commons.aria.requiredContext('cats'), 'yes');
	});

	it('should return null if there are no required context nodes', function() {
		var result = axe.commons.aria.requiredContext('cats');

		assert.isNull(result);
	});
});

describe('aria.subclassImplicitNodes', function() {
	'use strict';

	var orig = axe.commons.aria.lookupTable.role;
	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return an array of implicit CSS selectors', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes',
				implicit: ['[class=trains]']
			}
		};

		var subclassRoles = axe.commons.aria.subclassImplicitNodes('planes');
		assert.deepEqual(subclassRoles, ['[class=trains]']);
	});

	it('should return CSS selectors for all subclass roles', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes',
				implicit: ['[class=trains]']
			},
			automobiles: {
				superclassRole: 'planes',
				implicit: ['[class=automobiles]']
			}
		};

		var subclassRoles = axe.commons.aria.subclassImplicitNodes('planes');
		assert.deepEqual(subclassRoles, ['[class=trains]', '[class=automobiles]']);
	});

	it("should not add roles that don't have implicit nodes", function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes'
			},
			automobiles: {
				superclassRole: 'planes',
				implicit: ['[class=automobiles]']
			}
		};

		var subclassRoles = axe.commons.aria.subclassImplicitNodes('planes');
		assert.deepEqual(subclassRoles, ['[class=automobiles]']);
	});

	it('should return null if the role does not have a subclass role', function() {
		axe.commons.aria.lookupTable.role = {
			planes: {}
		};

		var subclassRoles = axe.commons.aria.subclassImplicitNodes('planes');
		assert.isNull(subclassRoles);
	});
});

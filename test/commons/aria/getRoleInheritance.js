describe('aria.getRoleInheritance', function() {
	'use strict';

	var orig = axe.commons.aria.lookupTable.role;
	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return an array with the role if there is no inheritance', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {}
		};

		var subclassRoles = axe.commons.aria.getRoleInheritance('planes');
		assert.deepEqual(subclassRoles, ['planes']);
	});

	it('should return an array of role names that inherit from the role', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes'
			}
		};

		var subclassRoles = axe.commons.aria.getRoleInheritance('planes');
		assert.deepEqual(subclassRoles, ['planes', 'trains']);
	});

	it('should return all roles that inherit from the role', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes'
			},
			automobiles: {
				superclassRole: 'planes'
			}
		};

		var subclassRoles = axe.commons.aria.getRoleInheritance('planes');
		assert.deepEqual(subclassRoles, ['planes', 'trains', 'automobiles']);
	});

	it('should return roles that are grandchildren of the role', function() {
		axe.commons.aria.lookupTable.role = {
			trains: {
				superclassRole: 'planes'
			},
			automobiles: {
				superclassRole: 'trains'
			}
		};

		var subclassRoles = axe.commons.aria.getRoleInheritance('planes');
		assert.deepEqual(subclassRoles, ['planes', 'trains', 'automobiles']);
	});
});

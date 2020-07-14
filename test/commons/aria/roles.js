describe('aria.isValidRole', function() {
	'use strict';

	it('should return true if role is found in the lookup table', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			cats: true
		};
		assert.isTrue(axe.commons.aria.isValidRole('cats'));
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return false if role is not found in the lookup table', function() {
		assert.isFalse(axe.commons.aria.isValidRole('cats'));
	});

	it('returns false for abstract roles by default', function() {
		assert.isFalse(axe.commons.aria.isValidRole('input'));
	});

	it('returns true for abstract roles with { allowAbstract: true } ', function() {
		assert.isTrue(
			axe.commons.aria.isValidRole('input', { allowAbstract: true })
		);
	});
});

describe('aria.requiredOwned', function() {
	'use strict';

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should returned the owned property for the proper role', function() {
		axe.commons.aria.lookupTable.role = {
			cats: {
				owned: 'yes'
			}
		};
		assert.equal(axe.commons.aria.requiredOwned('cats'), 'yes');
	});

	it('should return null if there are no required owned nodes', function() {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.requiredOwned('cats');

		assert.isNull(result);
	});
});

describe('aria.requiredContext', function() {
	'use strict';

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should returned the context property for the proper role', function() {
		axe.commons.aria.lookupTable.role = {
			cats: {
				context: 'yes'
			}
		};
		assert.equal(axe.commons.aria.requiredContext('cats'), 'yes');
	});

	it('should return null if there are no required context nodes', function() {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.requiredContext('cats');

		assert.isNull(result);
	});
});

describe('aria.implicitNodes', function() {
	'use strict';

	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return the implicit property for the proper role', function() {
		axe.commons.aria.lookupTable.role = {
			cats: {
				implicit: 'yes'
			}
		};
		assert.equal(axe.commons.aria.implicitNodes('cats'), 'yes');
	});

	it('should return null if there are no implicit roles', function() {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.implicitNodes('cats');

		assert.isNull(result);
	});
});

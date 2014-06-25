
describe('aria.isValidRole', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = kslib.aria._lut.role;
		kslib.aria._lut.role = {
			'cats': true
		};
		assert.isTrue(kslib.aria.isValidRole('cats'));
		kslib.aria._lut.role = orig;

	});

	it('should return false if role is not found in the lut', function () {
		assert.isFalse(kslib.aria.isValidRole('cats'));

	});
});

describe('aria.getRoleType', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = kslib.aria._lut.role;
		kslib.aria._lut.role = {
			'cats': {
				type: 'stuff'
			}
		};
		assert.equal(kslib.aria.getRoleType('cats'), 'stuff');
		kslib.aria._lut.role = orig;

	});

	it('should return null if role is not found in the lut', function () {
		assert.isNull(kslib.aria.getRoleType('cats'));
	});
});

describe('aria.requiredOwned', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = kslib.aria._lut.role;
	});

	afterEach(function () {
		kslib.aria._lut.role = orig;
	});

	it('should returned the owned property for the proper role', function () {
		kslib.aria._lut.role = {
			'cats': {
				owned: 'yes'
			}
		};
		assert.equal(kslib.aria.requiredOwned('cats'), 'yes');

	});

	it('should return null if there are no required owned nodes', function () {
		kslib.aria._lut.role = {};
		var result = kslib.aria.requiredOwned('cats');

		assert.isNull(result);

	});
});

describe('aria.requiredContext', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = kslib.aria._lut.role;
	});

	afterEach(function () {
		kslib.aria._lut.role = orig;
	});

	it('should returned the context property for the proper role', function () {
		kslib.aria._lut.role = {
			'cats': {
				context: 'yes'
			}
		};
		assert.equal(kslib.aria.requiredContext('cats'), 'yes');

	});

	it('should return null if there are no required context nodes', function () {
		kslib.aria._lut.role = {};
		var result = kslib.aria.requiredContext('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitNodes', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = kslib.aria._lut.role;
	});

	afterEach(function () {
		kslib.aria._lut.role = orig;
	});

	it('should return the implicit property for the proper role', function () {
		kslib.aria._lut.role = {
			'cats': {
				implicit: 'yes'
			}
		};
		assert.equal(kslib.aria.implicitNodes('cats'), 'yes');

	});

	it('should return null if there are no implicit roles', function () {
		kslib.aria._lut.role = {};
		var result = kslib.aria.implicitNodes('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitRole', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var orig;
	beforeEach(function () {
		orig = kslib.aria._lut.role;
	});

	afterEach(function () {
		fixture.innerHTML = '';
		kslib.aria._lut.role = orig;
	});

	it('should find the first matching role', function () {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		kslib.aria._lut.role = {
			'cats': {
				implicit: ['div[id="cats"]']
			}
		};
		assert.equal(kslib.aria.implicitRole(node), 'cats');

	});

	it('should return null if there is no matching implicit role', function () {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		kslib.aria._lut.role = {};
		var result = kslib.aria.implicitRole(node);

		assert.isNull(result);

	});
});

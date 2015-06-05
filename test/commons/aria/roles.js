
describe('aria.isValidRole', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = commons.aria._lut.role;
		commons.aria._lut.role = {
			'cats': true
		};
		assert.isTrue(commons.aria.isValidRole('cats'));
		commons.aria._lut.role = orig;

	});

	it('should return false if role is not found in the lut', function () {
		assert.isFalse(commons.aria.isValidRole('cats'));

	});
});

describe('aria.getRolesWithNameFromContents', function () {
	'use strict';

	it('should return array if nameFrom contents is found in the lookup table', function () {
		var orig = commons.aria._lut.role;
		commons.aria._lut.role = {
			'dogs': {
				type: 'things',
				nameFrom: ['author', 'contents']
			},
			'cats': {
				type: 'stuff',
				nameFrom: ['author']
			}
		};
		assert.deepEqual(commons.aria.getRolesWithNameFromContents(), ['dogs']);
		commons.aria._lut.role = orig;

	});
});

describe('aria.getRolesByType', function () {
	'use strict';

	it('should return array if roletype is found in the lookup table', function () {
		var orig = commons.aria._lut.role;
		commons.aria._lut.role = {
			'dogs': {
				type: 'things'
			},
			'cats': {
				type: 'stuff'
			}
		};
		assert.deepEqual(commons.aria.getRolesByType('stuff'), ['cats']);
		commons.aria._lut.role = orig;

	});

	it('should return empty array if role is not found in the lut', function () {
		assert.deepEqual(commons.aria.getRolesByType('blahblahblah'), []);
	});
});

describe('aria.getRoleType', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = commons.aria._lut.role;
		commons.aria._lut.role = {
			'cats': {
				type: 'stuff'
			}
		};
		assert.equal(commons.aria.getRoleType('cats'), 'stuff');
		commons.aria._lut.role = orig;

	});

	it('should return null if role is not found in the lut', function () {
		assert.isNull(commons.aria.getRoleType('cats'));
	});
});

describe('aria.requiredOwned', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		commons.aria._lut.role = orig;
	});

	it('should returned the owned property for the proper role', function () {
		commons.aria._lut.role = {
			'cats': {
				owned: 'yes'
			}
		};
		assert.equal(commons.aria.requiredOwned('cats'), 'yes');

	});

	it('should return null if there are no required owned nodes', function () {
		commons.aria._lut.role = {};
		var result = commons.aria.requiredOwned('cats');

		assert.isNull(result);

	});
});

describe('aria.requiredContext', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		commons.aria._lut.role = orig;
	});

	it('should returned the context property for the proper role', function () {
		commons.aria._lut.role = {
			'cats': {
				context: 'yes'
			}
		};
		assert.equal(commons.aria.requiredContext('cats'), 'yes');

	});

	it('should return null if there are no required context nodes', function () {
		commons.aria._lut.role = {};
		var result = commons.aria.requiredContext('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitNodes', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		commons.aria._lut.role = orig;
	});

	it('should return the implicit property for the proper role', function () {
		commons.aria._lut.role = {
			'cats': {
				implicit: 'yes'
			}
		};
		assert.equal(commons.aria.implicitNodes('cats'), 'yes');

	});

	it('should return null if there are no implicit roles', function () {
		commons.aria._lut.role = {};
		var result = commons.aria.implicitNodes('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitRole', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var orig;
	beforeEach(function () {
		orig = commons.aria._lut.role;
	});

	afterEach(function () {
		fixture.innerHTML = '';
		commons.aria._lut.role = orig;
	});

	it('should find the first matching role', function () {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		commons.aria._lut.role = {
			'cats': {
				implicit: ['div[id="cats"]']
			}
		};
		assert.equal(commons.aria.implicitRole(node), 'cats');

	});

	it('should return null if there is no matching implicit role', function () {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		commons.aria._lut.role = {};
		var result = commons.aria.implicitRole(node);

		assert.isNull(result);

	});
});

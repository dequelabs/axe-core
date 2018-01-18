
describe('aria.isValidRole', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			'cats': true
		};
		assert.isTrue(axe.commons.aria.isValidRole('cats'));
		axe.commons.aria.lookupTable.role = orig;

	});

	it('should return false if role is not found in the lookup table', function () {
		assert.isFalse(axe.commons.aria.isValidRole('cats'));

	});
});

describe('aria.getRolesWithNameFromContents', function () {
	'use strict';

	it('should return array if nameFrom contents is found in the lookup table', function () {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			'dogs': {
				type: 'things',
				nameFrom: ['author', 'contents']
			},
			'cats': {
				type: 'stuff',
				nameFrom: ['author']
			}
		};
		assert.deepEqual(axe.commons.aria.getRolesWithNameFromContents(), ['dogs']);
		axe.commons.aria.lookupTable.role = orig;

	});
});

describe('aria.getRolesByType', function () {
	'use strict';

	it('should return array if roletype is found in the lookup table', function () {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			'dogs': {
				type: 'things'
			},
			'cats': {
				type: 'stuff'
			}
		};
		assert.deepEqual(axe.commons.aria.getRolesByType('stuff'), ['cats']);
		axe.commons.aria.lookupTable.role = orig;

	});

	it('should return empty array if role is not found in the lookup table', function () {
		assert.deepEqual(axe.commons.aria.getRolesByType('blahblahblah'), []);
	});
});

describe('aria.getRoleType', function () {
	'use strict';

	it('should return true if role is found in the lookup table', function () {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			'cats': {
				type: 'stuff'
			}
		};
		assert.equal(axe.commons.aria.getRoleType('cats'), 'stuff');
		axe.commons.aria.lookupTable.role = orig;

	});

	it('should return null if role is not found in the lookup table', function () {
		assert.isNull(axe.commons.aria.getRoleType('cats'));
	});
});

describe('aria.requiredOwned', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function () {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should returned the owned property for the proper role', function () {
		axe.commons.aria.lookupTable.role = {
			'cats': {
				owned: 'yes'
			}
		};
		assert.equal(axe.commons.aria.requiredOwned('cats'), 'yes');

	});

	it('should return null if there are no required owned nodes', function () {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.requiredOwned('cats');

		assert.isNull(result);

	});
});

describe('aria.requiredContext', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function () {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should returned the context property for the proper role', function () {
		axe.commons.aria.lookupTable.role = {
			'cats': {
				context: 'yes'
			}
		};
		assert.equal(axe.commons.aria.requiredContext('cats'), 'yes');

	});

	it('should return null if there are no required context nodes', function () {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.requiredContext('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitNodes', function () {
	'use strict';

	var orig;
	beforeEach(function () {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function () {
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return the implicit property for the proper role', function () {
		axe.commons.aria.lookupTable.role = {
			'cats': {
				implicit: 'yes'
			}
		};
		assert.equal(axe.commons.aria.implicitNodes('cats'), 'yes');

	});

	it('should return null if there are no implicit roles', function () {
		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.implicitNodes('cats');

		assert.isNull(result);

	});
});

describe('aria.implicitRole', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var orig;
	beforeEach(function () {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function () {
		fixture.innerHTML = '';
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should find the first optimal matching role', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-required', 'true');

		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {
			'cats': {
				implicit: ['div[id="cats"]']
			},
			'dogs': {
				implicit: ['div[id="cats"]']
			},
			'dinosaurs': {
				attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			}
		};

		assert.equal(axe.commons.aria.implicitRole(node), 'dinosaurs');
	});

	it('should find the first optimal matching role when multiple optimal matches are available', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-required', 'true');

		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {
			'cats': {
				implicit: ['div[id="cats"]']
			},
			'dogs': {
				 attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			},
			'dinosaurs': {
				attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			}
		};

		assert.equal(axe.commons.aria.implicitRole(node), 'dogs');
	});


	it('should return null if there is no matching implicit role', function () {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.implicitRole(node);

		assert.isNull(result);

	});
});

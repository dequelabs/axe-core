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

describe('aria.getRolesWithNameFromContents', function() {
	'use strict';

	it('should return array if nameFrom contents is found in the lookup table', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			dogs: {
				type: 'things',
				nameFrom: ['author', 'contents']
			},
			cats: {
				type: 'stuff',
				nameFrom: ['author']
			}
		};
		assert.deepEqual(axe.commons.aria.getRolesWithNameFromContents(), ['dogs']);
		axe.commons.aria.lookupTable.role = orig;
	});
});

describe('aria.getRolesByType', function() {
	'use strict';

	it('should return array if roletype is found in the lookup table', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			dogs: {
				type: 'things'
			},
			cats: {
				type: 'stuff'
			}
		};
		assert.deepEqual(axe.commons.aria.getRolesByType('stuff'), ['cats']);
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return empty array if role is not found in the lookup table', function() {
		assert.deepEqual(axe.commons.aria.getRolesByType('blahblahblah'), []);
	});
});

describe('aria.getRoleType', function() {
	'use strict';

	it('should return true if role is found in the lookup table', function() {
		var orig = axe.commons.aria.lookupTable.role;
		axe.commons.aria.lookupTable.role = {
			cats: {
				type: 'stuff'
			}
		};
		assert.equal(axe.commons.aria.getRoleType('cats'), 'stuff');
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should return null if role is not found in the lookup table', function() {
		assert.isNull(axe.commons.aria.getRoleType('cats'));
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

describe('aria.implicitRole', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var orig;
	beforeEach(function() {
		orig = axe.commons.aria.lookupTable.role;
	});

	afterEach(function() {
		fixture.innerHTML = '';
		axe.commons.aria.lookupTable.role = orig;
	});

	it('should find the first optimal matching role', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-required', 'true');

		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {
			cats: {
				implicit: ['div[id="cats"]']
			},
			dogs: {
				implicit: ['div[id="cats"]']
			},
			dinosaurs: {
				attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			}
		};

		assert.equal(axe.commons.aria.implicitRole(node), 'dinosaurs');
	});

	it('should find the first optimal matching role when multiple optimal matches are available', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-required', 'true');

		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {
			cats: {
				implicit: ['div[id="cats"]']
			},
			dogs: {
				attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			},
			dinosaurs: {
				attributes: {
					allowed: ['aria-required']
				},
				implicit: ['div[id="cats"]']
			}
		};

		assert.equal(axe.commons.aria.implicitRole(node), 'dogs');
	});

	it('should return null if there is no matching implicit role', function() {
		var node = document.createElement('div');
		node.id = 'cats';
		fixture.appendChild(node);

		axe.commons.aria.lookupTable.role = {};
		var result = axe.commons.aria.implicitRole(node);

		assert.isNull(result);
	});
});

describe('aria.isAriaRoleAllowedOnElement', function() {
	'use strict';

	it('should pass section with role alert', function() {
		var node = document.createElement('section');
		var role = 'alert';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should fail svg with role alertdialog', function() {
		var node = document.createElement('svg');
		var role = 'alertdialog';
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass object with role application', function() {
		var node = document.createElement('object');
		var role = 'application';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should fail a with role button', function() {
		var node = document.createElement('a');
		var role = 'button';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should fail article with role cell', function() {
		var node = document.createElement('article');
		var role = 'cell';
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass button with role checkbox', function() {
		var node = document.createElement('button');
		var role = 'checkbox';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass iframe with role document', function() {
		var node = document.createElement('iframe');
		var role = 'document';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass aside with role feed', function() {
		var node = document.createElement('aside');
		var role = 'feed';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass figure with role group', function() {
		var node = document.createElement('figure');
		var role = 'group';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass svg with role img', function() {
		var node = document.createElement('svg');
		var role = 'img';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass input with type image and role link', function() {
		var node = document.createElement('input');
		var role = 'link';
		node.setAttribute('role', role);
		node.setAttribute('type', 'image');
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass role none on header', function() {
		var node = document.createElement('header');
		var role = 'none';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass li with role option', function() {
		var node = document.createElement('li');
		var role = 'option';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass h1 with role tab', function() {
		var node = document.createElement('h1');
		var role = 'tab';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should pass ol with role tablist', function() {
		var node = document.createElement('ol');
		var role = 'tablist';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should return true when A has namespace as svg and role menuitem', function() {
		var node = document.createElement('a');
		node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		assert.isTrue(
			axe.commons.aria.isAriaRoleAllowedOnElement(node, 'menuitem')
		);
	});

	it('should return true when BUTTON has type menu and role as menuitem', function() {
		var node = document.createElement('button');
		var role = 'menuitem';
		node.setAttribute('type', 'menu');
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('should fail when MENU has type context and role navigation', function() {
		var node = document.createElement('menu');
		var role = 'navigation';
		node.setAttribute('type', 'context');
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});
});

describe('aria.getAriaUnAllowedRoles', function() {
	it('should fail input with role application', function() {
		var node = document.createElement('input');
		var role = 'application';
		node.setAttribute('type', '');
		node.setAttribute('aria-pressed', '');
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('should return true when INPUT type is checkbox and has aria-pressed attribute', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'checkbox');
		node.setAttribute('aria-pressed', '');
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isEmpty(actual);
	});

	it('should fail li with role menubar', function() {
		var node = document.createElement('li');
		var role = 'menubar';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isEmpty(actual);
	});

	it('should pass input with type button and role menuitemcheckbox', function() {
		var node = document.createElement('input');
		var role = 'menuitemcheckbox';
		node.setAttribute('role', role);
		node.setAttribute('type', 'button');
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isEmpty(actual);
	});

	it('should fail section with role option', function() {
		var node = document.createElement('section');
		var role = 'option';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('should pass input type radio with role menuitemradio', function() {
		var node = document.createElement('input');
		var role = 'menuitemradio';
		node.setAttribute('role', role);
		node.setAttribute('type', 'radio');
		var actual = axe.commons.aria.getAriaUnAllowedRoles(node);
		assert.isEmpty(actual);
	});
});

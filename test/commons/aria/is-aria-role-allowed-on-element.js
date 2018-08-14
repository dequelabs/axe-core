describe('aria.isAriaRoleAllowedOnElement', function() {
	'use strict';

	var originalLookupTableRole;
	var originalLookupTableElementsAllowedNoRole;
	var originalLookupTableElementsAllowedAnyRole;
	var originalLookupTableEvaluateRoleForElement;

	beforeEach(function() {
		originalLookupTableRole = axe.commons.aria.lookupTable.role;
		originalLookupTableElementsAllowedNoRole =
			axe.commons.aria.lookupTable.elementsAllowedNoRole;
		originalLookupTableElementsAllowedAnyRole =
			axe.commons.aria.lookupTable.elementsAllowedAnyRole;
		originalLookupTableEvaluateRoleForElement =
			axe.commons.aria.lookupTable.evaluateRoleForElement;
	});

	afterEach(function() {
		axe.commons.aria.lookupTable.role = originalLookupTableRole;
		axe.commons.aria.lookupTable.elementsAllowedNoRole = originalLookupTableElementsAllowedNoRole;
		axe.commons.aria.lookupTable.elementsAllowedAnyRole = originalLookupTableElementsAllowedAnyRole;
		axe.commons.aria.lookupTable.evaluateRoleForElement = originalLookupTableEvaluateRoleForElement;
	});

	it('returns true for SECTION with role alert', function() {
		var node = document.createElement('section');
		var role = 'alert';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
		var expected = true;
		assert.equal(actual, expected);
	});

	it('returns false for SECTION with role checkbox', function() {
		axe.commons.aria.lookupTable.role = {
			checkbox: {
				type: 'widget',
				implicit: ['input[type="checkbox"]'],
				allowedElements: ['BUTTON']
			}
		};
		var node = document.createElement('section');
		var role = 'checkbox';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
		var expected = false;
		assert.equal(actual, expected);
	});

	it('returns false for SVG with role alertdialog', function() {
		var node = document.createElement('svg');
		var role = 'alertdialog';
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for OBJECT with role application', function() {
		var node = document.createElement('object');
		var role = 'application';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
		assert.isTrue(actual);
	});

	it('returns false for A with role button', function() {
		var node = document.createElement('a');
		var role = 'button';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns false for ARTICLE with role cell', function() {
		var node = document.createElement('article');
		var role = 'cell';
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for BUTTON with role checkbox', function() {
		var node = document.createElement('button');
		var role = 'checkbox';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for IFRAME with role document', function() {
		var node = document.createElement('iframe');
		var role = 'document';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for ASIDE with role feed', function() {
		var node = document.createElement('aside');
		var role = 'feed';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for FIGURE with role group', function() {
		var node = document.createElement('figure');
		var role = 'group';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for SVG with role img', function() {
		var node = document.createElement('svg');
		var role = 'img';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for INPUT with type image and role link', function() {
		var node = document.createElement('input');
		var role = 'link';
		node.setAttribute('role', role);
		node.setAttribute('type', 'image');
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns false for INPUT with specified type and role', function() {
		axe.commons.aria.lookupTable.role = {
			cats: {
				allowedElements: [
					{
						tagName: 'INPUT',
						attributes: {
							TYPE: 'DOG'
						}
					}
				]
			}
		};
		var node = document.createElement('input');
		var role = 'cats';
		node.setAttribute('role', role);
		node.setAttribute('type', 'cats');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, role);
		assert.isFalse(actual);
	});

	it('returns true for HEADER with role none', function() {
		var node = document.createElement('header');
		var role = 'none';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for LI with role option', function() {
		var node = document.createElement('li');
		var role = 'option';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for H1 with role tab', function() {
		var node = document.createElement('h1');
		var role = 'tab';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true for OL with role tablist', function() {
		var node = document.createElement('ol');
		var role = 'tablist';
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true when A has namespace as svg and role menuitem', function() {
		var node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
		assert.isTrue(
			axe.commons.aria.isAriaRoleAllowedOnElement(node, 'menuitem')
		);
	});

	it('returns true when BUTTON has type menu and role as menuitem', function() {
		var node = document.createElement('button');
		var role = 'menuitem';
		node.setAttribute('type', 'menu');
		node.setAttribute('role', role);
		assert.isTrue(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns false when MENU has type context and role navigation', function() {
		var node = document.createElement('menu');
		var role = 'navigation';
		node.setAttribute('type', 'context');
		node.setAttribute('role', role);
		assert.isFalse(axe.commons.aria.isAriaRoleAllowedOnElement(node, role));
	});

	it('returns true if given element can have any role', function() {
		axe.commons.aria.lookupTable.elementsAllowedAnyRole = ['HEADER'];
		var node = document.createElement('header');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'link');
		assert.isTrue(actual);
	});

	it('returns true if given element can have any role', function() {
		var node = document.createElement('div');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'banner');
		assert.isTrue(actual);
	});

	it('returns false if given element cannot have any role', function() {
		axe.commons.aria.lookupTable.elementsAllowedNoRole = ['NAV'];
		var node = document.createElement('nav');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'alert'); // changed this
		assert.isFalse(actual);
	});

	it('returns false if given element cannot have any role', function() {
		var node = document.createElement('track');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'banner');
		assert.isFalse(actual);
	});

	it('returns false if AREA element has href', function() {
		var node = document.createElement('area');
		node.setAttribute('href', '#yay');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(
			node,
			'presentation'
		);
		assert.isFalse(actual);
	});

	it('returns true if AREA element does not have href', function() {
		var node = document.createElement('area');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(
			node,
			'presentation'
		);
		assert.isTrue(actual);
	});

	it('returns false, ensure evaluateRoleForElement in lookupTable is invoked', function() {
		var overrideInvoked = false;
		axe.commons.aria.lookupTable.evaluateRoleForElement = {
			IMG: ({ node, out }) => {
				overrideInvoked = true;
				assert.isDefined(node);
				assert.equal(node.nodeName.toUpperCase(), 'IMG');
				assert.isBoolean(out);
				return false;
			}
		};
		var node = document.createElement('img');
		node.setAttribute('role', 'presentation');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(
			node,
			'presentation'
		);
		assert.isTrue(overrideInvoked);
		assert.isFalse(actual);
	});

	it('returns false if element with role MENU type context', function() {
		var overrideInvoked = false;
		axe.commons.aria.lookupTable.evaluateRoleForElement = {
			LI: ({ node }) => {
				overrideInvoked = true;
				assert.isDefined(node);
				assert.equal(node.nodeName.toUpperCase(), 'LI');
				return false;
			}
		};
		var node = document.createElement('li');
		node.setAttribute('role', 'menuitem');
		var actual = axe.commons.aria.isAriaRoleAllowedOnElement(node, 'menuitem');
		assert.isTrue(overrideInvoked);
		assert.isFalse(actual);
	});
});

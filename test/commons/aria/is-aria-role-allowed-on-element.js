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

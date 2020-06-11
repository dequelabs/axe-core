describe('forms.isAriaTextbox', function() {
	'use strict';
	var isAriaTextbox = axe.commons.forms.isAriaTextbox;

	it('returns true for an element with role=textbox', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'textbox');
		axe.utils.getFlattenedTree(node);
		assert.isTrue(isAriaTextbox(node));
	});

	it('returns false for elements without role', function() {
		var node = document.createElement('div');
		axe.utils.getFlattenedTree(node);
		assert.isFalse(isAriaTextbox(node));
	});

	it('returns false for elements with incorrect role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'main');
		axe.utils.getFlattenedTree(node);
		assert.isFalse(isAriaTextbox(node));
	});

	it('returns false for native textbox inputs', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		axe.utils.getFlattenedTree(node);
		assert.isFalse(isAriaTextbox(node));
	});
});

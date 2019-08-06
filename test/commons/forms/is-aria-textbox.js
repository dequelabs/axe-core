describe('forms.isAriaTextbox', function() {
	'use strict';
	var isAriaTextbox = axe.commons.forms.isAriaTextbox;

	it('returns true for an element with role=textbox', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'textbox');
		assert.isTrue(isAriaTextbox(node));
	});

	it('returns false for elements without role', function() {
		var node = document.createElement('div');
		assert.isFalse(isAriaTextbox(node));
	});

	it('returns false for elements with incorrect role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'main');
		assert.isFalse(isAriaTextbox(node));
	});

	it('returns false for native textbox inputs', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		assert.isFalse(isAriaTextbox(node));
	});
});

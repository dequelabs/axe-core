describe('forms.isAriaListbox', function() {
	'use strict';
	var isAriaListbox = axe.commons.forms.isAriaListbox;

	it('returns true for an element with role=listbox', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'listbox');
		assert.isTrue(isAriaListbox(node));
	});

	it('returns false for elements without role', function() {
		var node = document.createElement('div');
		assert.isFalse(isAriaListbox(node));
	});

	it('returns false for elements with incorrect role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'main');
		assert.isFalse(isAriaListbox(node));
	});

	it('returns false for native select', function() {
		var node = document.createElement('select');
		assert.isFalse(isAriaListbox(node));
	});
});

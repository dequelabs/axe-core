describe('forms.isAriaCombobox', function() {
	'use strict';
	var isAriaCombobox = axe.commons.forms.isAriaCombobox;

	it('returns true for an element with role=combobox', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'combobox');
		axe.utils.getFlattenedTree(node);
		assert.isTrue(isAriaCombobox(node));
	});

	it('returns false for elements without role', function() {
		var node = document.createElement('div');
		axe.utils.getFlattenedTree(node);
		assert.isFalse(isAriaCombobox(node));
	});

	it('returns false for elements with incorrect role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'main');
		axe.utils.getFlattenedTree(node);
		assert.isFalse(isAriaCombobox(node));
	});
});

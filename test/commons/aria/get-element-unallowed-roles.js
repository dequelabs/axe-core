describe('aria.getElementUnallowedRoles', function() {
	it('returns false for INPUT with role application', function() {
		var node = document.createElement('input');
		var role = 'application';
		node.setAttribute('type', '');
		node.setAttribute('aria-pressed', '');
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('returns true for INPUT type is checkbox and has aria-pressed attribute', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'checkbox');
		node.setAttribute('aria-pressed', '');
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns false for LI with role menubar', function() {
		var node = document.createElement('li');
		var role = 'menubar';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns true for INPUT with type button and role menuitemcheckbox', function() {
		var node = document.createElement('input');
		var role = 'menuitemcheckbox';
		node.setAttribute('role', role);
		node.setAttribute('type', 'button');
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns false for SECTION with role option', function() {
		var node = document.createElement('section');
		var role = 'option';
		node.setAttribute('role', role);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('returns true for INPUT type radio with role menuitemradio', function() {
		var node = document.createElement('input');
		var role = 'menuitemradio';
		node.setAttribute('role', role);
		node.setAttribute('type', 'radio');
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});
});

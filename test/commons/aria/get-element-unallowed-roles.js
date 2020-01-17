describe('aria.getElementUnallowedRoles', function() {
	var fixture = document.getElementById('fixture');
	var flatTreeSetup = axe.testUtils.flatTreeSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false for INPUT with role application', function() {
		var node = document.createElement('input');
		var role = 'application';
		node.setAttribute('type', '');
		node.setAttribute('aria-pressed', '');
		node.setAttribute('role', role);
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('returns true for INPUT type is checkbox and has aria-pressed attribute', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'checkbox');
		node.setAttribute('aria-pressed', '');
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns false for LI with role menubar', function() {
		var node = document.createElement('li');
		var role = 'menubar';
		node.setAttribute('role', role);
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns true for INPUT with type button and role menuitemcheckbox', function() {
		var node = document.createElement('input');
		var role = 'menuitemcheckbox';
		node.setAttribute('role', role);
		node.setAttribute('type', 'button');
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns false for SECTION with role option', function() {
		var node = document.createElement('section');
		var role = 'option';
		node.setAttribute('role', role);
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isNotEmpty(actual);
		assert.include(actual, role);
	});

	it('returns true for INPUT type radio with role menuitemradio', function() {
		var node = document.createElement('input');
		var role = 'menuitemradio';
		node.setAttribute('role', role);
		node.setAttribute('type', 'radio');
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node);
		assert.isEmpty(actual);
	});

	it('returns false when role is implicit and allowImplicit is true (default)', function() {
		var node = document.createElement('input');
		var role = 'textbox';
		node.setAttribute('role', role);
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node, true);
		assert.isEmpty(actual);
	});

	it('returns false with implicit role of row for TR when allowImplicit is set to false via options', function() {
		var node = document.createElement('tr');
		node.setAttribute('role', 'row');
		fixture.appendChild(node);
		flatTreeSetup(fixture);
		var actual = axe.commons.aria.getElementUnallowedRoles(node, false);
		assert.isNotEmpty(actual);
		assert.include(actual, 'row');
	});
});

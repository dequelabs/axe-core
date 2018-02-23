describe('aria-required-children', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should detect missing sole required child', function () {
		var params = checkSetup('<div role="list" id="target"><p>Nothing here.</p></div>');

		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['listitem']);
	});

	(shadowSupported ? it : xit)
	('should detect missing sole required child in shadow tree', function () {
		fixture.innerHTML = '<div id="target" role="list"></div>';

		var target = document.querySelector('#target');
		var shadowRoot = target.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p>Nothing here.</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], target);

		var params = [target, undefined, virtualTarget];
		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['listitem']);
	});

	it('should detect multiple missing required children when one required', function () {
		var params = checkSetup('<div role="grid" id="target"><p>Nothing here.</p></div>');

		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
	});

	(shadowSupported ? it : xit)
	('should detect missing multiple required children in shadow tree when one required', function () {
		fixture.innerHTML = '<div role="grid" id="target"></div>';

		var target = document.querySelector('#target');
		var shadowRoot = target.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p>Nothing here.</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], target);

		var params = [target, undefined, virtualTarget];
		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
	});

	it('should detect multiple missing required children when all required', function () {
		var params = checkSetup('<div role="combobox" id="target" aria-expanded="true"><p>Nothing here.</p></div>');
		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['listbox', 'textbox']);
	});

	it('should detect single missing required child when all required', function () {
		var params = checkSetup('<div role="combobox" id="target" aria-expanded="true"><p role="listbox">Nothing here.</p></div>');
		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['textbox']);
	});

	it('should pass all existing required children when all required', function () {
		var params = checkSetup('<div role="combobox" id="target"><p role="listbox">Nothing here.</p><p role="textbox">Textbox</p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should pass all existing required children in shadow tree when all required', function () {
		fixture.innerHTML = '<div role="combobox" id="target"></div>';

		var target = document.querySelector('#target');
		var shadowRoot = target.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p role="listbox">Nothing here.</p><p role="textbox">Textbox</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], target);

		var params = [target, undefined, virtualTarget];
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a native "text" type input with role comboxbox when missing child is role textbox', function () {
		var params = checkSetup('<input type="text" role="combobox" aria-owns="listbox" id="target"><p role="listbox" id="listbox">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a native "search" type input with role comboxbox when missing child is role textbox', function () {
		var params = checkSetup('<input type="search" role="combobox" aria-owns="listbox1" id="target"><p role="listbox" id="listbox1">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a native "email" type input with role comboxbox when missing child is role textbox', function () {
		var params = checkSetup('<input type="email" role="combobox" aria-owns="listbox" id="target"><p role="listbox" id="listbox">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a native "url" type input with role comboxbox when missing child is role textbox', function () {
		var params = checkSetup('<input type="url" role="combobox" aria-owns="listbox" id="target"><p role="listbox" id="listbox">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a native "tel" type input with role comboxbox when missing child is role textbox', function () {
		var params = checkSetup('<input type="tel" role="combobox" aria-owns="listbox" id="target"><p role="listbox" id="listbox">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass a collapsed comboxbox when missing child is role listbox', function () {
		var params = checkSetup('<div role="combobox" id="target"><p role="textbox">Textbox</p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass one indirectly aria-owned child when one required', function () {
		var params = checkSetup('<div role="grid" id="target" aria-owns="r"></div><div id="r"><div role="row">Nothing here.</div></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should not break if aria-owns points to non-existent node', function () {
		var params = checkSetup('<div role="grid" id="target" aria-owns="nonexistent"></div>');
		assert.isFalse(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass one existing aria-owned child when one required', function () {
		var params = checkSetup('<div role="grid" id="target" aria-owns="r"></div><p id="r" role="row">Nothing here.</p>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass one existing required child when one required', function () {
		var params = checkSetup('<div role="grid" id="target"><p role="row">Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass one existing required child when one required because of implicit role', function () {
		var params = checkSetup('<table id="target"><p role="row">Nothing here.</p></table>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass when a child with an implicit role is present', function () {
		var params = checkSetup('<table role="grid" id="target"><tr><td>Nothing here.</td></tr></table>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass direct existing required children', function () {
		var params = checkSetup('<div role="list" id="target"><p role="listitem">Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should pass indirect required children', function () {
		var params = checkSetup('<div role="list" id="target"><p>Just a regular ol p that contains a... <p role="listitem">Nothing here.</p></p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

	it('should return true when a role has no required owned', function () {
		var params = checkSetup('<div role="listitem" id="target"><p>Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-children'].evaluate.apply(checkContext, params));
	});

});

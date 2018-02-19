describe('aria-required-parent', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var checkContext = axe.testUtils.MockCheckContext();
	var checkSetup = axe.testUtils.checkSetup;

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext.reset();
		axe._tree = undefined;
	});

	it('should detect missing required parent', function () {
		var params = checkSetup('<div><p role="listitem" id="target">Nothing here.</p></div>');
		assert.isFalse(checks['aria-required-parent'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['list']);
	});

	(shadowSupported ? it : xit)
	('should detect missing required parent across shadow boundary', function () {
		fixture.innerHTML = '<div id="target"></div>';

		var shadowRoot = document.querySelector('#target').attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var shadowContent = shadowRoot.querySelector('#target');
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

		var params = [shadowContent, undefined, virtualTarget];
		assert.isFalse(checks['aria-required-parent'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['list']);
	});

	it('should pass when required parent is present in an ancestral aria-owns context', function () {
		var snippet = '<div role="list"><div aria-owns="parent"></div></div>'+
			'<div id="parent"><p role="listitem" id="target">Nothing here.</p></div>';
		var params = checkSetup(snippet);
		assert.isTrue(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});

	it('should fail when wrong role is present in an aria-owns context', function () {
		var params = checkSetup(
			'<div role="menu"><div aria-owns="target"></div></div>' +
			'<div><p role="listitem" id="target">Nothing here.</p></div>'
		);
		assert.isFalse(checks['aria-required-parent'].evaluate.apply(checkContext, params));
		assert.deepEqual(checkContext._data, ['list']);
	});

	it('should pass when required parent is present in an aria-owns context', function () {
		var params = checkSetup('<div role="list" aria-owns="target"></div><div><p role="listitem" id="target">Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});

	it('should pass when at least one required parent of multiple is present', function () {
		var params = checkSetup('<div role="grid"><p role="row" id="target">Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});

	it('should pass when required parent is present', function () {
		var params = checkSetup('<div role="list"><p role="listitem" id="target">Nothing here.</p></div>');
		assert.isTrue(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should pass when required parent is present across shadow boundary', function () {
		fixture.innerHTML = '<div role="list" id="parent"></div>';

		var shadowRoot = document.querySelector('#parent').attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var shadowContent = shadowRoot.querySelector('#target');
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

		var params = [shadowContent, undefined, virtualTarget];
		assert.isTrue(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});

	(shadowSupported ? it : xit)
	('should fail when aria-owns context crosses shadow boundary', function () {
		fixture.innerHTML = '<div id="parent"><div role="list" aria-owns="target"></div></div>';

		var shadowRoot = document.querySelector('#parent').attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = '<p role="listitem" id="target">Nothing here.</p>';

		var tree = axe._tree = axe.utils.getFlattenedTree(fixture);
		var shadowContent = shadowRoot.querySelector('#target');
		var virtualTarget = axe.utils.getNodeFromTree(tree[0], shadowContent);

		var params = [shadowContent, undefined, virtualTarget];
		assert.isFalse(checks['aria-required-parent'].evaluate.apply(checkContext, params));
	});
});

describe('valid-scrollable-semantics', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should return false for role=banner', function() {
		var node = document.createElement('div');
		node.setAttribute('role', '"banner');
		fixture.appendChild(node);
		assert.isFalse(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return false for role=search', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'search');
		fixture.appendChild(node);
		assert.isFalse(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=form', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'form');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=navigation', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=complementary', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'complementary');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=contentinfo', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'contentinfo');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=main', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'main');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for role=region', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'region');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for nav elements', function() {
		var node = document.createElement('nav');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for section elements', function() {
		var node = document.createElement('section');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for article elements', function() {
		var node = document.createElement('article');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});

	it('should return true for aside elements', function() {
		var node = document.createElement('aside');
		fixture.appendChild(node);
		assert.isTrue(checks['valid-scrollable-semantics'].evaluate.call(checkContext, node));
	});
});

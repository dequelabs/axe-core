describe('aria-allowed-role', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should pass when A has namespace as svg', function() {
		var node = document.createElement('a');
		node.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass when BUTTON has type menu and role as menuitem', function() {
		var node = document.createElement('button');
		node.setAttribute('type', 'menu');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should fail when img has no alt', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass when input of type image and no role', function() {
		var node = document.createElement('img');
		node.setAttribute('type', 'image');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass when INPUT type is checkbox and has aria-pressed attribute', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'checkbox');
		node.setAttribute('aria-pressed', '');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should fail when MENU has type context', function() {
		var node = document.createElement('menu');
		node.setAttribute('type', 'context');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should fail when a role is set on an element that does not allow any role', function() {
		var node = document.createElement('dd');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass when a role is set on an element that can have any role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass an <a> without a href to have any role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass <a> with a empty href to have any valid role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'link');
		node.href = '';
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass <img> with a non-empty alt to have any role except `none` or `presentation`', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'banner');
		node.alt = 'some text';
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		node.setAttribute('role', 'none');
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		node.setAttribute('role', 'presentation');
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should not allow a <link> with a href to have any invalid role', function() {
		var node = document.createElement('link');
		node.setAttribute('role', 'invalid-role');
		node.href = '\\example.com';
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should allow <select> without a multiple and size attribute to have a menu role', function() {
		var node = document.createElement('select');
		node.setAttribute('role', 'menu');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should pass custom element <my-navbar> with a role of navigation', function() {
		var node = document.createElement('my-navbar');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		var actual = checks['aria-allowed-role'].evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});
});

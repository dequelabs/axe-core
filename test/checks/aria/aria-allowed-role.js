describe('aria-allowed-role', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('returns true if given element is an ignoredTag in options', function() {
		var node = document.createElement('article');
		node.setAttribute('role', 'presentation');
		var options = {
			ignoredTags: ['article']
		};
		var actual = checks['aria-allowed-role'].evaluate.call(
			checkContext,
			node,
			options
		);
		var expected = true;
		assert.equal(actual, expected);
		assert.isNull(checkContext._data, null);
	});

	it('returns false with implicit role of row for TR when allowImplicit is set to false via options', function() {
		var node = document.createElement('table');
		node.setAttribute('role', 'grid');
		var row = document.createElement('tr');
		row.setAttribute('role', 'row');
		var options = {
			allowImplicit: false
		};
		var actual = checks['aria-allowed-role'].evaluate.call(
			checkContext,
			row,
			options
		);
		var expected = false;
		assert.equal(actual, expected);
		assert.deepEqual(checkContext._data, ['row']);
	});

	it('returns true when A has namespace as svg', function() {
		var node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true when BUTTON has type menu and role as menuitem', function() {
		var node = document.createElement('button');
		node.setAttribute('type', 'menu');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns false when img has no alt', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, ['presentation']);
	});

	it('returns true when input of type image and no role', function() {
		var node = document.createElement('img');
		node.setAttribute('type', 'image');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		assert.isNull(checkContext._data, null);
	});

	it('returns true when INPUT type is checkbox and has aria-pressed attribute', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'checkbox');
		node.setAttribute('aria-pressed', '');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true when INPUT type is text with role combobox', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		node.setAttribute('role', 'combobox');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true when INPUT type is text with role spinbutton', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		node.setAttribute('role', 'spinbutton');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true when INPUT type is text with role searchbox', function() {
		var node = document.createElement('input');
		node.setAttribute('type', 'text');
		node.setAttribute('role', 'searchbox');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true when MENU has type context', function() {
		var node = document.createElement('menu');
		node.setAttribute('type', 'context');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, ['navigation']);
	});

	it('returns false when a role is set on an element that does not allow any role', function() {
		var node = document.createElement('dd');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, ['link']);
	});

	it('returns true when a role is set on an element that can have any role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true an <a> without a href to have any role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns true <a> with a empty href to have any valid role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'link');
		node.href = '';
		fixture.appendChild(node);
		var actual = checks['aria-allowed-role'].evaluate.call(checkContext, node);
		assert.isTrue(actual);
	});

	it('returns true <img> with a non-empty alt', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'banner');
		node.alt = 'some text';
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('returns false for <img> with a non-empty alt and role `presentation`', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'presentation');
		node.alt = 'some text';
		fixture.appendChild(node);
		assert.isFalse(
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
		assert.isNull(checkContext._data, null);
	});

	it('returns true custom element <my-navbar> with a role of navigation', function() {
		var node = document.createElement('my-navbar');
		node.setAttribute('role', 'navigation');
		fixture.appendChild(node);
		var actual = checks['aria-allowed-role'].evaluate.call(checkContext, node);
		assert.isTrue(actual);
		assert.isNull(checkContext._data, null);
	});
});

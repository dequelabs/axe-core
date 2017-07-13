describe('axe.utils.getSelector', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.getSelector);
	});

	it('should generate a unique CSS selector', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#fixture > div');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should still work if an element has nothing but whitespace as a className', function () {
		var node = document.createElement('div');
		node.className = '    ';
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#fixture > div');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters', function () {
		var node = document.createElement('div');
		node.id = 'monkeys#are.animals\\ok';
		fixture.appendChild(node);

		var result = document.querySelectorAll(axe.utils.getSelector(node));
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters in className', function () {
		var node = document.createElement('div');
		node.className = '.  bb-required';
		fixture.appendChild(node);

		var result = document.querySelectorAll(axe.utils.getSelector(node));
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should be able to fall back to positional selectors', function () {
		var node, expected;
		for (var i = 0; i < 10; i++) {
			node = document.createElement('div');
			fixture.appendChild(node);
			if (i === 5) {
				expected = node;
			}
		}

		var result = document.querySelectorAll(axe.utils.getSelector(expected));
		assert.lengthOf(result, 1);
		assert.equal(result[0], expected);
	});

	it('should stop on unique ID', function () {
		var node = document.createElement('div');
		node.id = 'monkeys';
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#monkeys');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should not use ids if they are not unique', function () {
		var node = document.createElement('div');
		node.id = 'monkeys';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.id = 'monkeys';
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#fixture > div:nth-child(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should use classes if available and unique', function () {
		var node = document.createElement('div');
		node.className = 'monkeys simian';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'dogs cats';
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#fixture > div.dogs.cats');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should default to tagName and position if classes are not unique', function () {
		var node = document.createElement('div');
		node.className = 'monkeys simian';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'monkeys simian';
		fixture.appendChild(node);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '#fixture > div:nth-child(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should work on the documentElement', function () {
		var sel = axe.utils.getSelector(document.documentElement);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.documentElement);
	});

	it('should work on the documentElement with classes', function () {
		var orig = document.documentElement.className;
		document.documentElement.className = 'stuff and other things';
		var sel = axe.utils.getSelector(document.documentElement);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.documentElement);
		document.documentElement.className = orig;
	});

	it('should work on the body', function () {
		var sel = axe.utils.getSelector(document.body);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.body);
	});

	it('should work on namespaced elements', function () {
		fixture.innerHTML = '<hx:include>Hello</hx:include>';
		var node = fixture.firstChild;
		var sel = axe.utils.getSelector(node);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('shouldn\'t fail if the node\'s parentNode doesnt have children, somehow (Firefox bug)', function () {
		var sel = axe.utils.getSelector({
			nodeName: 'a',
			classList: [],
			getAttribute: function () { },
			hasAttribute: function () { return false; },
			parentNode: {
				nodeName: 'b',
				getAttribute: function () { },
				hasAttribute: function () { return false; },
				classList: []
			}
		});
		assert.equal(sel, 'a');
	});

	it('should use role attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);

		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > div[role="menuitem"]'
		);
	});

	it('should use href and src attributes', function () {
		var link = document.createElement('a');
		link.setAttribute('href', '//deque.com/about/');
		fixture.appendChild(link);

		var img = document.createElement('img');
		img.setAttribute('src', '//deque.com/logo.png');
		fixture.appendChild(img);

		assert.equal(
			axe.utils.getSelector(link),
			'#fixture > a[href$="about/"]'
		);
		assert.equal(
			axe.utils.getSelector(img),
			'#fixture > img[src$="logo.png"]'
		);
	});

	it('should give use two features on the first element', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);

		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > div[role="menuitem"]'
		);
		
		node.className = 'dqpl-btn-primary';
		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > [role="menuitem"].dqpl-btn-primary'
		);
	});

	it('should give use one features on the subsequent elements', function () {
		var span = document.createElement('span');
		var node = document.createElement('div');
		node.setAttribute('role', 'menuitem');
		span.className = 'expand-icon';
		node.appendChild(span);
		fixture.appendChild(node);

		assert.equal(
			axe.utils.getSelector(span),
			'[role="menuitem"] > span.expand-icon'
		);
	});

	it('should prioritize uncommon tagNames', function () {
		var node = document.createElement('button');
		node.setAttribute('role', 'menuitem');
		node.className = 'dqpl-btn-primary';
		fixture.appendChild(node);
		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > button[role="menuitem"]'
		);
	});

	it('should add [type] to input elements', function () {
		var node = document.createElement('input');
		node.type = 'password';
		node.className = 'dqpl-textfield';
		fixture.appendChild(node);
		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > input[type="password"].dqpl-textfield'
		);
	});

	it('should use the name property', function () {
		var node = document.createElement('input');
		node.type = 'text';
		node.name = 'username';
		node.className = 'dqpl-textfield';
		fixture.appendChild(node);
		assert.equal(
			axe.utils.getSelector(node),
			'#fixture > input[type="text"][name="username"]'
		);
	});

});

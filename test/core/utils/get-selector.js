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

		assert.equal(sel, '#fixture > div:nth-of-type(2)');

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

		assert.equal(sel, '#fixture > .dogs.cats');

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

		assert.equal(sel, '#fixture > div:nth-of-type(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should properly calculate nth-of-type when siblings are of different type', function () {
		var node, target;
		node = document.createElement('span');
		fixture.appendChild(node);

		node = document.createElement('span');
		fixture.appendChild(node);

		node = document.createElement('div');
		fixture.appendChild(node);

		node = document.createElement('div');
		target = node;
		fixture.appendChild(node);

		node = document.createElement('div');
		fixture.appendChild(node);

		node = document.createElement('span');
		fixture.appendChild(node);



		var sel = axe.utils.getSelector(target);

		assert.equal(sel, '#fixture > div:nth-of-type(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], target);

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
			parentNode: {
				nodeName: 'b'
			}
		});
		assert.equal(sel, 'a');
	});
});

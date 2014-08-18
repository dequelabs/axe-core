describe('utils.getSelector', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(utils.getSelector);
	});

	it('should generate a unique CSS selector', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		var sel = utils.getSelector(node);

		assert.equal(sel, '#fixture > div');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters', function () {
		var node = document.createElement('div');
		node.id = 'monkeys#are.animals\\ok';
		fixture.appendChild(node);

		var result = document.querySelectorAll(utils.getSelector(node));
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters in className', function () {
		var node = document.createElement('div');
		node.className = '.  bb-required';
		fixture.appendChild(node);

		var result = document.querySelectorAll(utils.getSelector(node));
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

		var result = document.querySelectorAll(utils.getSelector(expected));
		assert.lengthOf(result, 1);
		assert.equal(result[0], expected);
	});

	it('should stop on unique ID', function () {
		var node = document.createElement('div');
		node.id = 'monkeys';
		fixture.appendChild(node);

		var sel = utils.getSelector(node);

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

		var sel = utils.getSelector(node);

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

		var sel = utils.getSelector(node);

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

		var sel = utils.getSelector(node);

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



		var sel = utils.getSelector(target);

		assert.equal(sel, '#fixture > div:nth-of-type(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], target);

	});

	it('should work on the documentElement', function () {
		var sel = utils.getSelector(document.documentElement);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.documentElement);
	});

	it('should work on the body', function () {
		var sel = utils.getSelector(document.body);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.body);
	});
});
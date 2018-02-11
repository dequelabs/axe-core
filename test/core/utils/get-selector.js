function createContentGetSelector() {
	'use strict';
	var group = document.createElement('div');
	group.innerHTML = '<label id="mylabel">Label</label><input id="myinput" aria-labelledby="mylabel" type="text" />';
	return group;
}

function makeShadowTreeGetSelector(node) {
	'use strict';
	var root = node.attachShadow({mode: 'open'});
	var div = document.createElement('div');
	div.className = 'parent';
	root.appendChild(div);
	div.appendChild(createContentGetSelector());
}

function makeNonunique(fixture) {
	'use strict';
	var nonUnique = '<div><div><div></div></div></div>';
	fixture.innerHTML = '<main>' +
		nonUnique + nonUnique + nonUnique +
		'<div><div></div></div>';
	var node = document.createElement('div');
	var parent = fixture.querySelector('div:nth-child(4) > div');
	parent.appendChild(node);
	return node;
}

function makeNonuniqueLongAttributes(fixture) {
	'use strict';
	var nonUnique = '<div><div><div></div></div></div>';
	fixture.innerHTML = '<main>' +
		nonUnique + nonUnique + nonUnique +
		'<div><div></div></div>';
	var node = document.createElement('div');
	node.setAttribute('data-att', 'ddfkjghlkdddfkjghlkdddfkjghlkdddfkjghlkd');
	var parent = fixture.querySelector('div:nth-child(4) > div');
	parent.appendChild(node);
	return node;
}


describe('axe.utils.getSelector', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupported = axe.testUtils.shadowSupport.v1;

	afterEach(function () {
		fixture.innerHTML = '';
		axe._tree = undefined;
		axe._selectorData = undefined;
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.getSelector);
	});

	it('should generate a unique CSS selector', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should still work if an element has nothing but whitespace as a className', function () {
		var node = document.createElement('div');
		node.className = '    ';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters in IDs', function () {
		var node = document.createElement('div');
		node.id = 'monkeys#are.animals\\ok';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var result = document.querySelectorAll(axe.utils.getSelector(node));
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should handle special characters in classNames', function () {
		var node = document.createElement('div');
		node.className = '.  bb-required';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

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
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var result = document.querySelectorAll(axe.utils.getSelector(expected));
		assert.lengthOf(result, 1);
		assert.equal(result[0], expected);
	});

	it('should use a unique ID', function () {
		var node = document.createElement('div');
		node.id = 'monkeys';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

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
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.notInclude(sel, '#monkeys');
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
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '.dogs');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use classes if more unique than the tag', function () {
		var node = document.createElement('p');
		node.className = 'monkeys simian cats';
		fixture.appendChild(node);

		node = document.createElement('p');
		node.className = 'dogs cats';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '.dogs');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should NOT use classes if they are more common than the tag', function () {
		var node = document.createElement('p');
		node.className = 'dogs cats';
		fixture.appendChild(node);

		node = document.createElement('p');
		node.className = 'dogs cats';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.isTrue(sel.indexOf('.dogs') === -1);
		assert.isTrue(sel.indexOf('p') === 0);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use the most unique class', function () {
		var node = document.createElement('div');
		node.className = 'dogs';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'dogs cats';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '.cats');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use the most unique class and not the unique attribute', function () {
		var node = document.createElement('div');
		node.className = 'dogs';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'dogs cats';
		node.setAttribute('data-axe', 'hello');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '.cats');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use only a single unique attribute', function () {
		var node = document.createElement('div');
		node.setAttribute('data-thing', 'hello');
		fixture.appendChild(node);

		node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, 'div[data-axe="hello"]');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use three uncommon but not unique features', function () {
		var node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.className = 'thing';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.className = 'thing';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);
		var clsIndex = sel.indexOf('.thing');
		var attIndex = Math.min(sel.indexOf('[data-axe="hello"]'),
			sel.indexOf('[data-thing="hello"]'));

		assert.isTrue(clsIndex !== -1);
		assert.isTrue(sel.indexOf('[data-axe="hello"]') !== -1);
		assert.isTrue(sel.indexOf('[data-thing="hello"]') !== -1);

		assert.isTrue(clsIndex < attIndex, 'classes first');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should use only three uncommon but not unique features', function () {
		var node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.setAttribute('data-thang', 'hello');
		node.className = 'thing thang';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.setAttribute('data-thang', 'hello');
		node.className = 'thing thang';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);
		var parts = sel.split('.');
		parts = parts.reduce(function (val, item) {
			var its = item.split('[');
			return val.concat(its);
		}, []).filter(function (item) {
			return item !== '';
		});
		assert.equal(parts.length, 3);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should use only three uncommon but not unique classes', function () {
		var node = document.createElement('div');
		node.className = 'thing thang thug thick';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'thing thang thug thick';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);
		var parts = sel.split('.');
		parts = parts.reduce(function (val, item) {
			var its = item.split('[');
			return val.concat(its);
		}, []).filter(function (item) {
			return item !== '';
		});
		assert.equal(parts.length, 3);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should use only three uncommon but not unique attributes', function () {
		var node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thug', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.setAttribute('data-thang', 'hello');
		fixture.appendChild(node);

		node = document.createElement('div');
		node.setAttribute('data-axe', 'hello');
		node.setAttribute('data-thing', 'hello');
		node.setAttribute('data-thang', 'hello');
		node.setAttribute('data-thug', 'hello');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);
		var parts = sel.split('.');
		parts = parts.reduce(function (val, item) {
			var its = item.split('[');
			return val.concat(its);
		}, []).filter(function (item) {
			return item !== '';
		});
		assert.equal(parts.length, 4);

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should not use long attributes', function () {
		var node = makeNonuniqueLongAttributes(fixture);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node, {});
		assert.isTrue(sel.indexOf('data-att') === -1);
	});

	it('should use :root when not unique html element', function () {
		// todo
		var node = document.createElement('html');
		node.setAttribute('lang', 'en');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(document.documentElement, {});
		assert.equal(sel, ':root');
	});

	it('should use position if classes are not unique', function () {
		var node = document.createElement('div');
		node.className = 'monkeys simian';
		fixture.appendChild(node);

		node = document.createElement('div');
		node.className = 'monkeys simian';
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);

		assert.equal(sel, '.monkeys.simian:nth-child(2)');

		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);

	});

	it('should work on the documentElement', function () {
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(document.documentElement);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.documentElement);
	});

	it('should work on the documentElement with classes', function () {
		var orig = document.documentElement.className;
		document.documentElement.className = 'stuff and other things';
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(document.documentElement);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.documentElement);
		document.documentElement.className = orig;
	});

	it('should work on the body', function () {
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(document.body);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], document.body);
	});

	it('should work on namespaced elements', function () {
		fixture.innerHTML = '<hx:include>Hello</hx:include>';
		var node = fixture.firstChild;
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should work on complex namespaced elements', function () {
		fixture.innerHTML = '<m:math xmlns:m="http://www.w3.org/1998/Math/MathML">' +
		  '<m:mi>x</m:mi>' +
		  '<m:annotation-xml encoding="MathML-Content">' +
		    '<m:ci>x</m:ci>' +
		  '</m:annotation-xml>' +
		'</m:math>';
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var node = fixture.querySelector('m\\:ci');
		var sel = axe.utils.getSelector(node);
		var result = document.querySelectorAll(sel);
		assert.lengthOf(result, 1);
		assert.equal(result[0], node);
	});

	it('should not use ignored attributes', function () {
		var node = document.createElement('div');
		var ignoredAttributes = [
				'style',
				'selected', 'checked',
				'disabled', 'tabindex',
				'aria-checked', 'aria-selected',
				'aria-invalid', 'aria-activedescendant',
				'aria-busy', 'aria-disabled', 'aria-expanded',
				'aria-grabbed', 'aria-pressed', 'aria-valuenow'
				];
		ignoredAttributes.forEach(function (att) {
			node.setAttribute(att, 'true');
		});
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		assert.isTrue(
			axe.utils.getSelector(node).indexOf('[') === -1
		);
	});

	it('should use href and src attributes, shortened', function () {
		var link = document.createElement('a');
		link.setAttribute('href', '//deque.com/thang/');
		fixture.appendChild(link);
		link = document.createElement('a');
		link.setAttribute('href', '//deque.com/about/');
		fixture.appendChild(link);

		var img = document.createElement('img');
		img.setAttribute('src', '//deque.com/thang.png');
		fixture.appendChild(img);
		img = document.createElement('img');
		img.setAttribute('src', '//deque.com/logo.png');
		fixture.appendChild(img);

		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		assert.equal(
			axe.utils.getSelector(link),
			'a[href$="about/"]'
		);
		assert.equal(
			axe.utils.getSelector(img),
			'img[src$="logo.png"]'
		);
	});

	it('should not generate universal selectors', function () {
		var node = document.createElement('div');
		node.setAttribute('role', 'menuitem');
		fixture.appendChild(node);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		assert.equal(
			axe.utils.getSelector(node),
			'div[role="menuitem"]'
		);
	});

	it('no options: should work with shadow DOM', function () {
		var shadEl;

		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div></div>';
			makeShadowTreeGetSelector(fixture.firstChild);
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);

			shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
			assert.deepEqual(axe.utils.getSelector(shadEl), [
				'#fixture > div',
				'#myinput'
			]);
		}
	});
	it('toRoot: should work with shadow DOM', function () {
		var shadEl;

		if (shadowSupported) {
			// shadow DOM v1 - note: v0 is compatible with this code, so no need
			// to specifically test this
			fixture.innerHTML = '<div></div>';
			makeShadowTreeGetSelector(fixture.firstChild);
			axe._tree = axe.utils.getFlattenedTree(document.documentElement);

			shadEl = fixture.firstChild.shadowRoot.querySelector('input#myinput');
			assert.deepEqual(axe.utils.getSelector(shadEl, { toRoot: true }), [
				'html > body > #fixture > div',
				'.parent > div > #myinput'
			]);
		}
	});

	it('should correctly calculate unique selector when no discernable features', function () {
		var node = makeNonunique(fixture);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var sel = axe.utils.getSelector(node, {});
		var mine = document.querySelector(sel);
		assert.isTrue(mine === node);
	});

	it('should not traverse further up than required when no discernable features', function () {
		var node = makeNonunique(fixture);
		axe._tree = axe.utils.getFlattenedTree(document.documentElement);

		var top = fixture.querySelector('div:nth-child(4)');
		var sel = axe.utils.getSelector(node, {});
		sel = sel.substring(0, sel.indexOf(' >'));
		var test = document.querySelector(sel);
		assert.isTrue(test === top);
	});

});

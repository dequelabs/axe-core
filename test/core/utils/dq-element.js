/*global DqElement */
describe('DqElement', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should be a function', function () {
		assert.isFunction(DqElement);
	});

	it('should be exposed to utils', function () {
		assert.equal(axe.utils.DqElement, DqElement);
	});

	it('should take a node as a parameter and return an object', function () {
		var node = document.createElement('div');
		var result = new DqElement(node);

		assert.isObject(result);
	});
	describe('element', function () {
		it('should store reference to the element', function () {
			var div = document.createElement('div');
			var dqEl = new DqElement(div);
			assert.equal(dqEl.element, div);
		});

		it('should not be present in stringified version', function () {
			var div = document.createElement('div');
			var dqEl = new DqElement(div);

			assert.isUndefined(JSON.parse(JSON.stringify(dqEl)).element);
		});
	});

	describe('source', function () {
		it('should include the outerHTML of the element', function () {
			fixture.innerHTML = '<div class="bar" id="foo">Hello!</div>';

			var result = new DqElement(fixture.firstChild);
			assert.equal(result.source, fixture.firstChild.outerHTML);
		});

		it('should work with SVG elements', function () {
			fixture.innerHTML = '<svg aria-label="foo"></svg>';

			var result = new DqElement(fixture.firstChild);
			assert.isString(result.source);
		});
		it('should work with MathML', function () {
			fixture.innerHTML = '<math display="block"><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow></math>';

			var result = new DqElement(fixture.firstChild);
			assert.isString(result.source);
		});

		it('should truncate large elements', function () {
			var div = '<div class="foo" id="foo">';
			for (var i = 0; i < 300; i++) {
				div += i;
			}
			div += '</div>';
			fixture.innerHTML = div;

			var result = new DqElement(fixture.firstChild);
			assert.equal(result.source.length, '<div class="foo" id="foo">'.length);
		});

		it('should use spec object over passed element', function () {
			fixture.innerHTML = '<div id="foo" class="bar">Hello!</div>';
			var result = new DqElement(fixture.firstChild, {
				source: 'woot'
			});
			assert.equal(result.source, 'woot');
		});
	});

	describe('selector', function () {

		it('should call axe.utils.getSelector', function () {
			var orig = axe.utils.getSelector;
			var success = false;
			var expected = { monkeys: 'bananas' };

			axe.utils.getSelector = function (p) {
				success = true;
				assert.equal(fixture, p);
				return expected;
			};

			var result = new DqElement(fixture);
			assert.deepEqual(result.selector, [expected]);
			axe.utils.getSelector = orig;

		});

		it('should prefer selector from spec object', function () {
			fixture.innerHTML = '<div id="foo" class="bar">Hello!</div>';
			var result = new DqElement(fixture.firstChild, {
				selector: 'woot'
			});
			assert.equal(result.selector, 'woot');
		});

	});

	describe('xpath', function () {
		it('should call axe.utils.getXpath', function () {
			var orig = axe.utils.getXpath;
			var success = false;
			var expected = { monkeys: 'bananas' };

			axe.utils.getXpath = function (p) {
				success = true;
				assert.equal(fixture, p);
				return expected;
			};
			var result = new DqElement(fixture);
			assert.deepEqual(result.xpath, [expected]);
			axe.utils.getXpath = orig;
		});

		it('should prefer selector from spec object', function () {
			fixture.innerHTML = '<div id="foo" class="bar">Hello!</div>';
			var result = new DqElement(fixture.firstChild, {
				xpath: 'woot'
			});
			assert.equal(result.xpath, 'woot');
		});

	});

	describe('toJSON', function () {
		it('should only stringify selector and source', function () {
			var expected = {
				selector: 'foo > bar > joe',
				source: '<joe aria-required="true">',
				xpath: '/foo/bar/joe'
			};
			var result = new DqElement('joe', expected);

			assert.deepEqual(JSON.stringify(result), JSON.stringify(expected));
		});
	});
});

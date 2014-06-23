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

		it('should not be writable', function () {
			var div = document.createElement('div');
			var dqEl = new DqElement(div);
			assert.throws(function () {
				dqEl.element = null;
			}, TypeError);
		});
	});

	describe('selector', function () {

		it('should call utils.getSelector', function () {
			var orig = utils.getSelector;
			var success = false;
			var expected = { monkeys: 'bananas' };

			utils.getSelector = function (p) {
				success = true;
				assert.equal(fixture, p);
				return expected;
			};

			var result = new DqElement(fixture);
			assert.equal(result.selector, expected);
			utils.getSelector = orig;

		});

	});
	describe('frames', function () {
		it('should be an empty array', function () {
			var node = document.createElement('div');
			var result = new DqElement(node);

			assert.deepEqual(result.frames, []);

		});
	});
});
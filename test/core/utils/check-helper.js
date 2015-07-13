/*global DqElement */
describe('utils.checkHelper', function () {
	'use strict';

	function noop() {}

	it('should be a function', function () {
		assert.isFunction(utils.checkHelper);
	});

	it('should accept 2 named parameters', function () {
		assert.lengthOf(utils.checkHelper, 2);
	});

	it('should return an object', function () {
		assert.isObject(utils.checkHelper());
	});

	describe('return value', function () {
		describe('async', function () {
			it('should set isAsync property on returned object to `true` when called', function () {
				var target = {},
					helper = utils.checkHelper(target, noop);

				helper.async();
				assert.isTrue(helper.isAsync);
			});
			it('should call the second parameter of `utils.checkHelper` when invoked', function () {
				function fn() { success = true; }
				var success = false,
					helper = utils.checkHelper({}, fn);

				var done = helper.async();
				done();

				assert.isTrue(success);
			});
		});
		describe('data', function () {
			it('should set data property on target when called', function () {
				var target = {},
					expected = { monkeys: 'bananas' },
					helper = utils.checkHelper(target, noop);

				assert.notProperty(target, 'data');
				helper.data(expected);
				assert.equal(target.data, expected);

			});
		});
		describe('relatedNodes', function () {
			var fixture = document.getElementById('fixture');
			afterEach(function () {
				fixture.innerHTML = '';
			});
			it('should accept NodeList', function () {
				fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
					var target = {},
						helper = utils.checkHelper(target, noop);
					helper.relatedNodes(fixture.children);
					assert.lengthOf(target.relatedNodes, 2);
					assert.instanceOf(target.relatedNodes[0], DqElement);
					assert.instanceOf(target.relatedNodes[1], DqElement);
					assert.equal(target.relatedNodes[0].element, fixture.children[0]);
					assert.equal(target.relatedNodes[1].element, fixture.children[1]);
			});
			it('should accept a single Node', function () {
				fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
					var target = {},
						helper = utils.checkHelper(target, noop);
					helper.relatedNodes(fixture.firstChild);
					assert.lengthOf(target.relatedNodes, 1);
					assert.instanceOf(target.relatedNodes[0], DqElement);
					assert.equal(target.relatedNodes[0].element, fixture.firstChild);
			});
			it('should accept an Array', function () {
				fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
					var target = {},
						helper = utils.checkHelper(target, noop);
					helper.relatedNodes(Array.prototype.slice.call(fixture.children));
					assert.lengthOf(target.relatedNodes, 2);
					assert.instanceOf(target.relatedNodes[0], DqElement);
					assert.instanceOf(target.relatedNodes[1], DqElement);
					assert.equal(target.relatedNodes[0].element, fixture.children[0]);
					assert.equal(target.relatedNodes[1].element, fixture.children[1]);
			});
			it('should accept an array-like Object', function () {
				fixture.innerHTML = '<div id="t1"></div><div id="t2"></div>';
					var target = {},
						helper = utils.checkHelper(target, noop);
					var nodes = {
						0: fixture.children[0],
						1: fixture.children[1],
						length: 2
					};
					helper.relatedNodes(nodes);
					assert.lengthOf(target.relatedNodes, 2);
					assert.instanceOf(target.relatedNodes[0], DqElement);
					assert.instanceOf(target.relatedNodes[1], DqElement);
					assert.equal(target.relatedNodes[0].element, fixture.children[0]);
					assert.equal(target.relatedNodes[1].element, fixture.children[1]);
			});
		});

	});

});

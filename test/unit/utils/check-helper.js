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
			it('should set relatedNodes property on target when called and pass each node into DqNode', function () {
				var orig = window.DqNode;
				var success = false;
				window.DqNode = function (n) {
					assert.equal(n, expected[0]);
					success = true;
					return n;
				};
				var target = {},
					expected = [{monkeys: 'bananas' }],
					helper = utils.checkHelper(target, noop);

				assert.notProperty(target, 'relatedNodes');
				helper.relatedNodes(expected);
				assert.deepEqual(target.relatedNodes, expected);
				assert.isTrue(success);

				window.DqNode = orig;
			});
			it('should cast the object to an array', function () {
				var orig = window.DqNode;
				window.DqNode = function (n) {
					return n;
				};
				var target = {},
					expected = [{monkeys: 'bananas' }],
					helper = utils.checkHelper(target, noop);

				helper.relatedNodes(expected[0]);
				assert.isArray(target.relatedNodes);
				assert.deepEqual(target.relatedNodes, expected);

				window.DqNode = orig;
			});
		});

	});

});
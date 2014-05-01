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
			it('should set async property on target to `true` when called', function () {
				var target = {},
					helper = utils.checkHelper(target, noop);

				assert.notProperty(target, 'async');
				helper.async();
				assert.isTrue(target.async);
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

	});

});
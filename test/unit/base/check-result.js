/*global CheckResult */
describe('CheckResult', function () {
	'use strict';

	it('should be a function', function () {
		assert.isFunction(CheckResult);
	});

	it('should have an id', function () {
		var result = new CheckResult({id: 'monkeys'});
		assert.equal(result.id, 'monkeys');
	});

	it('should default `result` to `PASS`', function () {
		var result = new CheckResult({});
		assert.equal(result.result, 'PASS');
	});

	it('should set `data` to `null`', function () {
		var result = new CheckResult({});
		assert.isNull(result.data);
	});

	it('should set `async` to `false`', function () {
		var result = new CheckResult({});
		assert.isFalse(result.async);
	});

	it('should set `relatedNodes` to `[]`', function () {
		var result = new CheckResult({});
		assert.deepEqual(result.relatedNodes, []);
	});

});
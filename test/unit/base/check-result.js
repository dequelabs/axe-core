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

	it('should default `type` to `PASS`', function () {
		var result = new CheckResult({});
		assert.equal(result.type, 'PASS');
	});

	it('should set `data` to `null`', function () {
		var result = new CheckResult({});
		assert.isNull(result.data);
	});

	it('should set `async` to `false`', function () {
		var result = new CheckResult({});
		assert.isFalse(result.async);
	});

	it('should inherit certainty from check', function () {
		var result = new CheckResult({certainty: 'monkeys'});
		assert.equal(result.certainty, 'monkeys');
	});
	it('should inherit interpretation from check', function () {
		var result = new CheckResult({interpretation: 'monkeys'});
		assert.equal(result.interpretation, 'monkeys');
	});

});
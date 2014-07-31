
describe('utils.publishMetaData', function () {
	'use strict';

	afterEach(function () {
		dqre.audit = null;
	});

	it('should be a function', function () {
		assert.isFunction(utils.publishMetaData);
	});

	it('should pull data from rules from dqreConfiguration.data', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		dqre.configure({
			rules: [],
			data: {
				rules: {
					cats: expected
				}
			}
		});

		var result = {
			id: 'cats',
			details: []
		};
		utils.publishMetaData(result);

		assert.equal(result.foo, expected.foo);
		assert.equal(result.bob, expected.bob);
	});

	it('should pull data from checks from dqreConfiguration.data', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		dqre.configure({
			rules: [],
			data: {
				checks: {
					cats: expected
				}
			}
		});

		var result = {
			id: 'foo',
			details: [{
				checks: [{
					id: 'cats'
				}]
			}]
		};
		utils.publishMetaData(result);
		assert.equal(result.details[0].checks[0].foo, expected.foo);
		assert.equal(result.details[0].checks[0].bar, expected.bar);
	});


	it('should execute failureMessage', function () {

		dqre.configure({
			rules: [],
			data: {
				rules: {
					cats: {
						help: function () {
							return 'cats-rule';
						}
					}
				},
				checks: {
					'cats-FAIL': {
						failureMessage: function () {
							return 'cats-check';
						}
					},
					'cats-PASS': {
						failureMessage: function () {
							throw new Error('should not execute');
						}
					}
				}
			}
		});

		var result = {
			id: 'cats',
			details: [{
				checks: [{
					result: true,
					type: 'PASS',
					id: 'cats-PASS'
				}, {
					result: true,
					type: 'FAIL',
					id: 'cats-FAIL'
				}]
			}]
		};
		utils.publishMetaData(result);
		assert.deepEqual(result, {
			id: 'cats',
			help: 'cats-rule',
			details: [{
				checks: [{
					result: true,
					type: 'PASS',
					id: 'cats-PASS',
					failureMessage: null
				}, {
					result: true,
					type: 'FAIL',
					id: 'cats-FAIL',
					failureMessage: 'cats-check'
				}]
			}]
		});

	});

});

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
						failureMessage: function () {
							return 'cats-rule';
						}
					}
				},
				checks: {
					cats: {
						failureMessage: function () {
							return 'cats-check';
						}
					}
				}
			}
		});

		var result = {
			id: 'cats',
			details: [{
				checks: [{
					id: 'cats'
				}]
			}]
		};
		utils.publishMetaData(result);
		assert.deepEqual(result, {
			id: 'cats',
			failureMessage: 'cats-rule',
			details: [{
				checks: [{
					id: 'cats',
					failureMessage: 'cats-check'
				}]
			}]
		});

	});

});
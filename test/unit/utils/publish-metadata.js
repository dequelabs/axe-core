/*global dqreConfiguration */

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
			nodes: []
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
			nodes: [{
				any: [{
					id: 'cats'
				}],
				all: [],
				none: []
			}]
		};
		utils.publishMetaData(result);
		assert.equal(result.nodes[0].any[0].foo, expected.foo);
		assert.equal(result.nodes[0].any[0].bar, expected.bar);
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
			nodes: [{
				any: [{
					result: true,
					id: 'cats-PASS'
				}],
				none: [{
					result: true,
					id: 'cats-FAIL'
				}],
				all: []
			}]
		};
		utils.publishMetaData(result);
		assert.deepEqual(result, {
			id: 'cats',
			help: 'cats-rule',
			nodes: [{
				any: [{
					result: true,
					id: 'cats-PASS',
					failureMessage: null
				}],
				none: [{
					result: true,
					id: 'cats-FAIL',
					failureMessage: 'cats-check'
				}],
				all: []
			}]
		});

	});


	it('should not modify base configuration', function () {
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
					0: {
						failureMessage: function () {
							return 'cats-check';
						}
					},
					1: {
						failureMessage: function () {
							return 'cats-check2';
						}
					}
				}
			}
		});
		utils.publishMetaData({
			id: 'cats',
			nodes: [{
				any: [{
					result: false,
					type: 'PASS',
					id: 'cats-PASS'
				}],
				none: [{
					result: true,
					type: 'FAIL',
					id: 'cats-FAIL'
				}],
				all: []
			}]
		});

		assert.isNotNull(dqreConfiguration.data.checks[0].failureMessage);
		assert.isNotNull(dqreConfiguration.data.checks[1].failureMessage);

	});

	it('should pull tags off rule object', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		dqre.configure({
			rules: [{
				id: 'foo',
				tags: ['hai']
			}],
			data: {
				checks: {
					cats: expected
				}
			}
		});

		var result = {
			id: 'foo',
			nodes: [{
				any: [{
					id: 'cats'
				}],
				all: [],
				none: []
			}]
		};
		utils.publishMetaData(result);
		assert.deepEqual(result.tags, ['hai']);

	});

});

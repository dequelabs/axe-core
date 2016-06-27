describe('axe.utils.publishMetaData', function () {
	'use strict';

	afterEach(function () {
		axe._audit = null;
	});

	it('should be a function', function () {
		assert.isFunction(axe.utils.publishMetaData);
	});

	it('should pull data from rules from axe._audit.data', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		axe._load({
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
		axe.utils.publishMetaData(result);

		assert.equal(result.foo, expected.foo);
		assert.equal(result.bob, expected.bob);
	});

	it('should pull data from checks from axe._audit.data', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		axe._load({
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
		axe.utils.publishMetaData(result);
		assert.equal(result.nodes[0].any[0].foo, expected.foo);
		assert.equal(result.nodes[0].any[0].bar, expected.bar);
	});


	it('should execute messages', function () {

		axe._load({
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
					'cats-NONE': {
						messages: {
							fail: function () {
								return 'fail-NONE';
							},
							pass: function () {
								return 'pass-NONE';
							}
						}
					},
					'cats-ANY': {
						messages: {
							fail: function () {
								return 'fail-ANY';
							},
							pass: function () {
								return 'pass-ANY';
							}
						}
					},
					'cats-ALL': {
						messages: {
							fail: function () {
								return 'fail-ALL';
							},
							pass: function () {
								return 'pass-ALL';
							}
						}
					}
				}
			}
		});

		var result = {
			id: 'cats',
			nodes: [{
				any: [{
					result: false,
					id: 'cats-ANY'
				}],
				none: [{
					result: true,
					id: 'cats-NONE'
				}],
				all: [{
					result: false,
					id: 'cats-ALL'
				}]
			}, {
				any: [{
					result: true,
					id: 'cats-ANY'
				}],
				none: [{
					result: false,
					id: 'cats-NONE'
				}],
				all: [{
					result: true,
					id: 'cats-ALL'
				}]
			}]
		};
		axe.utils.publishMetaData(result);
		assert.deepEqual(result, {
			id: 'cats',
			help: 'cats-rule',
			tags: [],
			nodes: [{
				any: [{
					result: false,
					id: 'cats-ANY',
					message: 'fail-ANY'
				}],
				none: [{
					result: true,
					id: 'cats-NONE',
					message: 'fail-NONE'
				}],
				all: [{
					result: false,
					id: 'cats-ALL',
					message: 'fail-ALL'
				}]
			}, {
				any: [{
					result: true,
					id: 'cats-ANY',
					message: 'pass-ANY'
				}],
				none: [{
					result: false,
					id: 'cats-NONE',
					message: 'pass-NONE'
				}],
				all: [{
					result: true,
					id: 'cats-ALL',
					message: 'pass-ALL'
				}]
			}]
		});

	});


	it('should not modify base configuration', function () {
		axe._load({
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
					'cats-PASS': {
						failureMessage: function () {
							return 'cats-check';
						}
					},
					'cats-ANY': {
						failureMessage: function () {
							return 'cats-check2';
						}
					},
					'cats-ALL': {
						failureMessage: function () {
							return 'cats-check2';
						}
					}
				}
			}
		});
		axe.utils.publishMetaData({
			id: 'cats',
			nodes: [{
				any: [{
					result: false,
					id: 'cats-PASS'
				}],
				none: [{
					result: true,
					id: 'cats-FAIL'
				}],
				all: [{
					result: false,
					id: 'cats-ALL'
				}]
			}]
		});

		assert.isNotNull(axe._audit.data.checks['cats-PASS'].failureMessage);
		assert.isNotNull(axe._audit.data.checks['cats-ANY'].failureMessage);
		assert.isNotNull(axe._audit.data.checks['cats-ALL'].failureMessage);

	});

	it('should pull tags off rule object', function () {
		var expected = {
			foo: 'bar',
			bob: 'loblaw'
		};

		axe._load({
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
		axe.utils.publishMetaData(result);
		assert.deepEqual(result.tags, ['hai']);

	});

});

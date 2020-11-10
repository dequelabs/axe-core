describe('heading-order', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		checkContext.reset();
	});

	it('should store the heading order path and level for [role=heading] elements and return true', function() {
		var vNode = queryFixture(
			'<div role="heading" aria-level="1" id="target">One</div><div role="heading" aria-level="3">Three</div>'
		);
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('heading-order')
				.call(checkContext, null, {}, vNode, {})
		);
		assert.deepEqual(checkContext._data, {
			headingOrder: [
				{
					ancestry: ['html > body > div:nth-child(1) > div:nth-child(1)'],
					level: 1
				},
				{
					ancestry: ['html > body > div:nth-child(1) > div:nth-child(2)'],
					level: 3
				}
			]
		});
	});

	it('should store the correct header level for hn tags and return true', function() {
		var vNode = queryFixture('<h1 id="target">One</h1><h3>Three</h3>');
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('heading-order')
				.call(checkContext, null, {}, vNode, {})
		);
		assert.deepEqual(checkContext._data, {
			headingOrder: [
				{
					ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
					level: 1
				},
				{
					ancestry: ['html > body > div:nth-child(1) > h3:nth-child(2)'],
					level: 3
				}
			]
		});
	});

	it('should store the location of iframes', function() {
		var vNode = queryFixture(
			'<h1 id="target">One</h1><iframe></iframe><h3>Three</h3>'
		);
		axe.testUtils
			.getCheckEvaluate('heading-order')
			.call(checkContext, null, {}, vNode, { initiator: true });
		assert.deepEqual(checkContext._data, {
			headingOrder: [
				{
					ancestry: ['html > body > div:nth-child(1) > h1:nth-child(1)'],
					level: 1
				},
				{
					ancestry: ['html > body > div:nth-child(1) > iframe:nth-child(2)'],
					level: -1
				},
				{
					ancestry: ['html > body > div:nth-child(1) > h3:nth-child(3)'],
					level: 3
				}
			]
		});
	});

	describe('after', function() {
		it('should return false when header level increases by 2', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'path2',
								level: 3
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path2']
					},
					result: true
				}
			];
			assert.isFalse(checks['heading-order'].after(results)[1].result);
		});

		it('should return true when header level decreases by 1', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 2
							},
							{
								ancestry: 'path2',
								level: 1
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path2']
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[1].result);
		});

		it('should return true when header level decreases by 2', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 3
							},
							{
								ancestry: 'path2',
								level: 1
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path2']
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[1].result);
		});

		it('should return true when there is only one header', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[0].result);
		});

		it('should return true when header level increases by 1', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'path2',
								level: 2
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path2']
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[1].result);
		});

		it('should return true if heading levels are correct across iframes', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'iframe',
								level: -1
							},
							{
								ancestry: 'path3',
								level: 3
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path2',
								level: 2
							}
						]
					},
					node: {
						_fromFrame: true,
						ancestry: ['iframe', 'path2']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path3']
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
			assert.isTrue(afterResults[2].result);
		});

		it('should return false if heading levels are incorrect across iframes', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'iframe',
								level: -1
							},
							{
								ancestry: 'path3',
								level: 3
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path2',
								level: 4
							}
						]
					},
					node: {
						_fromFrame: true,
						ancestry: ['iframe', 'path2']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path3']
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isFalse(afterResults[1].result);
			assert.isTrue(afterResults[2].result);
		});

		it('should handle nested iframes', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'iframe',
								level: -1
							},
							{
								ancestry: 'path4',
								level: 3
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path2',
								level: 2
							}
						]
					},
					node: {
						_fromFrame: true,
						ancestry: ['iframe', 'iframe2', 'path2']
					},
					result: true
				},
				{
					data: {
						headingOrder: [
							{
								ancestry: 'iframe2',
								level: -1
							},
							{
								ancestry: 'path3',
								level: 3
							}
						]
					},
					node: {
						_fromFrame: true,
						ancestry: ['iframe', 'path3']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path4']
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
			assert.isTrue(afterResults[2].result);
			assert.isTrue(afterResults[3].result);
		});

		it('should skip iframes not in context', function() {
			var results = [
				{
					data: {
						headingOrder: [
							{
								ancestry: 'path1',
								level: 1
							},
							{
								ancestry: 'iframe',
								level: -1
							},
							{
								ancestry: 'path2',
								level: 2
							}
						]
					},
					node: {
						_fromFrame: false,
						ancestry: ['path1']
					},
					result: true
				},
				{
					node: {
						_fromFrame: false,
						ancestry: ['path2']
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
		});
	});
});

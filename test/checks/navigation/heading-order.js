describe('heading-order', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	var queryFixture = axe.testUtils.queryFixture;
	var fixture = document.querySelector('#fixture');

	afterEach(function() {
		checkContext.reset();
	});

	it('should store the correct header level for [role=heading] elements and return true', function() {
		var vNode = queryFixture(
			'<div role="heading" aria-level="1" id="target">One</div><div role="heading" aria-level="3">Three</div>'
		);
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('heading-order')
				.call(checkContext, null, {}, vNode, {})
		);
		assert.deepEqual(checkContext._data, {
			levels: [1, 3],
			index: 0
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
			levels: [1, 3],
			index: 0
		});
	});

	it('should store the correct index in the list of headings and return true', function() {
		var vNode = queryFixture('<h1>One</h1><h3 id="target">Three</h3>');
		assert.isTrue(
			axe.testUtils
				.getCheckEvaluate('heading-order')
				.call(checkContext, null, {}, vNode, {})
		);
		assert.equal(checkContext._data.index, 1);
	});

	it('should store the location of iframes if initiator', function() {
		var vNode = queryFixture(
			'<h1 id="target">One</h1><iframe></iframe><h3>Three</h3>'
		);
		var iframe = fixture.querySelector('iframe');
		axe.testUtils
			.getCheckEvaluate('heading-order')
			.call(checkContext, null, {}, vNode, { initiator: true });
		assert.deepEqual(checkContext._data, {
			levels: [1, iframe, 3],
			index: 0
		});
	});

	it('should not store the location of iframes if not initiator', function() {
		var vNode = queryFixture(
			'<h1 id="target">One</h1><iframe></iframe><h3>Three</h3>'
		);
		axe.testUtils
			.getCheckEvaluate('heading-order')
			.call(checkContext, null, {}, vNode, { initiator: false });
		assert.deepEqual(checkContext._data, {
			levels: [1, 3],
			index: 0
		});
	});

	describe('after', function() {
		it('should return false when header level increases by 2', function() {
			var results = [
				{
					data: {
						levels: [1, 3],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						index: 1
					},
					node: {
						_fromFrame: false
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
						levels: [2, 1],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						index: 1
					},
					node: {
						_fromFrame: false
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
						levels: [3, 1],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						index: 1
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[1].result);
		});

		it('should return true when there is only one header', function() {
			var results = [{ data: 1, result: true }];
			assert.isTrue(checks['heading-order'].after(results)[0].result);
		});

		it('should return true when header level increases by 1', function() {
			var results = [
				{
					data: {
						levels: [1, 2],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						index: 1
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			assert.isTrue(checks['heading-order'].after(results)[1].result);
		});

		it('should return true if heading levels are correct across iframes', function() {
			var iframe = document.createElement('iframe');
			var results = [
				{
					data: {
						levels: [1, iframe, 3],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						levels: [2],
						index: 0
					},
					node: {
						_fromFrame: true,
						_element: iframe
					},
					result: true
				},
				{
					data: {
						index: 2
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
			assert.isTrue(afterResults[2].result);
		});

		it('should return false if heading levels are incorrect across iframes (inside-out)', function() {
			var iframe = document.createElement('iframe');
			var results = [
				{
					data: {
						levels: [1, iframe, 3],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						levels: [3],
						index: 0
					},
					node: {
						_fromFrame: true,
						_element: iframe
					},
					result: true
				},
				{
					data: {
						index: 2
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isFalse(afterResults[1].result);
			assert.isTrue(afterResults[2].result);
		});

		it('should return false if heading levels are incorrect across iframes (outside-in)', function() {
			var iframe = document.createElement('iframe');
			var results = [
				{
					data: {
						levels: [1, iframe, 4],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						levels: [2],
						index: 0
					},
					node: {
						_fromFrame: true,
						_element: iframe
					},
					result: true
				},
				{
					data: {
						index: 2
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
			assert.isFalse(afterResults[2].result);
		});

		it('should skip iframes not in context', function() {
			var iframe = document.createElement('iframe');
			var results = [
				{
					data: {
						levels: [1, iframe, 2],
						index: 0
					},
					node: {
						_fromFrame: false
					},
					result: true
				},
				{
					data: {
						index: 2
					},
					node: {
						_fromFrame: false
					},
					result: true
				}
			];
			var afterResults = checks['heading-order'].after(results);
			assert.isTrue(afterResults[1].result);
		});
	});
});

describe('region-after', function() {
	'use strict';

	function mockResult(result, element, fromFrame) {
		return {
			result: result,
			node: {
				_element: element,
				_fromFrame: fromFrame || false
			}
		};
	}

	var queryFixture = axe.testUtils.queryFixture;
	var checkContext = axe.testUtils.MockCheckContext();
	var cache = axe._cache;
	afterEach(function() {
		axe._tree = undefined;
		checkContext.reset();
		cache.clear();
	});

	it('should pass the content of an iframe that is within a region', function() {
		var vNode = queryFixture('<iframe id="target"></iframe>');
		cache.set('regionlessNodes', []);
		var results = checks.region.after([
			mockResult(true, vNode.actualNode), // iframe
			mockResult(false, vNode.actualNode, true) // iframe content
		]);

		assert.isTrue(results[1].result);
	});

	it('should pass the iframe if all its content is within a region', function() {
		var vNode = queryFixture('<iframe id="target"></iframe>');
		cache.set('regionlessNodes', [vNode]);
		var results = checks.region.after([
			mockResult(false, vNode.actualNode), // iframe
			mockResult(true, vNode.actualNode, true) // iframe content
		]);

		assert.isTrue(results[0].result);
	});

	it('should pass the iframe if it has mixed content', function() {
		var vNode = queryFixture('<iframe id="target"></iframe>');
		cache.set('regionlessNodes', [vNode]);
		var results = checks.region.after([
			mockResult(false, vNode.actualNode), // iframe
			mockResult(false, vNode.actualNode, true), // iframe content
			mockResult(true, vNode.actualNode, true) // iframe content
		]);

		assert.isTrue(results[0].result);
	});

	it('should fail the iframe if all its content is outside of a region', function() {
		var vNode = queryFixture('<iframe id="target"></iframe>');
		cache.set('regionlessNodes', [vNode]);
		var results = checks.region.after([
			mockResult(false, vNode.actualNode), // iframe
			mockResult(false, vNode.actualNode, true) // iframe content
		]);

		assert.isFalse(results[0].result);
	});

	it("doesn't throw an error if the iframe has no results", function() {
		function fn() {
			var vNode = queryFixture('<iframe id="target"></iframe>');
			cache.set('regionlessNodes', [vNode]);
			checks.region.after([
				mockResult(false, vNode.actualNode) // iframe
			]);
		}

		assert.doesNotThrow(fn);
	});
});

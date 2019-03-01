describe('landmark-is-unique-after', function() {
	'use strict';

	var checkContext = axe.testUtils.MockCheckContext();
	function createResult(result, data) {
		return {
			result: result,
			data: data
		};
	}

	function createResultWithSameRelatedNodes(result, data) {
		return {
			...createResult(result, data),
			relatedNodes: [createResult(result, data)]
		};
	}

	function createResultWithProvidedRelatedNodes(result, data, relatedNodes) {
		return {
			...createResult(result, data),
			relatedNodes
		};
	}

	afterEach(function() {
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should update duplicate landmarks with failed result', function() {
		var result = checks['landmark-is-unique'].after([
			createResultWithSameRelatedNodes(true, {
				role: 'some role',
				label: 'some label'
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'some role',
				label: 'some label'
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'different role',
				label: 'some label'
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'some role',
				label: 'different label'
			})
		]);

		const expectedResult = [
			createResultWithProvidedRelatedNodes(
				false,
				{
					role: 'some role',
					label: 'some label'
				},
				[
					createResult(true, {
						role: 'some role',
						label: 'some label'
					})
				]
			),
			createResultWithProvidedRelatedNodes(
				true,
				{
					role: 'different role',
					label: 'some label'
				},
				[]
			),
			createResultWithProvidedRelatedNodes(
				true,
				{
					role: 'some role',
					label: 'different label'
				},
				[]
			)
		];
		assert.deepEqual(result, expectedResult);
	});
});

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
		return Object.assign(createResult(result, data), {
			relatedNodes: [createResult(result, data)]
		});
	}

	function createResultWithProvidedRelatedNodes(result, data, relatedNodes) {
		return Object.assign(createResult(result, data), {
			relatedNodes: relatedNodes
		});
	}

	afterEach(function() {
		axe._tree = undefined;
		checkContext.reset();
	});

	it('should update duplicate landmarks with failed result', function() {
		var result = checks['landmark-is-unique'].after([
			createResultWithSameRelatedNodes(true, {
				role: 'doc-afterword',
				accessibleText: 'some accessibleText'
				// isLandmark: true // truthy
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'doc-afterword',
				accessibleText: 'some accessibleText'
				// isLandmark: 111 // truthy
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'alertdialog',
				accessibleText: 'some accessibleText'
				// isLandmark: false // falsy
			}),
			createResultWithSameRelatedNodes(true, {
				role: 'doc-afterword',
				accessibleText: 'different accessibleText'
				// isLandmark: 'true' // truthy
			})
		]);
		// console.log("result: ", JSON.stringify(result, null, 4));

		var expectedResult = [
			createResultWithProvidedRelatedNodes(
				false,
				{
					role: 'doc-afterword',
					accessibleText: 'some accessibleText'
					// isLandmark: true // truthy
				},
				[
					createResult(true, {
						role: 'doc-afterword',
						accessibleText: 'some accessibleText'
						// isLandmark: 111 // truthy
					})
				]
			),
			createResultWithProvidedRelatedNodes(
				true,
				{
					role: 'alertdialog',
					accessibleText: 'some accessibleText'
					// isLandmark: false // falsy
				},
				[]
			),
			createResultWithProvidedRelatedNodes(
				true,
				{
					role: 'doc-afterword',
					accessibleText: 'different accessibleText'
					// isLandmark: 'true' // truthy
				},
				[]
			)
		];
		// console.log("expectedResult: ", JSON.stringify(expectedResult, null, 4));

		assert.deepEqual(result, expectedResult);
	});
});

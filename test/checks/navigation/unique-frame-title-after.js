/*eslint indent: 0*/
describe('unique-frame-title-after', function() {
	'use strict';

	var check = checks['unique-frame-title'];

	function assertResult(
		result,
		expectedData,
		expectedRelatedNodes,
		expectedResult
	) {
		assert.deepEqual(result.data, expectedData);
		assert.deepEqual(result.relatedNodes, expectedRelatedNodes);
		assert.equal(result.result, expectedResult);
	}

	it('sets results of check result to `undefined` if identical `iframes` but different purpose (resource titles will be compared)', function() {
		var nodeOneData = {
			data: {
				name: 'incomplete 1',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'page-one.html',
					port: '9876'
				},
				resourceFrameTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'incomplete 1',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'page-two.html',
					port: '9876'
				},
				resourceFrameTitle: 'page two'
			},
			relatedNodes: ['nodeOfPageTwo'],
			result: true
		};

		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 1);
		assertResult(results[0], nodeOneData.data, ['nodeOfPageTwo'], undefined);
	});

	it('sets results of check result to `true` if identical `iframes` with same purpose (resource titles match, although pathnames are different)', function() {
		var nodeOneData = {
			data: {
				name: 'pass me',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'page-one.html',
					port: '9876'
				},
				resourceFrameTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'pass me',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'page-one-copy.html',
					port: '9876'
				},
				resourceFrameTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOneCopy'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 1);
		assertResult(results[0], nodeOneData.data, ['nodeOfPageOneCopy'], true);
	});

	it('sets results of check result to `true` if non identical `iframes`', function() {
		var nodeOneData = {
			data: {
				name: 'earth ',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'earth.html',
					port: '9876'
				},
				resourceFrameTitle: 'page earth'
			},
			relatedNodes: ['earth'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'venus',
				parsedResource: {
					hostname: 'localhost',
					pathname: 'venus.html',
					port: '9876'
				},
				resourceFrameTitle: 'page venus'
			},
			relatedNodes: ['venus'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 2);
		assertResult(results[0], nodeOneData.data, [], true);
		assertResult(results[1], nodeTwoData.data, [], true);
	});
});

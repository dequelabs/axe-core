/*eslint indent: 0*/
describe('unique-frame-title-after', function() {
	'use strict';

	var check = checks['unique-frame-title'];

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

		var result = results[0];
		assert.equal(result.data.name, nodeOneData.data.name);
		assert.equal(
			result.data.parsedResource.hostname,
			nodeOneData.data.parsedResource.hostname
		);
		assert.equal(result.relatedNodes.length, 1);
		assert.isUndefined(result.result);
	});

	it('sets results of check result to `true` if identical `iframes` with same purpose (resource tiltes match, although pathnames are different)', function() {
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

		assert.lengthOf(results, 2);

		var result1 = results[0];
		assert.equal(result1.data.name, nodeOneData.data.name);
		assert.equal(
			result1.data.parsedResource.pathname,
			nodeOneData.data.parsedResource.pathname
		);
		assert.equal(result1.relatedNodes.length, 0);
		assert.isTrue(result1.result);

		var result2 = results[1];
		assert.equal(result2.relatedNodes.length, 0);
		assert.isTrue(result2.result);
	});
});

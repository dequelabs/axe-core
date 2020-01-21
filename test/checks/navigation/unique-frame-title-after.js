/*eslint indent: 0*/
describe('unique-frame-title-after', function() {
	'use strict';

	var check = checks['unique-frame-title'];

	it('sets results of check result to `undefined` if identical `iframes` but different purpose (resource titles will be compared)', function() {
		var nodeOneData = {
			data: {
				name: 'incomplete 1',
				urlProps: {
					hostname: 'localhost',
					pathname: 'page-one.html',
					port: '9876'
				},
				resourceTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'incomplete 1',
				urlProps: {
					hostname: 'localhost',
					pathname: 'page-two.html',
					port: '9876'
				},
				resourceTitle: 'page two'
			},
			relatedNodes: ['nodeOfPageTwo'],
			result: true
		};

		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 1);

		var result = results[0];
		assert.deepEqual(result.data, nodeOneData.data);
		assert.deepEqual(result.relatedNodes, ['nodeOfPageTwo']);
		assert.equal(result.result, undefined);
	});

	it('sets results of check result to `true` if identical `iframes` with same purpose (resource titles match, although pathnames are different)', function() {
		var nodeOneData = {
			data: {
				name: 'pass me',
				urlProps: {
					hostname: 'localhost',
					pathname: 'page-one.html',
					port: '9876'
				},
				resourceTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'pass me',
				urlProps: {
					hostname: 'localhost',
					pathname: 'page-one-copy.html',
					port: '9876'
				},
				resourceTitle: 'page one'
			},
			relatedNodes: ['nodeOfPageOneCopy'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 1);
		var result = results[0];
		assert.deepEqual(result.data, nodeOneData.data);
		assert.deepEqual(result.relatedNodes, ['nodeOfPageOneCopy']);
		assert.equal(result.result, true);
	});

	it('sets results of check result to `true` if non identical `iframes`', function() {
		var nodeOneData = {
			data: {
				name: 'earth ',
				urlProps: {
					hostname: 'localhost',
					pathname: 'earth.html',
					port: '9876'
				},
				resourceTitle: 'page earth'
			},
			relatedNodes: ['earth'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'venus',
				urlProps: {
					hostname: 'localhost',
					pathname: 'venus.html',
					port: '9876'
				},
				resourceTitle: 'page venus'
			},
			relatedNodes: ['venus'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);

		assert.lengthOf(results, 2);

		assert.deepEqual(results[0].data, nodeOneData.data);
		assert.deepEqual(results[0].relatedNodes, []);
		assert.equal(results[0].result, true);

		assert.deepEqual(results[1].data, nodeTwoData.data);
		assert.deepEqual(results[1].relatedNodes, []);
		assert.equal(results[1].result, true);
	});
});

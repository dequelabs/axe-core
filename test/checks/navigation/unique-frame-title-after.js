/*eslint indent: 0*/
describe('unique-frame-title-after', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['unique-frame-title'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('sets results of check result to `undefined` if identical `iframes` but different purpose (resource titles will be compared)', function() {
		var nodeOne = queryFixture(
			'<iframe id="target" title="Incomplete 1" src="../integration/rules/frame-title-unique/frames/page-one.html"> </iframe>'
		);
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
			relatedNodes: [nodeOne],
			result: true
		};
		var nodeTwo = queryFixture(
			'<iframe id="target" title="incomplete 1" src="../integration/rules/frame-title-unique/frames/page-two.html"> </iframe>'
		);
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
			relatedNodes: [nodeTwo],
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
		var nodeOne = queryFixture(
			'<iframe id="target" title="Pass Me" src="../integration/rules/frame-title-unique/frames/page-one.html"> </iframe>'
		);
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
			relatedNodes: [nodeOne],
			result: true
		};
		var nodeTwo = queryFixture(
			'<iframe id="target" title="Pass Me" src="../integration/rules/frame-title-unique/frames/page-one-copy.html"> </iframe>'
		);
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
			relatedNodes: [nodeTwo],
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

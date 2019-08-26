describe('identical-links-same-purpose-after tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['identical-links-same-purpose'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('sets results of check result to `undefined` if native links do not serve identical purpose', function() {
		var nodeOne = queryFixture(
			"<a id='target' href='http://facebook.com'>follow us</a>"
		);
		var nodeOneData = {
			data: {
				name: 'follow us',
				parsedResource: { hostname: 'facebook.com' }
			},
			relatedNodes: [nodeOne],
			result: true
		};
		var nodeTwo = queryFixture(
			"<a id='target' href='http://instagram.com'>follow us</a>"
		);
		var nodeTwoData = {
			data: {
				name: 'follow us',
				parsedResource: { hostname: 'instagram.com' }
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

	it('sets results of check result to `true` if native links serve identical purpose', function() {
		var nodeOne = queryFixture(
			"<a id='target' href='http://deque.com/axe-core'>Axe Core</a>"
		);
		var nodeOneData = {
			data: {
				name: 'Axe Core',
				parsedResource: { hostname: 'deque.com', pathname: 'axe-core' }
			},
			relatedNodes: [nodeOne],
			result: true
		};
		var nodeTwo = queryFixture(
			"<a id='target' href='http://deque.com/axe-core/index.html'>Axe Core</a>"
		);
		var nodeTwoData = {
			data: {
				name: 'Axe Core us',
				parsedResource: { hostname: 'deque.com', pathname: 'axe-core' }
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

	it('sets results of check result to `true` if ARIA links have different accessible names', function() {
		var nodeOne = queryFixture('<button role="link">Earth</button>');
		var nodeOneData = {
			data: {
				name: 'earth',
				parsedResource: {}
			},
			relatedNodes: [nodeOne],
			result: true
		};
		var nodeTwo = queryFixture('<button role="link">Venus</button>');
		var nodeTwoData = {
			data: {
				name: 'venus',
				parsedResource: {}
			},
			relatedNodes: [nodeTwo],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);
		assert.lengthOf(results, 2);

		var result1 = results[0];
		assert.equal(result1.data.name, nodeOneData.data.name);
		assert.equal(result1.relatedNodes.length, 0);

		var result2 = results[1];
		assert.equal(result2.data.name, nodeTwoData.data.name);
		assert.equal(result2.relatedNodes.length, 0);
	});
});

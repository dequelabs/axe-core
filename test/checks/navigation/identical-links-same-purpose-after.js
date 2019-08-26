describe('identical-links-same-purpose-after tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var check = checks['identical-links-same-purpose'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('sets results of check result to `undefined` if links do not serve identical purpose', function() {
		var nodeOne = queryFixture(
			"<a id='target' href='http://facebook.com'>follow us</a>"
		);
		var nodeOneData = {
			data: {
				name: 'follow us',
				parsedResource: {
					filename: undefined,
					hash: undefined,
					hostname: 'facebook.com',
					pathname: '',
					port: '',
					protocol: undefined,
					search: ''
				}
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
				parsedResource: {
					filename: undefined,
					hash: undefined,
					hostname: 'instagram.com',
					pathname: '',
					port: '',
					protocol: undefined,
					search: ''
				}
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

	it('sets results of check result to `true` if links serve identical purpose', function() {
		var nodeOne = queryFixture(
			"<a id='target' href='http://deque.com/axe-core'>Axe Core</a>"
		);
		var nodeOneData = {
			data: {
				name: 'Axe Core',
				parsedResource: {
					filename: undefined,
					hash: undefined,
					hostname: 'deque.com',
					pathname: 'axe-core',
					port: '',
					protocol: undefined,
					search: ''
				}
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
				parsedResource: {
					filename: undefined,
					hash: undefined,
					hostname: 'deque.com',
					pathname: 'axe-core',
					port: '',
					protocol: undefined,
					search: ''
				}
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

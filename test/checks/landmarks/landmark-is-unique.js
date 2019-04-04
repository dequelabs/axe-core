describe('landmark-is-unique', function() {
	'use strict';

	var checkContext = new axe.testUtils.MockCheckContext();
	var fixture;
	var axeFixtureSetup;

	beforeEach(function() {
		fixture = document.getElementById('fixture');
		axeFixtureSetup = axe.testUtils.fixtureSetup;
	});

	afterEach(function() {
		checkContext.reset();
	});

	it('should return true, with correct role and no accessible text', function() {
		axeFixtureSetup('<div role="main">test</div>');
		var node = fixture.querySelector('div');
		var expectedData = {
			accessibleText: null,
			role: 'main'
		};
		assert.isTrue(
			checks['landmark-is-unique'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, expectedData);
		assert.deepEqual(checkContext._relatedNodes, [node]);
	});

	it('should return true, with correct role and the accessible text lowercased', function() {
		axeFixtureSetup('<div role="main" aria-label="TEST text">test</div>');
		var node = fixture.querySelector('div');
		var expectedData = {
			accessibleText: 'test text',
			role: 'main'
		};
		assert.isTrue(
			checks['landmark-is-unique'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, expectedData);
		assert.deepEqual(checkContext._relatedNodes, [node]);
	});
});

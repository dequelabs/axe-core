describe('landmark-is-unique', function() {
	'use strict';

	var checkContext = new axe.testUtils.MockCheckContext();
	let fixture;
	let axeFixtureSetup;

	beforeEach(function() {
		fixture = document.getElementById('fixture');
		axeFixtureSetup = axe.testUtils.fixtureSetup;
	});

	afterEach(function() {
		checkContext.reset();
	});

	it('should return true, with correct role and no label', function() {
		axeFixtureSetup('<div role="main">test</div>');
		const node = fixture.querySelector('div');
		const expectedData = {
			label: null,
			role: 'main'
		};
		assert.isTrue(
			checks['landmark-is-unique'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, expectedData);
	});

	it('should return true, with correct role and the label lowercased', function() {
		axeFixtureSetup('<div role="main" aria-label="TEST label">test</div>');
		const node = fixture.querySelector('div');
		const expectedData = {
			label: 'test label',
			role: 'main'
		};
		assert.isTrue(
			checks['landmark-is-unique'].evaluate.call(checkContext, node)
		);
		assert.deepEqual(checkContext._data, expectedData);
	});
});

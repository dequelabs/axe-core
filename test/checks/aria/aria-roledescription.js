describe('aria-roledescription', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('returns true for elements with an implicit supported role', function() {
		fixture.innerHTML =
			'<button aria-roledescription="Awesome Button">Click</button>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild, {
				supportedRoles: ['button']
			});
		assert.equal(actual, true);
		assert.isNull(checkContext._data, null);
	});

	it('returns true for elements with an explicit supported role', function() {
		fixture.innerHTML =
			'<div role="radio" aria-roledescription="Awesome Radio">Click</div>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild, {
				supportedRoles: ['radio']
			});
		assert.equal(actual, true);
		assert.isNull(checkContext._data, null);
	});

	it('returns undefined for elements with an unsupported role', function() {
		fixture.innerHTML =
			'<div role="main" aria-roledescription="Awesome Main">The main element</div>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild);
		assert.equal(actual, undefined);
		assert.isNull(checkContext._data, null);
	});

	it('returns false for elements without role', function() {
		fixture.innerHTML =
			'<div aria-roledescription="Awesome Main">The main element</div>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild);
		assert.equal(actual, false);
		assert.isNull(checkContext._data, null);
	});

	it('returns false for elements with role=presentation', function() {
		fixture.innerHTML =
			'<div role="presentation" aria-roledescription="Awesome Main">The main element</div>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild);
		assert.equal(actual, false);
		assert.isNull(checkContext._data, null);
	});

	it('returns false for elements with role=none', function() {
		fixture.innerHTML =
			'<div role="none" aria-roledescription="Awesome Main">The main element</div>';
		var actual = axe.testUtils
			.getCheckEvaluate('aria-roledescription')
			.call(checkContext, fixture.firstChild);
		assert.equal(actual, false);
		assert.isNull(checkContext._data, null);
	});
});

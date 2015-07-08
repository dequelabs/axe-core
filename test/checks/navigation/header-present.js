describe('header-present', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if h1-h6 is found', function () {
		fixture.innerHTML = '<h1>Hi</h1>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

		fixture.innerHTML = '<h2>Hi</h2>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

		fixture.innerHTML = '<h3>Hi</h3>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

		fixture.innerHTML = '<h4>Hi</h4>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

		fixture.innerHTML = '<h5>Hi</h5>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

		fixture.innerHTML = '<h6>Hi</h6>';
		assert.isTrue(checks['header-present'].evaluate(fixture));
	});

	it('should return true if role=heading is found', function () {

		fixture.innerHTML = '<div role="heading">Hi</div>';
		assert.isTrue(checks['header-present'].evaluate(fixture));

	});

	it('should otherwise return false', function () {
		fixture.innerHTML = '<p>Some stuff and stuff</p>';
		assert.isFalse(checks['header-present'].evaluate(fixture));
	});

});

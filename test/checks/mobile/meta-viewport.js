describe('meta-viewport', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false on user-scalable=no', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; cats= dogs; user-scalable=no">';
		var node = fixture.querySelector('meta');

		assert.isFalse(checks['meta-viewport'].evaluate(node));

	});

	it('should return false on user-scalable=no', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; cats= dogs; user-scalable=no; more-stuff=ok">';
		var node = fixture.querySelector('meta');

		assert.isFalse(checks['meta-viewport'].evaluate(node));

	});

	it('should return true on user-scalable=yes', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; cats= dogs; user-scalable=yes; more-stuff=ok">';
		var node = fixture.querySelector('meta');

		assert.isTrue(checks['meta-viewport'].evaluate(node));

	});

	it('should return true if maximum-scale >= 5', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; maximum-scale=5; cats= dogs;">';
		var node = fixture.querySelector('meta');

		assert.isTrue(checks['meta-viewport'].evaluate(node));

		fixture.innerHTML = '<meta name="viewport" content="foo=bar; maximum-scale=6; cats= dogs;">';
		node = fixture.querySelector('meta');

		assert.isTrue(checks['meta-viewport'].evaluate(node));

	});

	it('should return false on maximum-scale < 5', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; cats= dogs; user-scalable=yes; maximum-scale=4">';
		var node = fixture.querySelector('meta');

		assert.isFalse(checks['meta-viewport'].evaluate(node));

	});

	it('should return true if neither user-scalable or maximum-scale are set', function () {
		fixture.innerHTML = '<meta name="viewport" content="foo=bar; cats= dogs;">';
		var node = fixture.querySelector('meta');

		assert.isTrue(checks['meta-viewport'].evaluate(node));

	});

});
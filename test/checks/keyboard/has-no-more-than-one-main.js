describe('has-no-more-than-one-main', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if there is more than one element with role main', function () {
		fixture.innerHTML = '<div id="target"><div role="main"></div><div role="main"></div></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate(node));
	});
	
	it('should return false if there is more than one main element', function () {
		fixture.innerHTML = '<div id="target"><main></main><main></main></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['has-no-more-than-one-main'].evaluate(node));
	});

	it('should return true if there is only one element with role main', function () {
		fixture.innerHTML = '<div role="main" id="target"></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate(node));
	});
	
	it('should return true if there is only one main element', function () {
		fixture.innerHTML = '<main id="target"></main>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['has-no-more-than-one-main'].evaluate(node));
	});

});
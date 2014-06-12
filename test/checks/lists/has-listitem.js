describe('has-listitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if the list has no contents', function () {
		fixture.innerHTML = '<ol id="target"></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['has-listitem'].evaluate(node));


	});

	it('should return true if the list has non-li contents with li children', function () {
		fixture.innerHTML = '<ol id="target"><p>Not a list <ul><li>item</li></ul></p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['has-listitem'].evaluate(node));


	});

	it('should return true if the list has non-li contents', function () {
		fixture.innerHTML = '<ol id="target"><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['has-listitem'].evaluate(node));


	});

	it('should return false if the list has at least one li', function () {
		fixture.innerHTML = '<ol id="target"><li>A list</li><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['has-listitem'].evaluate(node));


	});

});

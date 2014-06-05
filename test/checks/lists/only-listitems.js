describe('only-listitems', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the list has no contents', function () {
		fixture.innerHTML = '<ol id="target"></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return true if the list has non-li contents', function () {
		fixture.innerHTML = '<ol id="target"><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-listitems'].evaluate(node));


	});

	it('should return false if the list has only an li with child content', function () {
		fixture.innerHTML = '<ol id="target"><li>A <i>list</i></li></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return false if the list has only an li', function () {
		fixture.innerHTML = '<ol id="target"><li>A list</li></ol>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-listitems'].evaluate(node));


	});

	it('should return true if the list has an li with other content', function () {
		fixture.innerHTML = '<ol id="target"><li>A list</li><p>Not a list</p></ol>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-listitems'].evaluate(node));


	});

});

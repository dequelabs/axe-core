describe('only-dlitems', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the list has no contents', function () {
		fixture.innerHTML = '<dl id="target"></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return true if the list has non-dd/dt contents', function () {
		fixture.innerHTML = '<dl id="target"><p>Not a list</p></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has only a dd', function () {
		fixture.innerHTML = '<dl id="target"><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has only a dt', function () {
		fixture.innerHTML = '<dl id="target"><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return false if the list has dt and dd', function () {
		fixture.innerHTML = '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['only-dlitems'].evaluate(node));


	});

	it('should return true if the list has a dt and dd with other content', function () {
		fixture.innerHTML = '<dl id="target"><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['only-dlitems'].evaluate(node));


	});

});

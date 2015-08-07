describe('structured-dlitems', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return false if the list has no contents', function () {
		fixture.innerHTML = '<dl id="target"></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['structured-dlitems'].evaluate(node));


	});

	it('should return true if the list has only a dd', function () {
		fixture.innerHTML = '<dl id="target"><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['structured-dlitems'].evaluate(node));


	});

	it('should return true if the list has only a dt', function () {
		fixture.innerHTML = '<dl id="target"><dt>A list</dt></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['structured-dlitems'].evaluate(node));


	});

	it('should return true if the list has dt and dd in the incorrect order', function () {
		fixture.innerHTML = '<dl id="target"><dd>A list</dd><dt>An item</dt></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['structured-dlitems'].evaluate(node));


	});

	it('should return true if the list has dt and dd in the correct order as non-child descendants', function () {
		fixture.innerHTML = '<dl id="target"><dd><dl><dt>An item</dt><dd>A list</dd></dl></dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isTrue(checks['structured-dlitems'].evaluate(node));


	});

	it('should return false if the list has dt and dd in the correct order', function () {
		fixture.innerHTML = '<dl id="target"><dt>An item</dt><dd>A list</dd></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['structured-dlitems'].evaluate(node));


	});

	it('should return false if the list has a correctly-ordered dt and dd with other content', function () {
		fixture.innerHTML = '<dl id="target"><dt>Stuff</dt><dt>Item one</dt><dd>Description</dd><p>Not a list</p></dl>';
		var node = fixture.querySelector('#target');

		assert.isFalse(checks['structured-dlitems'].evaluate(node));


	});

});

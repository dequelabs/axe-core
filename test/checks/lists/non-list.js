describe('non-list', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if no list content is defined', function () {
		fixture.innerHTML = '<div id="target">1. Thing 2. Thing Two 3. Thing Three</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['non-list'].evaluate(node, []));
	});

	it('should return false if the list content is present', function () {
		fixture.innerHTML = '<div id="target">1. Thing 2. Thing Two 3. Thing Three</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['non-list'].evaluate(node, [['1.', '2.', '3.']]));
	});

	it('should return false if the list content is present with multiple arrays', function () {
		fixture.innerHTML = '<div id="target">1) Thing 2) Thing Two 3) Thing Three</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['non-list'].evaluate(node, [['1.', '2.', '3.'], ['1)', '2)', '3)']]));
	});

	it('should return true if only some the list content is present', function () {
		fixture.innerHTML = '<div id="target">1. Thing 2. Thing Two 4. Thing Three</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['non-list'].evaluate(node, [['1.', '2.', '3.']]));
	});

	it('should return true if the list content is out of order', function () {
		fixture.innerHTML = '<div id="target">1. Thing 3. Thing Two 2. Thing Three</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['non-list'].evaluate(node, [['1.', '2.', '3.']]));
	});


});

describe('has-lang', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an lang is present', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['has-lang'].evaluate(node));
	});

	it('should return false if an lang is not present', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['has-lang'].evaluate(node));
	});

});
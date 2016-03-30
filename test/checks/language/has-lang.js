describe('has-lang', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if a lang attribute is present', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', 'woohoo');
		fixture.appendChild(node);

		assert.isTrue(checks['has-lang'].evaluate(node));
	});

	it('should return true if xml:lang attribute is present', function () {
		fixture.innerHTML = '<div xml:lang="cats"></div>';

		assert.isTrue(checks['has-lang'].evaluate(fixture.firstChild));
	});

	it('should return false if xml:lang and lang attributes are not present', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['has-lang'].evaluate(node));
	});

	it('should return false if lang is left empty', function () {
		var node = document.createElement('div');
		node.setAttribute('lang', '');
		fixture.appendChild(node);

		assert.isFalse(checks['has-lang'].evaluate(node));
	});

});
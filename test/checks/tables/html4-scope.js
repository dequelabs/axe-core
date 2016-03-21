describe('html4-scope', function () {
	'use strict';

	var orig,
		isHTML5 = false,
		fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
		axe.commons.dom.isHTML5 = orig;
	});

	beforeEach(function () {
		orig = axe.commons.dom.isHTML5;
		axe.commons.dom.isHTML5 = function () {
			return isHTML5;
		};

	});

	it('should return true on THs', function () {
		fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
		var node = fixture.querySelector('th');

		assert.isTrue(checks['html4-scope'].evaluate(node));

	});

	it('should return true on TDs', function () {
		fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isTrue(checks['html4-scope'].evaluate(node));
	});

	it('should return false on others', function () {
		fixture.innerHTML = '<table scope="row"><tr><td></td></tr></table>';
		var node = fixture.querySelector('table');

		assert.isFalse(checks['html4-scope'].evaluate(node));

	});


	it('should return false on HTML5 documents', function () {
		isHTML5 = true;
		fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isFalse(checks['html4-scope'].evaluate(node));

	});

});
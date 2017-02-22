describe('html5-scope', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true on THs', function () {
		fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
		var node = fixture.querySelector('th');

		assert.isTrue(checks['html5-scope'].evaluate(node));

	});

	it('should return false on TDs', function () {
		fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
		var node = fixture.querySelector('td');

		assert.isFalse(checks['html5-scope'].evaluate(node));

	});

	it('should return true on non-HTML5 documents', function () {
		var orig = axe.commons.dom.isHTML5;
		axe.commons.dom.isHTML5 = function () {
			return false;
		};

		fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
		var node = fixture.querySelector('th');

		assert.isTrue(checks['html5-scope'].evaluate(node));

		axe.commons.dom.isHTML5 = orig;
	});

});
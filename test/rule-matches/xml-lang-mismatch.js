describe('xml-lang-mismatch-matches', function () {
	'use strict'; 

	var rule;
	var dom;
	var fixture = document.getElementById('fixture');

	beforeEach(function () {
		rule = axe._audit.rules.find(function (rule) {
			return rule.id === 'xml-lang-mismatch';
		});
		dom = document.createElement('p');
	});

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('is a function', function () {
		assert.isFunction(rule.matches);
	});

	it('returns false if the element does not contain lang or xml:lang attribute', function () {
		assert.isFalse(rule.matches(dom));
	});

	it('returns true if the element contains lang or xml:lang attribute', function () {
		dom.setAttribute('lang', 'nl');
		assert.isFalse(rule.matches(dom));
	});

	it('returns true if the element contains lang or xml:lang attribute', function () {
		dom.setAttribute('xml:lang', 'nl');
		assert.isFalse(rule.matches(dom));
	});

	it('returns true if the element contains lang or xml:lang attribute', function () {
		dom.setAttribute('lang', 'nl');
		dom.setAttribute('xml:lang', 'fr');
		assert.isFalse(rule.matches(dom));
	});

});
describe('aria-form-field-name-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var rule = axe._audit.rules.find(function(rule) {
		return (
			rule.id === 'aria-toggle-field-name' ||
			rule.id === 'aria-input-field-name'
		);
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false for node `map area[href]`', function() {
		var vNode = queryFixture(
			'<map><area id="target" href="#" role="checkbox"></map>'
		);
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is either INPUT, SELECT or TEXTAREA', function() {
		['INPUT', 'SELECT', 'TEXTAREA'].forEach(function(node) {
			var vNode = queryFixture(
				'<' + node + ' role="menuitemcheckbox" id="target"><' + node + '>'
			);
			var actual = rule.matches(vNode.actualNode, vNode);
			assert.isFalse(actual);
		});
	});

	it('returns false when node is IMG', function() {
		var vNode = queryFixture('<img id="target" role="menuitemradio">');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is not SVG with role=`img`', function() {
		var vNode = queryFixture('<div id="target" role="img">');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is BUTTON', function() {
		var vNode = queryFixture('<button id="target" role="button"></button>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when role=`button`', function() {
		var vNode = queryFixture('<div id="target" role="button"></div>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false for INPUT of type `BUTTON`, `SUBMIT` or `RESET`', function() {
		['button', 'submit', 'reset'].forEach(function(type) {
			var vNode = queryFixture(
				'<input id="target" role="radio" type="' + type + '">'
			);
			var actual = rule.matches(vNode.actualNode, vNode);
			assert.isFalse(actual);
		});
	});
});

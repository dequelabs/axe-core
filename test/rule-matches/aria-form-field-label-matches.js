describe('aria-form-field-label-matches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var rule = axe._audit.rules.find(function(rule) {
		return rule.id === 'aria-form-field-label';
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('returns false when node has no role', function() {
		var vNode = queryFixture('<textarea id="target" title="Label"></textarea>');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false for node `map area[href]`', function() {
		var vNode = queryFixture(
			'<map><area id="target" href="#" role="menuitemradio"></map>'
		);
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is either INPUT, SELECT or TEXTAREA', function() {
		['INPUT', 'SELECT', 'TEXTAREA'].forEach(function(node) {
			var vNode = queryFixture(
				'<' + node + 'role="textbox" id="target"><' + node + '>'
			);
			var actual = rule.matches(vNode.actualNode, vNode);
			assert.isFalse(actual);
		});
	});

	it('returns false when node is IMG', function() {
		var vNode = queryFixture('<img id="target" role="checkbox">');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is not SVG with role=`img`', function() {
		var vNode = queryFixture('<div id="target" role="img">');
		var actual = rule.matches(vNode.actualNode, vNode);
		assert.isFalse(actual);
	});

	it('returns false when node is BUTTON', function() {
		var vNode = queryFixture('<button id="target" role="spinbutton"></button>');
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
				'<input id="target" role="checkbox" type="' + type + '">'
			);
			var actual = rule.matches(vNode.actualNode, vNode);
			assert.isFalse(actual);
		});
	});

	it('returns true when element has any of the allowed roles', function() {
		[
			'checkbox',
			'combobox',
			'listbox',
			'menuitemcheckbox',
			'menuitemradio',
			'radio',
			'searchbox',
			'slider',
			'spinbutton',
			'switch',
			'textbox'
		].forEach(function(role) {
			var vNode = queryFixture('<div id="target" role="' + role + '"></div>');
			var actual = rule.matches(vNode.actualNode, vNode);
			assert.isTrue(actual);
		});
	});
});

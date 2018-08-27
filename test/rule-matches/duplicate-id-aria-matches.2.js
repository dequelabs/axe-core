describe('duplicate-id-mismatches', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var rule;

	beforeEach(function() {
		rule = axe._audit.rules.find(function(rule) {
			return rule.id === 'duplicate-id-aria';
		});
	});

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('is a function', function() {
		assert.isFunction(rule.matches);
	});

	it('returns false if the ID is of an inactive non-referenced element', function() {
		fixtureSetup('<div id="foo"></div>');
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
		assert.isFalse(rule.matches(vNode.actualNode, vNode));
	});

	it('returns false if the ID is of an inactive non-referenced element with a duplicate', function() {
		fixtureSetup('<div id="foo"></div><span id="foo"></span>');
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
		assert.isFalse(rule.matches(vNode.actualNode, vNode));
	});

	it('returns false if the ID is of an active non-referenced element', function() {
		fixtureSetup('<button id="foo"></button>');
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'button[id=foo]')[0];
		assert.isFalse(rule.matches(vNode.actualNode, vNode));
	});

	it('returns false if the ID is a duplicate of an active non-referenced element', function() {
		fixtureSetup('<div id="foo"></div>' + '<button id="foo"></button>');
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
		assert.isFalse(rule.matches(vNode.actualNode, vNode));
	});

	it('returns true if the ID is of an inactive ARIA referenced element', function() {
		fixtureSetup('<div id="foo"></div>' + '<div aria-labelledby="foo"></div>');
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});

	it('returns true if the ID is a duplicate of an inactive ARIA referenced element', function() {
		fixtureSetup(
			'<div id="foo"></div>' +
				'<div aria-labelledby="foo"></div>' +
				'<span id="foo"></span>'
		);
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});

	it('returns true if the ID is of an active ARIA referenced element', function() {
		fixtureSetup(
			'<button id="foo"></button>' + '<div aria-labelledby="foo"></div>'
		);
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'button[id=foo]')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});

	it('returns true if the ID is a duplicate of of an active ARIA referenced element', function() {
		fixtureSetup(
			'<button id="foo"></button>' +
				'<div aria-labelledby="foo"></div>' +
				'<span id="foo"></span>'
		);
		var vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
		assert.isTrue(rule.matches(vNode.actualNode, vNode));
	});
});

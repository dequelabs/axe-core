describe('implicit-role-fallback', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var node;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		node.innerHTML = '';
		checkContext._data = null;
	});

	it('should return true for elements with no role', function() {
		node = document.createElement('div');
		fixture.appendChild(node);
		assert.isTrue(
			checks['implicit-role-fallback'].evaluate.call(checkContext, node)
		);
	});

	it('should return true for elements with nonsensical roles', function() {
		fixture.innerHTML = '<a role="awesomelink" id="target" href="#">text</a>';
		var target = fixture.children[0];
		assert.isTrue(
			checks['implicit-role-fallback'].evaluate.call(checkContext, target)
		);
	});

	it('should return true if the provided role’s parent is the element’s implicit role', function() {
		axe.commons.aria.lookupTable.role.awesomelink = {
			type: 'link',
			attributes: {
				allowed: ['aria-expanded']
			},
			owned: null,
			namefrom: ['author', 'contents'],
			context: null
		};
		fixture.innerHTML = '<a role="awesomelink" id="target" href="#">text</a>';
		var target = fixture.children[0];
		assert.isTrue(
			checks['implicit-role-fallback'].evaluate.call(checkContext, target)
		);
		delete axe.commons.aria.lookupTable.role.awesomelink;
	});

	it('should return false if the provided role’s type is not the element’s implicit role', function() {
		axe.commons.aria.lookupTable.role.awesomelink = {
			type: 'link',
			attributes: {
				allowed: ['aria-expanded']
			},
			owned: null,
			namefrom: ['author', 'contents'],
			context: null
		};
		fixture.innerHTML = '<article role="awesomelink" id="target"></article>';
		var target = fixture.children[0];
		assert.isFalse(
			checks['implicit-role-fallback'].evaluate.call(checkContext, target)
		);
		delete axe.commons.aria.lookupTable.role.awesomelink;
	});

	it('should return false if the element has no implicit role', function() {
		axe.commons.aria.lookupTable.role.awesomelink = {
			type: 'link',
			attributes: {
				allowed: ['aria-expanded']
			},
			owned: null,
			namefrom: ['author', 'contents'],
			context: null
		};
		fixture.innerHTML = '<div role="awesomelink" id="target"></div>';
		var target = fixture.children[0];
		assert.isFalse(
			checks['implicit-role-fallback'].evaluate.call(checkContext, target)
		);
		delete axe.commons.aria.lookupTable.role.awesomelink;
	});
});

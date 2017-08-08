describe('listitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if the listitem has a parent <ol>', function () {
		var checkArgs = checkSetup('<ol><li id="target">My list item</li></ol>');

		assert.isTrue(checks.listitem.evaluate.apply(null, checkArgs));
	});

	it('should pass if the listitem has a parent <ul>', function () {
		var checkArgs = checkSetup('<ul><li id="target">My list item</li></ul>');

		assert.isTrue(checks.listitem.evaluate.apply(null, checkArgs));
	});

	it('should pass if the listitem has a parent role=list', function () {
		var checkArgs = checkSetup('<div role="list"><li id="target">My list item</li></div>');

		assert.isTrue(checks.listitem.evaluate.apply(null, checkArgs));
	});

	it('should fail if the listitem has an incorrect parent', function () {
		var checkArgs = checkSetup('<div><li id="target">My list item</li></div>');

		assert.isFalse(checks.listitem.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true in a shadow DOM pass', function () {
		var node = document.createElement('div');
		node.innerHTML = '<li>My list item </li>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<ul><slot></slot></ul>';

		var checkArgs = checkSetup(node, 'li');
		assert.isTrue(checks.listitem.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false in a shadow DOM fail', function () {
		var node = document.createElement('div');
		node.innerHTML = '<li>My list item </li>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div><slot></slot></div>';

		var checkArgs = checkSetup(node, 'li');
		assert.isFalse(checks.listitem.evaluate.apply(null, checkArgs));
	});
});

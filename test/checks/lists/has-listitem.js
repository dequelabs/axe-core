describe('has-listitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if the list has no contents', function () {
		var checkArgs = checkSetup('<ol id="target"></ol>');

		assert.isTrue(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

	it('should return true if the list has non-li contents with li children', function () {
		var checkArgs = checkSetup('<ol id="target"><p>Not a list <ul><li>item</li></ul></p></ol>');

		assert.isTrue(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

	it('should return true if the list has non-li contents', function () {
		var checkArgs = checkSetup('<ol id="target"><p>Not a list</p></ol>');

		assert.isTrue(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

	it('should return false if the list has at least one li', function () {
		var checkArgs = checkSetup('<ol id="target"><li>A list</li><p>Not a list</p></ol>');

		assert.isFalse(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true in a shadow DOM pass', function () {
		var node = document.createElement('div');
		node.innerHTML = '<li>My list item </li>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<ul><slot></slot></ul>';

		var checkArgs = checkSetup(node, 'ul');
		assert.isFalse(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false in a shadow DOM fail', function () {
		var node = document.createElement('div');
		node.innerHTML = '<p>Not a list</p>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<ul><slot></slot></ul>';

		var checkArgs = checkSetup(node, 'ul');
		assert.isTrue(checks['has-listitem'].evaluate.apply(null, checkArgs));
	});

});

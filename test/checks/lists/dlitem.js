describe('dlitem', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkSetup = axe.testUtils.checkSetup;
	var shadowSupport = axe.testUtils.shadowSupport;

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should pass if the dlitem has a parent <dl>', function () {
		var checkArgs = checkSetup('<dl><dt id="target">My list item</dl>');

		assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
	});

	it('should fail if the dlitem has an incorrect parent', function () {
		var checkArgs = checkSetup('<video><dt id="target">My list item</video>');

		assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return true in a shadow DOM pass', function () {
		var node = document.createElement('div');
		node.innerHTML = '<dt>My list item </dt>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<dl><slot></slot></dl>';

		var checkArgs = checkSetup(node, 'dt');
		assert.isTrue(checks.dlitem.evaluate.apply(null, checkArgs));
	});

	(shadowSupport.v1 ? it : xit)('should return false in a shadow DOM fail', function () {
		var node = document.createElement('div');
		node.innerHTML = '<dt>My list item </dt>';
		var shadow = node.attachShadow({ mode: 'open' });
		shadow.innerHTML = '<div><slot></slot></div>';

		var checkArgs = checkSetup(node, 'dt');
		assert.isFalse(checks.dlitem.evaluate.apply(null, checkArgs));
	});
});

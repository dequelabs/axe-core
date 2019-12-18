describe('listitem', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var shadowSupport = axe.testUtils.shadowSupport;
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should pass if the listitem has a parent <ol>', function() {
		fixture.innerHTML = '<ol><li id="target">My list item</li></ol>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
	});

	it('should pass if the listitem has a parent <ul>', function() {
		fixture.innerHTML = '<ul><li id="target">My list item</li></ul>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
	});

	it('should pass if the listitem has a parent role=list', function() {
		fixture.innerHTML =
			'<div role="list"><li id="target">My list item</li></div>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
	});

	it('should fail if the listitem has an incorrect parent', function() {
		fixture.innerHTML = '<div><li id="target">My list item</li></div>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks.listitem.evaluate.call(checkContext, target));
	});

	it('should fail if the listitem has a parent <ol> with changed role', function() {
		fixture.innerHTML =
			'<ol role="menubar"><li id="target">My list item</li></ol>';
		var target = fixture.querySelector('#target');
		assert.isFalse(checks.listitem.evaluate.call(checkContext, target));
		assert.equal(checkContext._data, 'roleNotValid');
	});

	it('should pass if the listitem has a parent <ol> with an invalid role', function() {
		fixture.innerHTML =
			'<ol role="invalid-role"><li id="target">My list item</li></ol>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
	});

	it('should pass if the listitem has a parent <ol> with an abstract role', function() {
		fixture.innerHTML =
			'<ol role="section"><li id="target">My list item</li></ol>';
		var target = fixture.querySelector('#target');
		assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
	});

	(shadowSupport.v1 ? it : xit)(
		'should return true in a shadow DOM pass',
		function() {
			var node = document.createElement('div');
			node.innerHTML = '<li id="target">My list item </li>';
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<ul><slot></slot></ul>';
			fixture.appendChild(node);
			var target = node.querySelector('#target');
			assert.isTrue(checks.listitem.evaluate.call(checkContext, target));
		}
	);

	(shadowSupport.v1 ? it : xit)(
		'should return false in a shadow DOM fail',
		function() {
			var node = document.createElement('div');
			node.innerHTML = '<li id="target">My list item </li>';
			var shadow = node.attachShadow({ mode: 'open' });
			shadow.innerHTML = '<div><slot></slot></div>';
			fixture.appendChild(node);
			var target = node.querySelector('#target');
			assert.isFalse(checks.listitem.evaluate.call(checkContext, target));
		}
	);
});

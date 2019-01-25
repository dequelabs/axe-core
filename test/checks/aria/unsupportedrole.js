describe('unsupportedrole', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if applied to an unsupported role', function() {
		axe.commons.aria.lookupTable.role.mccheddarton = {
			type: 'widget',
			unsupported: true
		};
		fixture.innerHTML = '<div id="target" role="mccheddarton">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.unsupportedrole.evaluate(node));
	});

	it('should return false if applied to a supported role', function() {
		fixture.innerHTML = '<div id="target" role="alert">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.unsupportedrole.evaluate(node));

		fixture.innerHTML = '<button id="target">Contents</button>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.unsupportedrole.evaluate(node));
	});

	it('should return false if applied to an invalid role', function() {
		fixture.innerHTML = '<input id="target" role="foo">';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.unsupportedrole.evaluate(node));
	});
});

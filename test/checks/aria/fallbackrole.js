describe('fallbackrole', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if fallback role is used', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="button foobar">Foo</div>'
		);
		assert.isTrue(
			checks.fallbackrole.evaluate(virtualNode.actualNode, 'radio', virtualNode)
		);
	});

	it('should return false if fallback role is not used', function() {
		var virtualNode = queryFixture('<div id="target" role="button">Foo</div>');
		assert.isFalse(
			checks.fallbackrole.evaluate(virtualNode.actualNode, 'radio', virtualNode)
		);
	});

	it('should return false if applied to an invalid role', function() {
		var virtualNode = queryFixture('<div id="target" role="foobar">Foo</div>');
		assert.isFalse(
			checks.fallbackrole.evaluate(virtualNode.actualNode, 'radio', virtualNode)
		);
	});

	it('should return false if applied to an invalid role', function() {
		var virtualNode = queryFixture('<div id="target" role="foobar">Foo</div>');
		assert.isFalse(
			checks.fallbackrole.evaluate(virtualNode.actualNode, 'radio', virtualNode)
		);
	});
});

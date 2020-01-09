describe('invalidrole', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if applied to an empty role', function() {
		var virtualNode = queryFixture('<div id="target" role="">Contents</div>');
		assert.isTrue(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});

	it('should return true if applied to a nonsensical role', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="foo">Contents</div>'
		);
		assert.isTrue(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});

	it('should return false if applied to a concrete role', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="alert">Contents</div>'
		);
		assert.isFalse(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});

	it('should return false if applied to an abstract role', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="widget">Contents</div>'
		);
		assert.isFalse(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});

	it('should return false if applied to multiple valid roles', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="alert button">Contents</div>'
		);
		assert.isFalse(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});

	it('should return true if applied to at least one nonsensical role', function() {
		var virtualNode = queryFixture(
			'<div id="target" role="alert button foo">Contents</div>'
		);
		assert.isTrue(
			checks.invalidrole.evaluate(virtualNode.actualNode, null, virtualNode)
		);
	});
});

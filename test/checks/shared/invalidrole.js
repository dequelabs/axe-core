describe('invalidrole', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if applied to an empty role', function () {
		fixture.innerHTML = '<div id="target" role="">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.invalidrole.evaluate(node, 'radio'));
	});

	it('should return true if applied to a nonsensical role', function () {
		fixture.innerHTML = '<div id="target" role="foo">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks.invalidrole.evaluate(node, 'radio'));
	});

	it('should return false if applied to a concrete role', function () {
		fixture.innerHTML = '<div id="target" role="alert">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.invalidrole.evaluate(node, 'radio'));
	});

	it('should return false if applied to an abstract role', function () {
		fixture.innerHTML = '<div id="target" role="widget">Contents</div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks.invalidrole.evaluate(node, 'radio'));
	});
});


describe('dom.getElementByReference', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return null if the attribute is not found', function () {
		fixture.innerHTML = '<a id="link" href="#target">Hi</a>';
		var node = document.getElementById('link'),
			result = axe.commons.dom.getElementByReference(node, 'usemap');

		assert.isNull(result);

	});

	it('should return null if the attribute does not start with "#"', function () {
		fixture.innerHTML = '<a id="link" usemap="target">Hi</a>';
		var node = document.getElementById('link'),
			result = axe.commons.dom.getElementByReference(node, 'href');

		assert.isNull(result);

	});

	it('should return null if no targets are found', function () {
		fixture.innerHTML = '<a id="link" href="#target">Hi</a>';
		var node = document.getElementById('link'),
			result = axe.commons.dom.getElementByReference(node, 'href');

		assert.isNull(result);

	});

	it('should prioritize ID', function () {
		fixture.innerHTML = '<a id="link" href="#target">Hi</a>' +
			'<a id="target"></a>' +
			'<a name="target"></a>';

		var node = document.getElementById('link'),
			expected = document.getElementById('target'),
			result = axe.commons.dom.getElementByReference(node, 'href');

		assert.equal(result, expected);

	});

	it('should fallback to name', function () {
		fixture.innerHTML = '<a id="link" href="#target">Hi</a>' +
			'<a name="target" id="target0"></a>';

		var node = document.getElementById('link'),
			expected = document.getElementById('target0'),
			result = axe.commons.dom.getElementByReference(node, 'href');

		assert.equal(result, expected);

	});

	it('should return the first matching element with name', function () {
		fixture.innerHTML = '<a id="link" href="#target">Hi</a>' +
			'<a name="target" id="target0"></a>' +
			'<a name="target"></a>';

		var node = document.getElementById('link'),
			expected = document.getElementById('target0'),
			result = axe.commons.dom.getElementByReference(node, 'href');

		assert.equal(result, expected);

	});

});

describe('aria-hidden', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should detect aria-hidden="true" on the element itself', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-hidden', 'true');
		fixture.appendChild(node);

		assert.isTrue(checks['aria-hidden'].execute(node));

	});

	it('should detect aria-hidden="false" on the element itself', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-hidden', 'false');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-hidden'].execute(node));

	});

	it('should detect aria-hidden="true" on a parent', function () {
		var node = document.createElement('div');
		var parent = document.createElement('div');
		parent.setAttribute('aria-hidden', 'true');
		parent.appendChild(node);
		fixture.appendChild(parent);

		assert.isTrue(checks['aria-hidden'].execute(node));

	});

	it('should detect aria-hidden="false" on a parent', function () {
		var node = document.createElement('div');
		var parent = document.createElement('div');
		parent.setAttribute('aria-hidden', 'false');
		parent.appendChild(node);
		fixture.appendChild(parent);

		assert.isFalse(checks['aria-hidden'].execute(node));

	});

	it('should detect aria-hidden="true" on a grandparent', function () {
		var node = document.createElement('div');
		var parent = document.createElement('div');
		var grandParent = document.createElement('div');
		grandParent.setAttribute('aria-hidden', 'true');
		grandParent.appendChild(parent);
		parent.appendChild(node);
		fixture.appendChild(grandParent);

		assert.isTrue(checks['aria-hidden'].execute(node));

	});

	it('should detect aria-hidden="false" on a grandparent', function () {
		var node = document.createElement('div');
		var parent = document.createElement('div');
		var grandParent = document.createElement('div');
		grandParent.setAttribute('aria-hidden', 'false');
		grandParent.appendChild(parent);
		parent.appendChild(node);
		fixture.appendChild(grandParent);

		assert.isFalse(checks['aria-hidden'].execute(node));

	});

});
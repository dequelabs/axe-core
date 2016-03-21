describe('aria-labelledby', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});

	it('should return true if an aria-labelledby and its target is present', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = 'bananas';
		fixture.appendChild(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if only one element referenced by aria-labelledby has visible text', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo noexist hehe');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = 'bananas';
		fixture.appendChild(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-labelledby is not present', function () {
		var node = document.createElement('div');
		fixture.appendChild(node);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if an aria-labelledby is present, but references elements who have no visible text', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = '<span style="display: none">bananas</span>';
		fixture.appendChild(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if an aria-labelledby is present, but references elements with aria-hidden=true', function () {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.setAttribute('aria-hidden', 'true');
		target.innerHTML = 'bananas';
		fixture.appendChild(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});


});
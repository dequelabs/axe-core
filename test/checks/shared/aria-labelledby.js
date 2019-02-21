describe('aria-labelledby', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var fixtureSetup = axe.testUtils.fixtureSetup;

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return true if an aria-labelledby and its target is present', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = 'bananas';
		fixtureSetup(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if only one element referenced by aria-labelledby has visible text', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo noexist hehe');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = 'bananas';
		fixtureSetup(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-labelledby is not present', function() {
		var node = document.createElement('div');
		fixtureSetup(node);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if an aria-labelledby is present that references hidden elements', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.setAttribute('style', 'display:none;');
		target.innerHTML = 'bananas';
		fixtureSetup(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-labelledby is present, but references an element with only hidden content', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = '<span style="display: none">bananas</span>';
		fixtureSetup(target);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});

	it('should return true if an aria-labelledby is present that references elements with has aria-hidden=true', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.setAttribute('aria-hidden', 'true');
		target.innerHTML = 'bananas';
		fixtureSetup(target);

		assert.isTrue(checks['aria-labelledby'].evaluate(node));
	});

	it('should return false if an aria-labelledby is present that references elements with has aria-hidden=true in the content', function() {
		var node = document.createElement('div');
		node.setAttribute('aria-labelledby', 'woohoo');
		fixture.appendChild(node);
		var target = document.createElement('div');
		target.id = 'woohoo';
		target.innerHTML = '<span aria-hidden="true">bananas</span>';
		fixtureSetup(target);

		assert.isFalse(checks['aria-labelledby'].evaluate(node));
	});
});

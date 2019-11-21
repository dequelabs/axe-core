describe('tabindex', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should fail if the tabindex is >= 0', function() {
		var node = document.createElement('div');
		node.setAttribute('tabindex', '1');
		fixture.appendChild(node);

		assert.isFalse(checks.tabindex.evaluate(node));
	});

	it('should pass if the tabindex is <= 0', function() {
		var node = document.createElement('div');
		node.setAttribute('tabindex', '0');
		fixture.appendChild(node);

		assert.isTrue(checks.tabindex.evaluate(node));
	});

	it('should look at the attribute and not the property', function() {
		var node = document.createElement('div');
		node.setAttribute('tabindex', '1');
		node.tabindex = null;
		fixture.appendChild(node);

		assert.isFalse(checks.tabindex.evaluate(node));
	});

	it('should pass if tabindex is NaN', function() {
		var node = document.createElement('div');
		node.setAttribute('tabindex', 'foobar');
		fixture.appendChild(node);

		assert.isTrue(checks.tabindex.evaluate(node));
	});
});

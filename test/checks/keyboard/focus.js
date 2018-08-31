describe('onFocus', function() {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('should return false if onFocus only contains "this.blur()"', function() {
		var node = document.createElement('input');
		node.setAttribute('onFocus', 'this.blur()');
		node.textContent = 'Blur me';
		fixture.appendChild(node);

		assert.isFalse(checks.focus.evaluate(node));
	});

	it('should return true if onFocus do not contain "this.blur()"', function() {
		var node = document.createElement('input');
		node.setAttribute('onFocus', 'console.log("something")');
		node.textContent = 'Blur me';
		fixture.appendChild(node);

		assert.isTrue(checks.focus.evaluate(node));
	});

	it('should return undefined if onFocus have "this.blur()" somewhere in it', function() {
		var node = document.createElement('input');
		node.setAttribute('onFocus', 'setTimeout(() => {this.blur()}, 1)');
		node.textContent = 'Blur me';
		fixture.appendChild(node);

		assert.isUndefined(checks.focus.evaluate(node));
	});
});

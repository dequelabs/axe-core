describe('aria-allowed-role', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var checkContext = axe.testUtils.MockCheckContext();

	afterEach(function() {
		fixture.innerHTML = '';
		checkContext.reset();
	});

	it('should return false when a role is set on an element that does not allow any role', function() {
		var node = document.createElement('dd');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should return true when a role is set on an element that can have any role', function() {
		var node = document.createElement('div');
		node.setAttribute('role', 'link');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should allow an <a> without a href to have any role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'presentation');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should allow an <a> with a empty href to have any valid role', function() {
		var node = document.createElement('a');
		node.setAttribute('role', 'link');
		node.href = '';
		fixture.appendChild(node);
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should allow an <img> with a non-empty alt to have any role except `none` or `presentation`', function() {
		var node = document.createElement('img');
		node.setAttribute('role', 'banner');
		node.alt = 'some text';
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		node.setAttribute('role', 'none');
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
		node.setAttribute('role', 'presentation');
		assert.isFalse(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should not allow a <link> with a href to have any invalid role', function() {
		var node = document.createElement('link');
		node.setAttribute('role', 'invalid-role');
		node.href = '\\example.com';
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});

	it('should allow <select> without a multiple and size attribute to have a menu role', function() {
		var node = document.createElement('select');
		node.setAttribute('role', 'menu');
		fixture.appendChild(node);
		assert.isTrue(
			checks['aria-allowed-role'].evaluate.call(checkContext, node)
		);
	});
});

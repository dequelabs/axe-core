describe('aria-required-children', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	var checkContext = {
		_data: null,
		data: function (d) {
			this._data = d;
		}
	};

	afterEach(function () {
		fixture.innerHTML = '';
		checkContext._data = null;
	});

	it('should detect missing sole required child', function () {
		fixture.innerHTML = '<div role="list" id="target"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-children'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['listitem']);
	});

	it('should detect multiple missing required children when one required', function () {
		fixture.innerHTML = '<div role="grid" id="target"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-children'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['rowgroup', 'row']);
	});

	it('should detect multiple missing required children when all required', function () {
		fixture.innerHTML = '<div role="combobox" id="target"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-children'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['listbox', 'textbox']);
	});

	it('should detect single missing required child when all required', function () {
		fixture.innerHTML = '<div role="combobox" id="target"><p role="listbox">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-children'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['textbox']);
	});

	it('should pass all existing required children when all required', function () {
		fixture.innerHTML = '<div role="combobox" id="target"><p role="listbox">Nothing here.</p><p role="textbox">Textbox</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass one indirectly aria-owned child when one required', function () {
		fixture.innerHTML = '<div role="grid" id="target" aria-owns="r"></div><div id="r"><div role="row">Nothing here.</div></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should not break if aria-owns points to non-existent node', function () {
		fixture.innerHTML = '<div role="grid" id="target" aria-owns="nonexistent"></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass one existing aria-owned child when one required', function () {
		fixture.innerHTML = '<div role="grid" id="target" aria-owns="r"></div><p id="r" role="row">Nothing here.</p>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass one existing required child when one required', function () {
		fixture.innerHTML = '<div role="grid" id="target"><p role="row">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass one existing required child when one required because of implicit role', function () {
		fixture.innerHTML = '<table id="target"><p role="row">Nothing here.</p></table>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass when a child with an implicit role is present', function () {
		fixture.innerHTML = '<table role="grid" id="target"><tr><td>Nothing here.</td></tr></table>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass direct existing required children', function () {
		fixture.innerHTML = '<div role="list" id="target"><p role="listitem">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should pass indirect required children', function () {
		fixture.innerHTML = '<div role="list" id="target"><p>Just a regular ol p that contains a... <p role="listitem">Nothing here.</p></p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

	it('should return true when a role has no required owned', function () {
		fixture.innerHTML = '<div role="listitem" id="target"><p>Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-children'].evaluate.call(checkContext, node));
	});

});

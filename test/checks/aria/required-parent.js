describe('aria-required-parent', function () {
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

	it('should detect missing required parent', function () {
		fixture.innerHTML = '<div><p role="listitem" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-parent'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['list']);
	});

	it('should pass when required parent is present in an ancestral aria-owns context', function () {
		fixture.innerHTML = '<div role="list" ><div aria-owns="parent"></div></div><div id="parent"><p role="listitem" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-parent'].evaluate.call(checkContext, node));
	});

	it('should fail when wrong role is present in an aria-owns context', function () {
		fixture.innerHTML = '<div role="menu" ><div aria-owns="target"></div></div><div><p role="listitem" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isFalse(checks['aria-required-parent'].evaluate.call(checkContext, node));
		assert.deepEqual(checkContext._data, ['list']);
	});


	it('should pass when required parent is present in an aria-owns context', function () {
		fixture.innerHTML = '<div role="list" aria-owns="target"></div><div><p role="listitem" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-parent'].evaluate.call(checkContext, node));
	});

	it('should pass when at least one required parent of multiple is present', function () {
		fixture.innerHTML = '<div role="grid" ><p role="row" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-parent'].evaluate.call(checkContext, node));
	});
	it('should pass when required parent is present', function () {
		fixture.innerHTML = '<div role="list" ><p role="listitem" id="target">Nothing here.</p></div>';
		var node = fixture.querySelector('#target');
		assert.isTrue(checks['aria-required-parent'].evaluate.call(checkContext, node));
	});

});

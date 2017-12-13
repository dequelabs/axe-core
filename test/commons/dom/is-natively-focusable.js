describe('dom.isNativelyFocusable', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});


	it('should return true for buttons with redundant tabindex', function () {
		fixture.innerHTML = '<button tabindex="0" id="target"></button>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for buttons with tabindex -1', function () {
		fixture.innerHTML = '<button tabindex="-1" id="target"></button>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for visible, enabled textareas', function () {
		fixture.innerHTML = '<textarea id="target"></textarea>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for visible, enabled selects', function () {
		fixture.innerHTML = '<select id="target"></select>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for visible, enabled buttons', function () {
		fixture.innerHTML = '<button id="target"></button>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for visible, enabled, non-hidden inputs', function () {
		fixture.innerHTML = '<input type="text" id="target">';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for disabled elements', function () {
		fixture.innerHTML = '<input type="text" id="target" disabled>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for hidden inputs', function () {
		fixture.innerHTML = '<input type="hidden" id="target">';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for non-visible elements', function () {
		fixture.innerHTML = '<input type="text" id="target" style="display: none">';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for an anchor with an href', function () {
		fixture.innerHTML = '<a href="something.html" id="target"></a>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for an anchor with no href', function () {
		fixture.innerHTML = '<a name="anchor" id="target"></a>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for a div with a tabindex with spaces', function () {
		fixture.innerHTML = '<div id="target" tabindex="	  0   "></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for a div with a tabindex', function () {
		fixture.innerHTML = '<div id="target" tabindex="0"></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for a div with a non-numeric tabindex', function () {
		fixture.innerHTML = '<div id="target" tabindex="x"></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for a details element', function () {
		fixture.innerHTML = '<details id="target"><p>Detail</p></details>';
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for a div with no tabindex', function () {
		fixture.innerHTML = '<div id="target"></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});
});

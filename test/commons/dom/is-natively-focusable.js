describe('dom.isNativelyFocusable', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	function hideByClipping (el) {
		el.style.cssText = 'position: absolute !important;' +
			' clip: rect(0px 0px 0px 0px); /* IE6, IE7 */' +
			' clip: rect(0px, 0px, 0px, 0px);';
	}

	function hideByMovingOffScreen (el) {
		el.style.cssText = 'position:absolute;' +
			' left:-10000px;' +
			' top:auto;' +
			' width:1px;' +
			' height:1px;' +
			' overflow:hidden;';
	}

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

	it('should return false for elements hidden with display:none', function () {
		fixture.innerHTML = '<button id="target" style="display: none">button</button>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for elements hidden with visibility:hidden', function () {
		fixture.innerHTML = '<button id="target" style="visibility: hidden">button</button>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for clipped elements', function () {
		fixture.innerHTML = '<button id="target">button</button>';
		var el = document.getElementById('target');
		hideByClipping(el);

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for elements positioned off screen', function () {
		fixture.innerHTML = '<button id="target">button</button>';
		var el = document.getElementById('target');
		hideByMovingOffScreen(el);

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for elements hidden with display:none on an ancestor', function () {
		fixture.innerHTML = '<div id="parent" style="display:none"><button id="target">button</button></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for elements hidden with visibility:hidden on an ancestor', function () {
		fixture.innerHTML = '<div id="parent" style="visibility: hidden"><button id="target">button</button></div>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for elements with a clipped ancestor', function () {
		fixture.innerHTML = '<div id="parent"><button id="target">button</button></div>';
		hideByClipping(document.getElementById('parent'));
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return true for elements off-screened by an ancestor', function () {
		fixture.innerHTML = '<div id="parent"><button id="target">button</button></div>';
		hideByMovingOffScreen(document.getElementById('parent'));
		var el = document.getElementById('target');

		assert.isTrue(axe.commons.dom.isNativelyFocusable(el));

	});

	it('should return false for hidden inputs with tabindex', function () {
		fixture.innerHTML = '<input type="hidden" tabindex="1" id="target">';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isFocusable(el));

	});

	it('should return false for disabled inputs with tabindex', function () {
		fixture.innerHTML = '<input tabindex="1" id="target" disabled>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isFocusable(el));

	});

	it('should return false for hidden buttons with tabindex', function () {
		fixture.innerHTML = '<button style="visibility:hidden" tabindex="0" id="target"></button>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isFocusable(el));

	});

	it('should return false for disabled buttons with tabindex', function () {
		fixture.innerHTML = '<button tabindex="0" id="target" disabled></button>';
		var el = document.getElementById('target');

		assert.isFalse(axe.commons.dom.isFocusable(el));

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

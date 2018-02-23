describe('is-focusable', function() {

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

	var fixtureSetup = axe.testUtils.fixtureSetup;

	describe('dom.isFocusable', function () {
		'use strict';

		var fixture = document.getElementById('fixture');

		afterEach(function () {
			document.getElementById('fixture').innerHTML = '';
		});

		it('should return true for visible, enabled textareas', function () {
			fixture.innerHTML = '<textarea id="target"></textarea>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return true for visible, enabled selects', function () {
			fixture.innerHTML = '<select id="target"></select>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return true for visible, enabled buttons', function () {
			fixture.innerHTML = '<button id="target"></button>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return true for visible, enabled, non-hidden inputs', function () {
			fixture.innerHTML = '<input type="text" id="target">';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return false for disabled elements', function () {
			fixture.innerHTML = '<input type="text" id="target" disabled>';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});

		it('should return false for hidden inputs', function () {
			fixture.innerHTML = '<input type="hidden" id="target">';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});

		it('should return false for hidden inputs with tabindex', function () {
			fixture.innerHTML = '<input type="hidden" tabindex="1" id="target">';
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

		it('should return false for non-visible elements', function () {
			fixture.innerHTML = '<input type="text" id="target" style="display: none">';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});

		it('should return true for an anchor with an href', function () {
			fixture.innerHTML = '<a href="something.html" id="target"></a>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return false for an anchor with no href', function () {
			fixture.innerHTML = '<a name="anchor" id="target"></a>';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});

		it('should return true for a div with a tabindex with spaces', function () {
			fixture.innerHTML = '<div id="target" tabindex="	  0   "></div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return true for a div with a tabindex', function () {
			fixture.innerHTML = '<div id="target" tabindex="0"></div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return false for a div with a non-numeric tabindex', function () {
			fixture.innerHTML = '<div id="target" tabindex="x"></div>';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});

		it('should return true for a details element', function () {
			fixture.innerHTML = '<details id="target"><p>Detail</p></details>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isFocusable(el));

		});

		it('should return false for a div with no tabindex', function () {
			fixture.innerHTML = '<div id="target"></div>';
			var el = document.getElementById('target');

			assert.isFalse(axe.commons.dom.isFocusable(el));

		});
	});

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
			fixture.innerHTML = '<div id="target" tabindex="0"></div>';
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

	describe('dom.insertedIntoFocusOrder', function () {

		var fixture = document.getElementById('fixture');

		beforeEach(function () {
			fixture.innerHTML = '';
		});

		it('should return true for span with tabindex 0', function () {
			fixtureSetup('<span id="spanTabindex0" tabindex="0"></span>');
			var node = fixture.querySelector('#spanTabindex0');

			assert.isTrue(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return true for clipped span with tabindex 0', function () {
			fixtureSetup('<span id="clippedSpanTabindex0" tabindex="0"></span>');
			var node = fixture.querySelector('#clippedSpanTabindex0');
			hideByClipping(node);

			assert.isTrue(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return true for off screen span with tabindex 0', function () {
			fixtureSetup('<span id="offScreenSpanTabindex0" tabindex="0"></span>');
			var node = fixture.querySelector('#offScreenSpanTabindex0');
			hideByMovingOffScreen(node);

			assert.isTrue(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for span with negative tabindex', function () {
			fixtureSetup('<span id="spanNegativeTabindex" tabindex="-1"></span>');
			var node = fixture.querySelector('#spanNegativeTabindex');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for native button with tabindex 0', function () {
			fixtureSetup('<button id="nativeButtonTabindex0" tabindex="0"></button>');
			var node = fixture.querySelector('#nativeButtonTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for native button with tabindex implicitly 0', function () {
			fixtureSetup('<button id="nativeButtonTabindexImplicitly0"></button>');
			var node = fixture.querySelector('#nativeButtonTabindexImplicitly0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for anchor with href and positive tabindex', function () {
			fixtureSetup('<a id="anchorWithHrefAndPositiveTabindex" href="javascript:void(0)" tabindex="1"></a>');
			var node = fixture.querySelector('#anchorWithHrefAndPositiveTabindex');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for input with tabindex 0', function () {
			fixtureSetup('<input id="inputWithTabindex0" tabindex="0">');
			var node = fixture.querySelector('#inputWithTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for off screen native button with tabindex 0', function () {
			fixtureSetup('<button id="offScreenNativeButtonTabindex0" tabindex="0"></button>');
			var node = fixture.querySelector('#offScreenNativeButtonTabindex0');
			hideByMovingOffScreen(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for off screen anchor with href and tabindex 1', function () {
			fixtureSetup('<a id="offScreenAnchorWithHrefTabindex1" href="javascript:void(0)" tabindex="1"></a>');
			var node = fixture.querySelector('#offScreenAnchorWithHrefTabindex1');
			hideByMovingOffScreen(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for off screen input with tabindex 0', function () {
			fixtureSetup('<input id="offScreenInputWithTabindex0" tabindex="0">');
			var node = fixture.querySelector('#offScreenInputWithTabindex0');
			hideByMovingOffScreen(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for clipped native button with tabindex 0', function () {
			fixtureSetup('<button id="clippedNativeButtonTabindex0" tabindex="0"></button>');
			var node = fixture.querySelector('#clippedNativeButtonTabindex0');
			hideByClipping(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for display none native button with tabindex 0', function () {
			fixtureSetup('<button id="displayNoneNativeButtonTabindex0" tabindex="0"></button>');
			var node = fixture.querySelector('#displayNoneNativeButtonTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for clipped anchor with href and tabindex 1', function () {
			fixtureSetup('<a id="clippedAnchorWithHrefTabindex1" href="javascript:void(0)" tabindex="1"></a>');
			var node = fixture.querySelector('#clippedAnchorWithHrefTabindex1');
			hideByClipping(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for display none anchor with href and tabindex 1', function () {
			fixtureSetup('<a id="displayNoneAnchorWithHrefTabindex1" href="javascript:void(0)" tabindex="1"></a>');
			var node = fixture.querySelector('#displayNoneAnchorWithHrefTabindex1');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for clipped input with tabindex 0', function () {
			fixtureSetup('<input id="clippedInputWithTabindex0" tabindex="0">');
			var node = fixture.querySelector('#clippedInputWithTabindex0');
			hideByClipping(node);

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for display none input with tabindex 0', function () {
			fixtureSetup('<input id="displayNoneInputWithTabindex0" tabindex="0">');
			var node = fixture.querySelector('#displayNoneInputWithTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for hidden native button with tabindex 0', function () {
			fixtureSetup('<button id="hiddenNativeButtonTabindex0" tabindex="0"></button>');
			var node = fixture.querySelector('#hiddenNativeButtonTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for hidden anchor with href and tabindex 1', function () {
			fixtureSetup('<a id="hiddenAnchorWithHrefTabindex1" href="javascript:void(0)" tabindex="1"></a>');
			var node = fixture.querySelector('#hiddenAnchorWithHrefTabindex1');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for hidden input with tabindex 0', function () {
			fixtureSetup('<input id="hiddenInputWithTabindex0" tabindex="0">');
			var node = fixture.querySelector('#hiddenInputWithTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for disabled native button with tabindex 0', function () {
			fixtureSetup('<button id="disabledNativeButtonTabindex0" tabindex="0" disabled></button>');
			var node = fixture.querySelector('#disabledNativeButtonTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});

		it('should return false for disabled input with tabindex 0', function () {
			fixtureSetup('<input id="disabledInputTabindex0" tabindex="0" disabled>');
			var node = fixture.querySelector('#disabledInputTabindex0');

			assert.isFalse(axe.commons.dom.insertedIntoFocusOrder(node));

		});
	});
});

describe('dom.isVisible', function () {
	'use strict';
	var fixture = document.getElementById('fixture');
	var fakeNode = {
		nodeType: Node.ELEMENT_NODE,
		nodeName: 'div'
	};

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});
	describe('default usage', function () {

		// Firefox returns `null` if accessed inside a hidden iframe
		it('should return false if computedStyle return null for whatever reason', function () {
			var orig = window.getComputedStyle;
			window.getComputedStyle = function () {
				return null;
			};
			assert.isFalse(axe.commons.dom.isVisible(fakeNode));
			window.getComputedStyle = orig;
		});

		it('should return true on staticly-positioned, visible elements', function () {
			fixture.innerHTML = '<div id="target">Hello!</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));

		});

		it('should return true on absolutely positioned elements that are on-screen', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));

		});

		it('should respect position: fixed', function () {
			fixture.innerHTML = '<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should properly calculate offsets according the the offsetParent', function () {
			fixture.innerHTML = '<div style="position: absolute; top: 400px; left: 400px;">' +
					'<div id="target" style="position: absolute; top: -400px; left: -400px">Hi</div>' +
				'</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should return false if moved offscreen with left', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; left: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return false if moved offscreen with top', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; top: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return false on detached elements', function () {
			var el = document.createElement('div');
			el.innerHTML = 'I am not visible because I am detached!';

			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return true on a document', function () {
			assert.isTrue(axe.commons.dom.isVisible(document));
		});

		it('should return true if positioned staticly but top/left is set', function () {
			fixture.innerHTML = '<div id="target" style="top: -9999px; left: -9999px;' +
				'right: -9999px; bottom: -9999px;">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));

		});

		it('should not be affected by `aria-hidden`', function () {
			fixture.innerHTML = '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should not calculate position on parents', function () {

			fixture.innerHTML = '<div style="position: absolute; top: -400px; left: -400px;">' +
					'<div id="target" style="position: absolute; top: 500px; left: 500px">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should know how `visibility` works', function () {
			fixture.innerHTML = '<div style="visibility: hidden;">' +
					'<div id="target" style="visibility: visible;">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should detect clip rect hidden text technique', function () {
			var el,
				clip = 'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));

		});

		it('should detect clip rect hidden text technique on parent', function () {
			var el,
				clip = 'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div style="' + clip + '">' +
					'<div id="target">Hi</div>' +
				'</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));

		});

		it('should detect poorly hidden clip rects', function () {
			var el,
				clip = 'clip: rect(5px 1px 1px 5px);' +
					'clip: rect(5px, 1px, 1px, 5px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));

		});

	});

	describe('screen readers', function () {

		// Firefox returns `null` if accessed inside a hidden iframe
		it('should return false if computedStyle return null for whatever reason', function () {
			var orig = window.getComputedStyle;
			window.getComputedStyle = function () {
				return null;
			};
			assert.isFalse(axe.commons.dom.isVisible(fakeNode, true));
			window.getComputedStyle = orig;
		});

		it('should return true on staticly-positioned, visible elements', function () {
			fixture.innerHTML = '<div id="target">Hello!</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

		it('should return true on absolutely positioned elements that are on-screen', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

		it('should respect position: fixed', function () {
			fixture.innerHTML = '<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should properly calculate offsets according the the offsetParent', function () {
			fixture.innerHTML = '<div style="position: absolute; top: 400px; left: 400px;">' +
					'<div id="target" style="position: absolute; top: -400px; left: -400px">Hi</div>' +
				'</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with left', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; left: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with top', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; top: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with right', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; right: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with bottom', function () {
			fixture.innerHTML = '<div id="target" style="position: absolute; bottom: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if text is moved offscreen with text-indent', function () {
			fixture.innerHTML = '<div id="target" style="text-indent: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return false on detached elements', function () {
			var el = document.createElement('div');
			el.innerHTML = 'I am not visible because I am detached!';

			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should return true on a document', function () {
			assert.isTrue(axe.commons.dom.isVisible(document, true));
		});

		it('should return true if positioned staticly but top/left is set', function () {
			fixture.innerHTML = '<div id="target" style="top: -9999px; left: -9999px;' +
				'right: -9999px; bottom: -9999px;">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

		it('should return false if `aria-hidden` is set', function () {
			fixture.innerHTML = '<div id="target" aria-hidden="true">Hidden from screen readers</div>';

			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should return false if `aria-hidden` is set on parent', function () {
			fixture.innerHTML = '<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should not calculate position on parents', function () {

			fixture.innerHTML = '<div style="position: absolute; top: -400px; left: -400px;">' +
					'<div id="target" style="position: absolute; top: 500px; left: 500px">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should know how `visibility` works', function () {
			fixture.innerHTML = '<div style="visibility: hidden;">' +
					'<div id="target" style="visibility: visible;">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect clip rect hidden text technique', function () {
			var el,
				clip = 'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

		it('should detect clip rect hidden text technique on parent', function () {
			var el,
				clip = 'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div style="' + clip + '">' +
					'<div id="target">Hi</div>' +
				'</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

		it('should detect poorly hidden clip rects', function () {
			var el,
				clip = 'clip: rect(5px 1px 1px 5px);' +
					'clip: rect(5px, 1px, 1px, 5px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));

		});

	});

});

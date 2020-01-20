describe('dom.isVisible', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var fixtureSetup = axe.testUtils.fixtureSetup;
	var isIE11 = axe.testUtils.isIE11;
	var shadowSupported = axe.testUtils.shadowSupport.v1;
	var fakeNode = {
		nodeType: Node.ELEMENT_NODE,
		nodeName: 'div'
	};

	afterEach(function() {
		document.getElementById('fixture').innerHTML = '';
		axe._tree = undefined;
	});

	describe('default usage', function() {
		// Firefox returns `null` if accessed inside a hidden iframe
		it('should return false if computedStyle return null for whatever reason', function() {
			var orig = window.getComputedStyle;
			window.getComputedStyle = function() {
				return null;
			};
			assert.isFalse(axe.commons.dom.isVisible(fakeNode));
			window.getComputedStyle = orig;
		});

		it('should return true on staticly-positioned, visible elements', function() {
			fixture.innerHTML = '<div id="target">Hello!</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should return true on absolutely positioned elements that are on-screen', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should respect position: fixed', function() {
			fixture.innerHTML =
				'<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should properly calculate offsets according the offsetParent', function() {
			fixture.innerHTML =
				'<div style="position: absolute; top: 400px; left: 400px;">' +
				'<div id="target" style="position: absolute; top: -400px; left: -400px">Hi</div>' +
				'</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should return false if moved offscreen with left', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; left: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return false if moved offscreen with top', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; top: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return false on detached elements', function() {
			var el = document.createElement('div');
			el.innerHTML = 'I am not visible because I am detached!';

			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should return true on a document', function() {
			assert.isTrue(axe.commons.dom.isVisible(document));
		});

		it('should return false on STYLE tag', function() {
			var fixture = fixtureSetup(
				'<style id="target"> @import "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"; .green { background-color: green; } </style>'
			);
			var node = fixture.querySelector('#target');
			var actual = axe.commons.dom.isVisible(node);
			assert.isFalse(actual);
		});

		it('should return false on NOSCRIPT tag', function() {
			var fixture = fixtureSetup(
				'<noscript id="target"><p class="invisible"><img src="/piwik/piwik.php?idsite=1" alt="" /></p></noscript>'
			);
			var node = fixture.querySelector('#target');
			var actual = axe.commons.dom.isVisible(node);
			assert.isFalse(actual);
		});

		it('should return false on TEMPLATE tag', function() {
			var fixture = fixtureSetup(
				'<template id="target"><div>Name:</div></template>'
			);
			var node = fixture.querySelector('#target');
			var actual = axe.commons.dom.isVisible(node);
			assert.isFalse(actual);
		});

		it('should return true if positioned staticly but top/left is set', function() {
			fixture.innerHTML =
				'<div id="target" style="top: -9999px; left: -9999px;' +
				'right: -9999px; bottom: -9999px;">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should not be affected by `aria-hidden`', function() {
			fixture.innerHTML =
				'<div id="target" aria-hidden="true">Hidden from screen readers</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should not calculate position on parents', function() {
			fixture.innerHTML =
				'<div style="position: absolute; top: -400px; left: -400px;">' +
				'<div id="target" style="position: absolute; top: 500px; left: 500px">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should know how `visibility` works', function() {
			fixture.innerHTML =
				'<div style="visibility: hidden;">' +
				'<div id="target" style="visibility: visible;">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el));
		});

		it('should detect clip rect hidden text technique', function() {
			var el,
				clip =
					'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should detect clip rect hidden text technique on parent', function() {
			var el,
				clip =
					'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML =
				'<div style="' + clip + '">' + '<div id="target">Hi</div>' + '</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('should detect poorly hidden clip rects', function() {
			var el,
				clip =
					'clip: rect(5px 1px 1px 5px);' +
					'clip: rect(5px, 1px, 1px, 5px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el));
		});

		it('returns false for `AREA` without closest `MAP` element', function() {
			var vNode = queryFixture(
				'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>'
			);
			var actual = axe.commons.dom.isVisible(vNode.actualNode);
			assert.isFalse(actual);
		});

		it('returns false for `AREA` with closest `MAP` with no name attribute', function() {
			var vNode = queryFixture(
				'<map>' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>'
			);
			var actual = axe.commons.dom.isVisible(vNode.actualNode);
			assert.isFalse(actual);
		});

		(shadowSupported ? it : xit)(
			'returns false for `AREA` element that is inside shadowDOM',
			function() {
				fixture.innerHTML = '<div id="container"></div>';
				var container = fixture.querySelector('#container');
				var shadow = container.attachShadow({ mode: 'open' });
				shadow.innerHTML =
					'<map name="infographic">' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>';
				axe.testUtils.flatTreeSetup(fixture);

				var target = shadow.querySelector('#target');
				var actual = axe.commons.dom.isVisible(target);
				assert.isFalse(actual);
			}
		);

		it('returns false for `AREA` with closest `MAP` with name but not referred by an `IMG` usemap attribute', function() {
			var vNode = queryFixture(
				'<map name="infographic">' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>' +
					'<img usemap="#infographic-wrong-name" alt="MDN infographic" />'
			);
			var actual = axe.commons.dom.isVisible(vNode.actualNode);
			assert.isFalse(actual);
		});

		it('returns false for `AREA` with `MAP` and used in `IMG` which is not visible', function() {
			var vNode = queryFixture(
				'<map name="infographic">' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>' +
					'<img usemap="#infographic" alt="MDN infographic" style="display:none"/>'
			);
			var actual = axe.commons.dom.isVisible(vNode.actualNode);
			assert.isFalse(actual);
		});

		it('returns true for `AREA` with `MAP` and used in `IMG` which is visible', function() {
			var vNode = queryFixture(
				'<map name="infographic">' +
					'<area id="target" role="link" shape="circle" coords="130,136,60" aria-label="MDN"/>' +
					'</map>' +
					'<img usemap="#infographic" alt="MDN infographic" />'
			);
			var actual = axe.commons.dom.isVisible(vNode.actualNode);
			assert.isTrue(actual);
		});

		// IE11 either only supports clip paths defined by url() or not at all,
		// MDN and caniuse.com give different results...
		(isIE11 ? it.skip : it)(
			'should detect clip-path hidden text technique',
			function() {
				fixture.innerHTML =
					'<div id="target" style="clip-path: inset(50%);">Hi</div>';

				var el = document.getElementById('target');
				assert.isFalse(axe.commons.dom.isVisible(el));
			}
		);

		(isIE11 ? it.skip : it)(
			'should detect clip-path hidden text technique on parent',
			function() {
				fixture.innerHTML =
					'<div style="clip-path: circle(0%);">' +
					'<div id="target">Hi</div>' +
					'</div>';

				var el = document.getElementById('target');
				assert.isFalse(axe.commons.dom.isVisible(el));
			}
		);

		(shadowSupported ? it : xit)(
			'should correctly handle visible slotted elements',
			function() {
				function createContentSlotted() {
					var group = document.createElement('div');
					group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
					return group;
				}
				function makeShadowTree(node) {
					var root = node.attachShadow({ mode: 'open' });
					var div = document.createElement('div');
					root.appendChild(div);
					div.appendChild(createContentSlotted());
				}
				fixture.innerHTML = '<div><a>hello</a></div>';
				makeShadowTree(fixture.firstChild);
				var tree = axe.utils.getFlattenedTree(fixture.firstChild);
				var el = axe.utils.querySelectorAll(tree, 'a')[0];
				assert.isTrue(axe.commons.dom.isVisible(el.actualNode));
			}
		);
		(shadowSupported ? it : xit)(
			'should correctly handle hidden slotted elements',
			function() {
				function createContentSlotted() {
					var group = document.createElement('div');
					group.innerHTML =
						'<div id="target" style="display:none;">Stuff<slot></slot></div>';
					return group;
				}
				function makeShadowTree(node) {
					var root = node.attachShadow({ mode: 'open' });
					var div = document.createElement('div');
					root.appendChild(div);
					div.appendChild(createContentSlotted());
				}
				fixture.innerHTML = '<div><p><a>hello</a></p></div>';
				makeShadowTree(fixture.firstChild);
				var tree = axe.utils.getFlattenedTree(fixture.firstChild);
				var el = axe.utils.querySelectorAll(tree, 'a')[0];
				assert.isFalse(axe.commons.dom.isVisible(el.actualNode));
			}
		);
	});

	describe('screen readers', function() {
		// Firefox returns `null` if accessed inside a hidden iframe
		it('should return false if computedStyle return null for whatever reason', function() {
			var orig = window.getComputedStyle;
			window.getComputedStyle = function() {
				return null;
			};
			assert.isFalse(axe.commons.dom.isVisible(fakeNode, true));
			window.getComputedStyle = orig;
		});

		it('should return true on staticly-positioned, visible elements', function() {
			fixture.innerHTML = '<div id="target">Hello!</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true on absolutely positioned elements that are on-screen', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; left: 10px; right: 10px">hi</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should respect position: fixed', function() {
			fixture.innerHTML =
				'<div id="target" style="position:fixed; bottom: 0; left: 0;">StickySticky</div>';
			var el = document.getElementById('target');

			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should properly calculate offsets according the offsetParent', function() {
			fixture.innerHTML =
				'<div style="position: absolute; top: 400px; left: 400px;">' +
				'<div id="target" style="position: absolute; top: -400px; left: -400px">Hi</div>' +
				'</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with left', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; left: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with top', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; top: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with right', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; right: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if moved offscreen with bottom', function() {
			fixture.innerHTML =
				'<div id="target" style="position: absolute; bottom: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return true if text is moved offscreen with text-indent', function() {
			fixture.innerHTML =
				'<div id="target" style="text-indent: -9999px">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return false on detached elements', function() {
			var el = document.createElement('div');
			el.innerHTML = 'I am not visible because I am detached!';

			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should return true on a document', function() {
			assert.isTrue(axe.commons.dom.isVisible(document, true));
		});

		it('should return true if positioned staticly but top/left is set', function() {
			fixture.innerHTML =
				'<div id="target" style="top: -9999px; left: -9999px;' +
				'right: -9999px; bottom: -9999px;">Hi</div>';
			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should return false if `aria-hidden` is set', function() {
			fixture.innerHTML =
				'<div id="target" aria-hidden="true">Hidden from screen readers</div>';

			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should return false if `aria-hidden` is set on parent', function() {
			fixture.innerHTML =
				'<div aria-hidden="true"><div id="target">Hidden from screen readers</div></div>';

			var el = document.getElementById('target');
			assert.isFalse(axe.commons.dom.isVisible(el, true));
		});

		it('should not calculate position on parents', function() {
			fixture.innerHTML =
				'<div style="position: absolute; top: -400px; left: -400px;">' +
				'<div id="target" style="position: absolute; top: 500px; left: 500px">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should know how `visibility` works', function() {
			fixture.innerHTML =
				'<div style="visibility: hidden;">' +
				'<div id="target" style="visibility: visible;">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect clip rect hidden text technique', function() {
			var el,
				clip =
					'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect clip rect hidden text technique on parent', function() {
			var el,
				clip =
					'clip: rect(1px 1px 1px 1px);' +
					'clip: rect(1px, 1px, 1px, 1px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML =
				'<div style="' + clip + '">' + '<div id="target">Hi</div>' + '</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect poorly hidden clip rects', function() {
			var el,
				clip =
					'clip: rect(5px 1px 1px 5px);' +
					'clip: rect(5px, 1px, 1px, 5px);' +
					'width: 1px; height: 1px;' +
					'position: absolute;' +
					'overflow: hidden;';

			fixture.innerHTML = '<div id="target" style="' + clip + '">Hi</div>';

			el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect clip-path hidden text technique', function() {
			fixture.innerHTML =
				'<div id="target" style="clip-path: inset(50%);">Hi</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});

		it('should detect clip-path hidden text technique on parent', function() {
			fixture.innerHTML =
				'<div style="clip-path: circle(0%);">' +
				'<div id="target">Hi</div>' +
				'</div>';

			var el = document.getElementById('target');
			assert.isTrue(axe.commons.dom.isVisible(el, true));
		});
	});
});

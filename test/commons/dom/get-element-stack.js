describe('dom.getElementStack', function() {
	'use strict';

	var getElementStack = axe.commons.dom.getElementStack;
	var queryFixture = axe.testUtils.queryFixture;

	describe('stack order', function() {
		it('should return stack in DOM order of non-positioned elements', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<p id="target">Hello World</p>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
		});

		it('should not return elements outside of the stack', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<span style="display:block">Foo</span>' +
					'<p id="target">Hello World</p>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
		});

		it('should should handle positioned elements without z-index', function() {
			// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_without_z-index
			var vNode = queryFixture(
				'<div id="1" style="width:40px;height:40px;position:absolute;top:0;">' +
					'<b>DIV #1</b><br />position:absolute;</div>' +
					'<div id="2" style="width:40px;height:40px;position:relative;top:0;">' +
					'<b>DIV #2</b><br />position:relative;</div>' +
					'<div id="3" style="width:40px;height:40px;position:relative;top:-40px;">' +
					'<b>DIV #3</b><br />position:relative;</div>' +
					'<div id="4" style="width:40px;height:40px;position:absolute;top:0;">' +
					'<b>DIV #4</b><br />position:absolute;</div>' +
					'<div id="target" style="width:40px;height:40px;margin-top:-80px;">' +
					'<b>DIV #5</b><br />position:static;</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['4', '3', '2', '1', 'target', 'fixture']);
		});

		it('should handle floating and positioned elements without z-index', function() {
			// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
			var vNode = queryFixture(
				'<div id="1" style="width:40px;height:40px;position:absolute;top:0;">' +
					'<b>DIV #1</b><br />position:absolute;</div>' +
					'<div id="2" style="width:40px;height:40px;float:left;">' +
					'<b>DIV #2</b><br />float:left;</div>' +
					'<div id="target" style="width:40px;height:40px;">' +
					'<b>DIV #3</b><br />no positioning</div>' +
					'<div id="4" style="width:40px;height:40px;position:absolute;top:0;">' +
					'<b>DIV #4</b><br />position:absolute;</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['4', '1', '2', 'target', 'fixture']);
		});

		it('should handle z-index positioned elements in the same stacking context', function() {
			// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_context_example_1
			var vNode = queryFixture(
				'<div id="target" style="width:40px;height:40px;position:relative;">' +
					'<br />DIV #1' +
					'<br />position:relative;' +
					'<div id="2" style="width:40px;height:40px;position:absolute;top:0;z-index:1;">' +
					'<br />DIV #2' +
					'<br />position:absolute;' +
					'<br />z-index:1;' +
					'</div>' +
					'</div>' +
					'<br />' +
					'<div id="3" style="width:40px;height:40px;position:relative;    margin-top:-58px;">' +
					'<br />DIV #3' +
					'<br />position:relative;' +
					'<div id="4" style="width:40px;height:40px;position:absolute;top:0;z-index:2;">' +
					'<br />DIV #4' +
					'<br />position:absolute;' +
					'<br />z-index:2;' +
					'</div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['4', '2', '3', 'target', 'fixture']);
		});

		it('should handle z-index positioned elements in different stacking contexts', function() {
			// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_context_example_2
			var vNode = queryFixture(
				'<div id="target" style="width:40px;height:40px;position:relative;">' +
					'<br />DIV #1' +
					'<br />position:relative;' +
					'<div id="2" style="width:40px;height:40px;position:absolute;top:0;z-index:2;">' +
					'<br />DIV #2' +
					'<br />position:absolute;' +
					'<br />z-index:2;' +
					'</div>' +
					'</div>' +
					'<br />' +
					'<div id="3" style="width:40px;height:40px;position:relative;    margin-top:-58px;z-index:1">' +
					'<br />DIV #3' +
					'<br />position:relative;' +
					'<div id="4" style="width:40px;height:40px;position:absolute;top:0;z-index:10;">' +
					'<br />DIV #4' +
					'<br />position:absolute;' +
					'<br />z-index:10;' +
					'</div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['2', '4', '3', 'target', 'fixture']);
		});

		it('should handle complex stacking context', function() {
			// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
			var vNode = queryFixture(
				'<div id="1" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:5;">' +
					'Division Element #1<br/>' +
					'position: relative;<br/>' +
					'z-index: 5;' +
					'</div>' +
					'<div id="2" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:2;">' +
					'Division Element #2<br/>' +
					'position: relative;<br/>' +
					'z-index: 2;' +
					'</div>' +
					'<div id="3" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:4;">' +
					'<div id="4" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:6;">' +
					'Division Element #4<br/>' +
					'position: relative;<br/>' +
					'z-index: 6;' +
					'</div>' +
					'Division Element #3<br/>' +
					'position: absolute;<br/>' +
					'z-index: 4;' +
					'<div id="5" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:1;">' +
					'Division Element #5<br/>' +
					'position: relative;<br/>' +
					'z-index: 1;' +
					'</div>' +
					'' +
					'<div id="target" style="position:absolute;top:0;left:0;width:40px;height:40px;z-index:3;">' +
					'Division Element #6<br/>' +
					'position: absolute;<br/>' +
					'z-index: 3;' +
					'</div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['1', '4', 'target', '5', '3', '2']);
		});

		it('should correctly order children of position elements without z-index', function() {
			var vNode = queryFixture(
				'<div id="1" style="position:relative;width:40px;height:40px;">' +
					'<div id="target" style="width:40px;height:40px;"></div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '1', 'fixture']);
		});

		it('should correctly order children of position elements with z-index', function() {
			var vNode = queryFixture(
				'<div id="1" style="position:relative;width:40px;height:40px;z-index:1">' +
					'<div id="target" style="width:40px;height:40px;"></div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '1', 'fixture']);
		});

		it('should handle modals on top of the stack', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<p id="target">Hello World</p>' +
					'</div>' +
					'</main>' +
					'<div id="3" style="position:absolute;top:0;left:0;right:0;height:100px"></div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['3', 'target', '2', '1', 'fixture']);
		});

		it('should handle "pointer-events:none"', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<p id="target">Hello World</p>' +
					'</div>' +
					'</main>' +
					'<div id="3" style="position:absolute;top:0;left:0;right:0;height:100px;pointer-events:none"></div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['3', 'target', '2', '1', 'fixture']);
		});

		it('should return elements left out by document.elementsFromPoint', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<label id="3">Foo<input id="target"></label>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
		});

		it('should not return elements that do not fully cover the target', function() {
			var vNode = queryFixture(
				'<div id="1" style="position:relative;">' +
					'<div id="2" style="position:absolute;width:300px;height:20px;"></div>' +
					'<p id="target" style="position:relative;z-index:1;">Text oh heyyyy <a href="#" id="target">and here\'s <br>a link</a></p>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '1', 'fixture']);
		});

		it('should not return parent elements that do not fully cover the target', function() {
			var vNode = queryFixture(
				'<div id="1" style="height:20px;position:relative;">' +
					'<div id="target" style="position:absolute;top:21px;">Text</div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target']);
		});

		it('should return elements that partially cover the target', function() {
			var vNode = queryFixture(
				'<div id="1" style="height:40px;position:relative;">' +
					'<div id="2" style="height:20px;"></div>' +
					'<div id="target" style="position:absolute;margin-top:-11px;">Text</div>' +
					'</div>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
		});

		it('should handle CSS rotation', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<div id="3" style="height:40px;transform:rotate(-10deg);">transform:rotate</div>' +
					'<div id="target" style="width:40px;height:40px;margin-top:-40px;"></div>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '2', '1', 'fixture']);
		});

		it("should handle CSS rotation when applied to an element that can't be rotated", function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2">' +
					'<em id="3" style="height:40px;transform:rotate(-10deg);">transform:rotate<br>but no rotation</div>' +
					'<div id="target" style="width:40px;height:40px;margin-top:-40px;"></div>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['target', '3', '2', '1', 'fixture']);
		});

		it('should handle negative z-index', function() {
			var vNode = queryFixture(
				'<main id="1">' +
					'<div id="2" style="position:relative;z-index:-10">' +
					'<p id="target">Hello World</p>' +
					'</div>' +
					'</main>'
			);
			var stack = getElementStack(vNode).map(function(vNode) {
				return vNode.actualNode.id;
			});
			assert.deepEqual(stack, ['1', 'fixture', 'target', '2']);
		});
	});

	describe('scroll regions', function() {});
});

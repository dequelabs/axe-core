describe('dom.getElementStack', function() {
	'use strict';

	var getElementStack = axe.commons.dom.getElementStack;
	var queryFixture = axe.testUtils.queryFixture;

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
				'<span style="display: block">Foo</span>' +
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
			'<div id="1" style="width: 40px; height: 40px; position: absolute; top: 0;">' +
				'<b>DIV #1</b><br />position: absolute;</div>' +
				'<div id="2" style="width: 40px; height: 40px; position: relative; top: 0;">' +
				'<b>DIV #2</b><br />position: relative;</div>' +
				'<div id="3" style="width: 40px; height: 40px; position: relative; top: -40px;">' +
				'<b>DIV #3</b><br />position: relative;</div>' +
				'<div id="4" style="width: 40px; height: 40px; position: absolute; top: 0;">' +
				'<b>DIV #4</b><br />position: absolute;</div>' +
				'<div id="target" style="width: 40px; height: 40px; margin-top: -80px;">' +
				'<b>DIV #5</b><br />position: static;</div>'
		);
		var stack = getElementStack(vNode).map(function(vNode) {
			return vNode.actualNode.id;
		});
		assert.deepEqual(stack, ['4', '3', '2', '1', 'target', 'fixture']);
	});

	it('should handle floating and positioned elements without z-index', function() {
		// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_and_float
		var vNode = queryFixture(
			'<div id="1" style="width: 40px; height: 40px; position: absolute; top: 0;">' +
				'<b>DIV #1</b><br />position: absolute;</div>' +
				'<div id="2" style="width: 40px; height: 40px; float: left;">' +
				'<b>DIV #2</b><br />float: left;</div>' +
				'<div id="target" style="width: 40px; height: 40px;">' +
				'<b>DIV #3</b><br />no positioning</div>' +
				'<div id="4" style="width: 40px; height: 40px; position: absolute; top: 0;">' +
				'<b>DIV #4</b><br />position: absolute;</div>'
		);
		var stack = getElementStack(vNode).map(function(vNode) {
			return vNode.actualNode.id;
		});
		assert.deepEqual(stack, ['4', '1', '2', 'target', 'fixture']);
	});

	it('should handle z-index positioned elements in the same stacking context', function() {
		// see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/Stacking_context_example_1
		var vNode = queryFixture(
			'<div id="target" style="width: 40px; height: 40px; position: relative;">' +
				'<br />DIV #1' +
				'<br />position: relative;' +
				'<div id="2" style="width: 40px; height: 40px; position: absolute; top: 0; z-index: 1;">' +
				'<br />DIV #2' +
				'<br />position: absolute;' +
				'<br />z-index: 1;' +
				'</div>' +
				'</div>' +
				'<br />' +
				'<div id="3" style="width: 40px; height: 40px; position: relative;     margin-top: -58px;">' +
				'<br />DIV #3' +
				'<br />position: relative;' +
				'<div id="4" style="width: 40px; height: 40px; position: absolute; top: 0; z-index: 2;">' +
				'<br />DIV #4' +
				'<br />position: absolute;' +
				'<br />z-index: 2;' +
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
			'<div id="target" style="width: 40px; height: 40px; position: relative;">' +
				'<br />DIV #1' +
				'<br />position: relative;' +
				'<div id="2" style="width: 40px; height: 40px; position: absolute; top: 0; z-index: 2;">' +
				'<br />DIV #2' +
				'<br />position: absolute;' +
				'<br />z-index: 2;' +
				'</div>' +
				'</div>' +
				'<br />' +
				'<div id="3" style="width: 40px; height: 40px; position: relative;     margin-top: -58px; z-index: 1">' +
				'<br />DIV #3' +
				'<br />position: relative;' +
				'<div id="4" style="width: 40px; height: 40px; position: absolute; top: 0; z-index: 10;">' +
				'<br />DIV #4' +
				'<br />position: absolute;' +
				'<br />z-index: 10;' +
				'</div>' +
				'</div>'
		);
		var stack = getElementStack(vNode).map(function(vNode) {
			return vNode.actualNode.id;
		});
		assert.deepEqual(stack, ['2', '4', '3', 'target', 'fixture']);
	});
});

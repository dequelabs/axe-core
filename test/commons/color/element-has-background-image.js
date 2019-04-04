describe('color.elementHasBackgroundImage', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var queryFixture = axe.testUtils.queryFixture;
	var elementHasBackgroundImage = axe.commons.color.elementHasBackgroundImage;

	afterEach(function() {
		fixture.innerHTML = '';
		axe._tree = undefined;
	});

	it('returns true when `HTMLElement` is of graphical type', function() {
		['img', 'canvas', 'object', 'iframe', 'video', 'svg'].forEach(function(
			nodeName
		) {
			var vNode = queryFixture(
				'<' + nodeName + ' id="target"></' + nodeName + '>'
			);
			var actual = elementHasBackgroundImage(vNode.actualNode);
			assert.isTrue(actual);
		});
	});

	it('returns false when `HTMLElement` has no background-image style set', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px;">No background style</div>'
		);
		var actual = elementHasBackgroundImage(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns false when `HTMLElement` has background-image style set to none', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px; background-image: none "> Some text... </div>'
		);
		var actual = elementHasBackgroundImage(vNode.actualNode);
		assert.isFalse(actual);
	});

	it('returns true when `HTMLElement` has background-image (url)', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px; background-image: url(london.png)"> Some text... </div>'
		);
		var actual = elementHasBackgroundImage(vNode.actualNode);
		assert.isTrue(actual);

		var bgColorIncompleteData = axe.commons.color.incompleteData.get('bgColor');
		assert.equal(bgColorIncompleteData, 'bgImage');
	});

	it('returns true when `HTMLElement` has background-image (gradient)', function() {
		var vNode = queryFixture(
			'<div id="target" style="height: 40px; width: 30px; background-image: linear-gradient(red, orange);"> Some text... </div>'
		);
		var actual = elementHasBackgroundImage(vNode.actualNode);
		assert.isTrue(actual);

		var bgColorIncompleteData = axe.commons.color.incompleteData.get('bgColor');
		assert.equal(bgColorIncompleteData, 'bgGradient');
	});
});

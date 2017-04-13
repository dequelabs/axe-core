describe('dom.isVisualContent', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		document.getElementById('fixture').innerHTML = '';
	});

	describe('isVisualContent', function () {
		it('should return true for img', function () {
			fixture.innerHTML = '<img src="">';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for iframe', function () {
			fixture.innerHTML = '<iframe src=""></iframe>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for object', function () {
			fixture.innerHTML = '<object data=""></object>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for video', function () {
			fixture.innerHTML = '<video src=""></video>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for audio', function () {
			fixture.innerHTML = '<audio src=""></audio>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for canvas', function () {
			fixture.innerHTML = '<canvas></canvas>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for svg', function () {
			fixture.innerHTML = '<svg></svg>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for math', function () {
			fixture.innerHTML = '<math></math>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for button', function () {
			fixture.innerHTML = '<button></button>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for select', function () {
			fixture.innerHTML = '<select></select>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for textarea', function () {
			fixture.innerHTML = '<textarea></textarea>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for keygen', function () {
			fixture.innerHTML = '<keygen>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for progress', function () {
			fixture.innerHTML = '<progress></progress>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for meter', function () {
			fixture.innerHTML = '<meter></meter>';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for non-hidden input', function () {
			fixture.innerHTML = '<input type="text">';
			assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return true for elements with a visual aria role', function () {
			fixture.innerHTML = (
				'<span role="img"></span>' +
				'<span role="checkbox"></span>' +
				'<span role="radio"></span>' +
				'<span role="range"></span>' +
				'<span role="slider"></span>' +
				'<span role="spinbutton"></span>' +
				'<span role="textbox"></span>'
			);

			for (var i = 0; i < fixture.children.length; i++) {
				assert.isTrue(axe.commons.dom.isVisualContent(fixture.children[i]));
			}
		});

		it('should return false for hidden input', function () {
			fixture.innerHTML = '<input type="hidden">';
			assert.isFalse(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

		it('should return false for p', function () {
			fixture.innerHTML = '<p>Paragraph!</p>';
			assert.isFalse(axe.commons.dom.isVisualContent(fixture.children[0]));
		});

	});
});

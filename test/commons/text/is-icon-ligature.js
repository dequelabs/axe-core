describe('text.isIconLigature', function() {
	'use strict';

	var isIconLigature = axe.commons.text.isIconLigature;
	var queryFixture = axe.testUtils.queryFixture;
	var link, el;

	before(function(done) {
		link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
		document.head.appendChild(link);

		// add an element that uses the font to get it to load
		el = document.createElement('div');
		el.setAttribute('class', 'material-icons');
		el.textContent = 'delete';
		document.body.appendChild(el);

		// give enough time for font to load
		setTimeout(done, 500);
	});

	after(function() {
		link.remove();
		el.remove();
	});

	it('should return false for normal text', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">Normal text</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for emoji', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">🌎</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for non-bmp unicode', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">◓</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for whitespace strings', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">     </div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for common ligatures (fi)', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">figure</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for common ligatures (ff)', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">ffugative</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for common ligatures (fl)', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">flu shot</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for common ligatures (ffi)', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">ffigure</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return false for common ligatures (ffl)', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">fflu shot</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	it('should return true for an icon ligature', function() {
		var target = queryFixture(
			'<div id="target" class="material-icons">delete</div>'
		);
		assert.isTrue(isIconLigature(target.children[0]));
	});

	it('should return true after the 3rd time the font is an icon', function() {
		var target = queryFixture(
			'<div id="target" class="material-icons">delete</div>'
		);

		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);

		// change text to non-icon
		var target = queryFixture(
			'<div id="target" class="material-icons">__non-icon text__</div>'
		);
		assert.isTrue(isIconLigature(target.children[0]));
	});

	it('should return false after the 3rd time the font is not an icon', function() {
		var target = queryFixture(
			'<div id="target" class="material-icons">__non-icon text__</div>'
		);

		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);

		// change text to icon
		var target = queryFixture(
			'<div id="target" class="material-icons">delete</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	describe('pixelThreshold', function() {
		it('should allow higher percent (will not flag icon ligatures)', function() {
			var target = queryFixture(
				'<div id="target" class="material-icons">delete</div>'
			);

			// every pixel must be different to flag as icon
			assert.isFalse(isIconLigature(target.children[0], 1));
		});

		it('should allow lower percent (will flag text ligatures)', function() {
			var target = queryFixture(
				'<div id="target" style="font-family: Times">figure</div>'
			);
			assert.isTrue(isIconLigature(target.children[0], 0));
		});
	});

	describe('occuranceThreshold', function() {
		it('should change the number of times a font is seen before returning', function() {
			var target = queryFixture(
				'<div id="target" class="material-icons">delete</div>'
			);

			isIconLigature(target.children[0]);

			// change text to non-icon
			var target = queryFixture(
				'<div id="target" class="material-icons">__non-icon text__</div>'
			);
			assert.isTrue(isIconLigature(target.children[0], 0.1, 1));
			assert.isFalse(isIconLigature(target.children[0]));
		});
	});
});

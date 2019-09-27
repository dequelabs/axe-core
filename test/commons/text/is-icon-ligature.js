describe('text.isIconLigature', function() {
	'use strict';

	var isIconLigature = axe.commons.text.isIconLigature;
	var queryFixture = axe.testUtils.queryFixture;
	var fontApiSupport = !!document.fonts;

	before(function(done) {
		if (!fontApiSupport) {
			done();
		}

		var materialFont = new FontFace(
			'Material Icons',
			'url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)'
		);
		materialFont.load().then(function() {
			document.fonts.add(materialFont);
			done();
		});
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

	(fontApiSupport ? it : it.skip)(
		'should return true for an icon ligature',
		function() {
			var target = queryFixture(
				'<div id="target" style="font-family: \'Material Icons\'">delete</div>'
			);
			assert.isTrue(isIconLigature(target.children[0]));
		}
	);

	(fontApiSupport ? it : it.skip)(
		'should return true after the 3rd time the font is an icon',
		function() {
			var target = queryFixture(
				'<div id="target" style="font-family: \'Material Icons\'">delete</div>'
			);

			isIconLigature(target.children[0]);
			isIconLigature(target.children[0]);
			isIconLigature(target.children[0]);

			// change text to non-icon
			var target = queryFixture(
				'<div id="target" style="font-family: \'Material Icons\'">__non-icon text__</div>'
			);
			assert.isTrue(isIconLigature(target.children[0]));
		}
	);

	it('should return false after the 3rd time the font is not an icon', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: \'Material Icons\'">__non-icon text__</div>'
		);

		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);
		isIconLigature(target.children[0]);

		// change text to icon
		var target = queryFixture(
			'<div id="target" style="font-family: \'Material Icons\'">delete</div>'
		);
		assert.isFalse(isIconLigature(target.children[0]));
	});

	describe('pixelThreshold', function() {
		(fontApiSupport ? it : it.skip)(
			'should allow higher percent (will not flag icon ligatures)',
			function() {
				var target = queryFixture(
					'<div id="target" style="font-family: \'Material Icons\'">delete</div>'
				);

				// every pixel must be different to flag as icon
				assert.isFalse(isIconLigature(target.children[0], 1));
			}
		);

		it('should allow lower percent (will flag text ligatures)', function() {
			var target = queryFixture(
				'<div id="target" style="font-family: Times">figure</div>'
			);
			assert.isTrue(isIconLigature(target.children[0], 0));
		});
	});

	describe('occuranceThreshold', function() {
		(fontApiSupport ? it : it.skip)(
			'should change the number of times a font is seen before returning',
			function() {
				var target = queryFixture(
					'<div id="target" style="font-family: \'Material Icons\'">delete</div>'
				);

				isIconLigature(target.children[0]);

				// change text to non-icon
				var target = queryFixture(
					'<div id="target" style="font-family: \'Material Icons\'">__non-icon text__</div>'
				);
				assert.isTrue(isIconLigature(target.children[0], 0.1, 1));
				assert.isFalse(isIconLigature(target.children[0]));
			}
		);
	});
});

describe('text.isIconLigature', function() {
	'use strict';

	var isIconLigature = axe.commons.text.isIconLigature;
	var queryFixture = axe.testUtils.queryFixture;

	it('should return false for normal text', function() {
		var target = queryFixture(
			'<div id="target" style="font-family: Times">Normal text</div>'
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

	it('should return true for an icon ligature', function(done) {
		var target = queryFixture(
			'<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>' +
				'<div id="target" class="material-icons">delete</div>'
		);

		// wait for font to load
		setTimeout(function() {
			assert.isTrue(isIconLigature(target.children[0]));
			done();
		}, 1000);
	});
});

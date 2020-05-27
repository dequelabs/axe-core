describe('color.flattenColors', function() {
	'use strict';

	it('should flatten colors properly', function() {
		var halfblack = new axe.commons.color.Color(0, 0, 0, 0.5);
		var fullblack = new axe.commons.color.Color(0, 0, 0, 1);
		var transparent = new axe.commons.color.Color(0, 0, 0, 0);
		var white = new axe.commons.color.Color(255, 255, 255, 1);
		var gray = new axe.commons.color.Color(127.5, 127.5, 127.5, 1);
		var flat = axe.commons.color.flattenColors(halfblack, white);
		assert.equal(flat.red, gray.red);
		assert.equal(flat.green, gray.green);
		assert.equal(flat.blue, gray.blue);

		var flat2 = axe.commons.color.flattenColors(fullblack, white);
		assert.equal(flat2.red, fullblack.red);
		assert.equal(flat2.green, fullblack.green);
		assert.equal(flat2.blue, fullblack.blue);

		var flat3 = axe.commons.color.flattenColors(transparent, white);
		assert.equal(flat3.red, white.red);
		assert.equal(flat3.green, white.green);
		assert.equal(flat3.blue, white.blue);
	});
});

describe('color.wordToHex', function () {
	'use strict';

	it('should pull values from lookup table', function () {
		assert.equal(kslib.color.wordToHex('yellowgreen'), '#9acd32');
	});

	it('should be case-insensitive', function () {
		assert.equal(kslib.color.wordToHex('YeLlOwGrEeN'), '#9acd32');
	});

	it('should pull return the string if not found', function () {
		assert.equal(kslib.color.wordToHex('noexistokthx'), 'noexistokthx');
	});
});

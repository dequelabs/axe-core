describe('text.sanitize', function () {
	'use strict';

	it('should collapse whitespace and trim', function () {
		assert.equal(axe.commons.text.sanitize('\thi\t'), 'hi');
		assert.equal(axe.commons.text.sanitize('\t\nhi \t'), 'hi');
		assert.equal(axe.commons.text.sanitize('\thi \n\t '), 'hi');
		assert.equal(axe.commons.text.sanitize(' hi\r\nok'), 'hi\nok');
		assert.equal(axe.commons.text.sanitize('hello\u00A0there'), 'hello there');
	});


});
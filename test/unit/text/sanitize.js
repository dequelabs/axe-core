describe('text.sanitize', function () {
	'use strict';

	it('should collapse whitespace and trim', function () {
		assert.equal(kslib.text.sanitize('\thi\t'), 'hi');
		assert.equal(kslib.text.sanitize('\t\nhi \t'), 'hi');
		assert.equal(kslib.text.sanitize('\thi \n\t '), 'hi');
		assert.equal(kslib.text.sanitize(' hi\r\nok'), 'hi\nok');
		assert.equal(kslib.text.sanitize('hello\u00A0there'), 'hello there');
	});


});
describe('text.replacePunctuation', function() {
	it('returns string after removing all punctuations', function() {
		var actual = axe.commons.text.replacePunctuation('Earth!!!');
		assert.equal(actual, 'Earth');
	});

	it('returns string which replaced string in place of punctuation (given: E) ', function() {
		var actual = axe.commons.text.replacePunctuation('Earth!!!', '.');
		assert.equal(actual, 'Earth...');
	});

	it('returns string replacing punctuations ', function() {
		var actual = axe.commons.text.replacePunctuation('<!,."\':;!>', 'o');
		assert.equal(actual, 'oooooooooo');
	});
});

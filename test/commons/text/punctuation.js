describe('text.hasPunctuation', function() {
	it('returns true when given string has punctuations', function() {
		var actual = axe.commons.text.hasPunctuation('One, two, three...');
		assert.isTrue(actual);
	});

	it('returns true when given string has only punctuations', function() {
		var actual = axe.commons.text.hasPunctuation('!');
		assert.isTrue(actual);
	});

	it('returns false when given string has no punctuations', function() {
		var actual = axe.commons.text.hasPunctuation(
			'no punctuations in this sentence'
		);
		assert.isFalse(actual);
	});
});

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

describe('text.isHumanInterpretable', function() {
	it('returns 0 when no given string is empty', function() {
		var actual = axe.commons.text.isHumanInterpretable('');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a single character that is blacklisted as icon', function() {
		var actual = axe.commons.text.isHumanInterpretable('x');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a single character that is blacklisted is used as icon', function() {
		var actual = axe.commons.text.isHumanInterpretable('i');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a single character that is a punctuation is used as icon', function() {
		var actual = axe.commons.text.isHumanInterpretable('?');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a string has punctuations', function() {
		var actual = axe.commons.text.isHumanInterpretable('I like 🏀');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a string has emoji', function() {
		var actual = axe.commons.text.isHumanInterpretable('I like 🏀');
		assert.equal(actual, 0);
	});

	it('returns 0 when given a string has non BMP character (eg: windings font)', function() {
		var actual = axe.commons.text.isHumanInterpretable('I ✂ my hair');
		assert.equal(actual, 0);
	});

	it('returns 1 when given a string is punctuated text', function() {
		var actual = axe.commons.text.isHumanInterpretable(
			'I like football, but I prefer basketball..'
		);
		assert.equal(actual, 1);
	});

	it('returns 1 when given a string has punctuated text', function() {
		var actual = axe.commons.text.isHumanInterpretable(
			'I like football, but I prefer basketball..'
		);
		assert.equal(actual, 1);
	});

	it('returns 1 for a simple sentence', function() {
		var actual = axe.commons.text.isHumanInterpretable('Earth is round');
		assert.equal(actual, 1);
	});
});

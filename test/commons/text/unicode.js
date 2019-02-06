describe('text.isNonBmpUnicode', function() {
	it('returns false when given string is alphanumeric', function() {
		var actual = axe.commons.text.isNonBmpUnicode('an apple');
		assert.isFalse(actual);
	});

	it('returns false when given string is number', function() {
		var actual = axe.commons.text.isNonBmpUnicode('100');
		assert.isFalse(actual);
	});

	it('returns false when given string is a sentence', function() {
		var actual = axe.commons.text.isNonBmpUnicode('Earth is round');
		assert.isFalse(actual);
	});

	it('returns true when given string is a phonetic extension', function() {
		var actual = axe.commons.text.isNonBmpUnicode('ᴁ');
		assert.isTrue(actual);
	});

	it('returns true when given string is a combining diacritical marks supplement', function() {
		var actual = axe.commons.text.isNonBmpUnicode('ᴁ');
		assert.isTrue(actual);
	});

	it('returns true when given string is a currency symbols', function() {
		var actual = axe.commons.text.isNonBmpUnicode('₨ 20000');
		assert.isTrue(actual);
	});

	it('returns true when given string has arrows', function() {
		var actual = axe.commons.text.isNonBmpUnicode('← turn left');
		assert.isTrue(actual);
	});

	it('returns true when given string has geometric shapes', function() {
		var actual = axe.commons.text.isNonBmpUnicode('◓');
		assert.isTrue(actual);
	});

	it('returns true when given string has math operators', function() {
		var actual = axe.commons.text.isNonBmpUnicode('√4 = 2');
		assert.isTrue(actual);
	});

	it('returns true when given string has windings font', function() {
		var actual = axe.commons.text.isNonBmpUnicode('▽');
		assert.isTrue(actual);
	});
});

describe('text.replaceNonBmpUnicode', function() {
	it('returns string by removing non BMP unicode ', function() {
		var actual = axe.commons.text.replaceNonBmpUnicode('₨20000');
		assert.equal(actual, '20000');
	});

	it('returns string by replacing non BMP unicode with supplied argument', function() {
		var actual = axe.commons.text.replaceNonBmpUnicode('₨ 20000', '£');
		assert.equal(actual, '£ 20000');
	});
});

describe('text.isEmojiUnicode', function() {
	it('returns false when given string is alphanumeric', function() {
		var actual = axe.commons.text.isEmojiUnicode(
			'1 apple a day, keeps the doctor away'
		);
		assert.isFalse(actual);
	});

	it('returns false when given string is number', function() {
		var actual = axe.commons.text.isNonBmpUnicode('100');
		assert.isFalse(actual);
	});

	it('returns false when given string is a sentence', function() {
		var actual = axe.commons.text.isEmojiUnicode('Earth is round');
		assert.isFalse(actual);
	});

	it('returns true when given string has emoji', function() {
		var actual = axe.commons.text.isEmojiUnicode('🌎 is round');
		assert.isTrue(actual);
	});

	it('returns true when given string has emoji', function() {
		var actual = axe.commons.text.isEmojiUnicode('plant a 🌱');
		assert.isTrue(actual);
	});
});

describe('text.replaceEmojiUnicode', function() {
	it('returns string by removing emoji unicode ', function() {
		var actual = axe.commons.text.replaceEmojiUnicode('☀️Sun');
		assert.equal(actual, 'Sun');
	});

	it('returns string by replacing non BMP unicode with supplied argument', function() {
		var actual = axe.commons.text.replaceEmojiUnicode('☀️', '🌕');
		assert.equal(actual, '🌕');
	});
});

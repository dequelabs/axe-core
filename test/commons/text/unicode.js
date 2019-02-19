describe('text.hasUnicode', function() {
	describe('text.hasUnicode, characters of type Non Bi Multilingual Plane', function() {
		it('returns false when given string is alphanumeric', function() {
			var actual = axe.commons.text.hasUnicode('an apple', (type = 'nonBmp'));
			assert.isFalse(actual);
		});

		it('returns false when given string is number', function() {
			var actual = axe.commons.text.hasUnicode('100', (type = 'nonBmp'));
			assert.isFalse(actual);
		});

		it('returns false when given string is a sentence', function() {
			var actual = axe.commons.text.hasUnicode(
				'Earth is round',
				(type = 'nonBmp')
			);
			assert.isFalse(actual);
		});

		it('returns true when given string is a phonetic extension', function() {
			var actual = axe.commons.text.hasUnicode('ᴁ', (type = 'nonBmp'));
			assert.isTrue(actual);
		});

		it('returns true when given string is a combining diacritical marks supplement', function() {
			var actual = axe.commons.text.hasUnicode('ᴁ', (type = 'nonBmp'));
			assert.isTrue(actual);
		});

		it('returns true when given string is a currency symbols', function() {
			var actual = axe.commons.text.hasUnicode('₨ 20000', (type = 'nonBmp'));
			assert.isTrue(actual);
		});

		it('returns true when given string has arrows', function() {
			var actual = axe.commons.text.hasUnicode(
				'← turn left',
				(type = 'nonBmp')
			);
			assert.isTrue(actual);
		});

		it('returns true when given string has geometric shapes', function() {
			var actual = axe.commons.text.hasUnicode('◓', (type = 'nonBmp'));
			assert.isTrue(actual);
		});

		it('returns true when given string has math operators', function() {
			var actual = axe.commons.text.hasUnicode('√4 = 2', (type = 'nonBmp'));
			assert.isTrue(actual);
		});

		it('returns true when given string has windings font', function() {
			var actual = axe.commons.text.hasUnicode('▽', (type = 'nonBmp'));
			assert.isTrue(actual);
		});
	});

	describe('text.hasUnicode, characters of type Emoji', function() {
		it('returns false when given string is alphanumeric', function() {
			var actual = axe.commons.text.hasUnicode(
				'1 apple a day, keeps the doctor away',
				(type = 'emoji')
			);
			assert.isFalse(actual);
		});

		it('returns false when given string is number', function() {
			var actual = axe.commons.text.hasUnicode('100', (type = 'emoji'));
			assert.isFalse(actual);
		});

		it('returns false when given string is a sentence', function() {
			var actual = axe.commons.text.hasUnicode(
				'Earth is round',
				(type = 'emoji')
			);
			assert.isFalse(actual);
		});

		it('returns true when given string has emoji', function() {
			var actual = axe.commons.text.hasUnicode('🌎 is round', (type = 'emoji'));
			assert.isTrue(actual);
		});

		it('returns true when given string has emoji', function() {
			var actual = axe.commons.text.hasUnicode('plant a 🌱', (type = 'emoji'));
			assert.isTrue(actual);
		});
	});
});

describe('text.replaceUnicode', function() {
	describe('text.replaceUnicode, characters of type Non Bi Multilingual Plane', function() {
		it('returns string by removing non BMP unicode ', function() {
			var actual = axe.commons.text.replaceUnicode('₨20000');
			assert.equal(actual, '20000');
		});

		it('returns string by replacing non BMP unicode with supplied argument', function() {
			var actual = axe.commons.text.replaceUnicode(
				'₨ 20000',
				(type = 'nonBmp'),
				'£'
			);
			assert.equal(actual, '£ 20000');
		});
	});

	describe('text.hasUnicode, characters of type Emoji', function() {
		it('returns string by removing emoji unicode ', function() {
			var actual = axe.commons.text.replaceUnicode('☀️Sun', (type = 'emoji'));
			assert.equal(actual, 'Sun');
		});

		it('returns string by replacing non BMP unicode with supplied argument', function() {
			var actual = axe.commons.text.replaceUnicode(
				'☀️',
				(type = 'emoji'),
				'🌕'
			);
			assert.equal(actual, '🌕');
		});
	});
});

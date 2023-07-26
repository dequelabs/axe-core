describe('text.hasUnicode', () => {
  describe('text.hasUnicode, characters of type Non Bi Multilingual Plane', () => {
    it('returns false when given string is alphanumeric', () => {
      const actual = axe.commons.text.hasUnicode('1 apple', {
        nonBmp: true
      });
      assert.isFalse(actual);
    });

    it('returns false when given string is number', () => {
      const actual = axe.commons.text.hasUnicode('100', {
        nonBmp: true
      });
      assert.isFalse(actual);
    });

    it('returns false when given string is a sentence', () => {
      const actual = axe.commons.text.hasUnicode('Earth is round', {
        nonBmp: true
      });
      assert.isFalse(actual);
    });

    it('returns true when given string is a phonetic extension', () => {
      const actual = axe.commons.text.hasUnicode('ᴁ', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string is a combining diacritical marks supplement', () => {
      const actual = axe.commons.text.hasUnicode('ᴁ', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string is a currency symbols', () => {
      const actual = axe.commons.text.hasUnicode('₨ 20000', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has arrows', () => {
      const actual = axe.commons.text.hasUnicode('← turn left', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has geometric shapes', () => {
      const actual = axe.commons.text.hasUnicode('◓', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has math operators', () => {
      const actual = axe.commons.text.hasUnicode('√4 = 2', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has windings font', () => {
      const actual = axe.commons.text.hasUnicode('▽', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true for a string with characters in supplementary private use area A', () => {
      const actual = axe.commons.text.hasUnicode('\uDB80\uDFFE', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has format unicode', () => {
      // zero-width spacer character U+200B
      const actual = axe.commons.text.hasUnicode('\u200BHello World', {
        nonBmp: true
      });
      assert.isTrue(actual);
    });
  });

  describe('text.hasUnicode, characters of type Emoji', () => {
    it('returns false when given string is alphanumeric', () => {
      const actual = axe.commons.text.hasUnicode(
        '1 apple a day, keeps the doctor away',
        {
          emoji: true
        }
      );
      assert.isFalse(actual);
    });

    it('returns false when given string is number', () => {
      const actual = axe.commons.text.hasUnicode('100', {
        emoji: true
      });
      assert.isFalse(actual);
    });

    it('returns false when given string is a sentence', () => {
      const actual = axe.commons.text.hasUnicode('Earth is round', {
        emoji: true
      });
      assert.isFalse(actual);
    });

    it('returns true when given string has emoji', () => {
      const actual = axe.commons.text.hasUnicode('🌎 is round', {
        emoji: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given string has emoji', () => {
      const actual = axe.commons.text.hasUnicode('plant a 🌱', {
        emoji: true
      });
      assert.isTrue(actual);
    });
  });

  describe('text.hasUnicode, characters of type punctuations', () => {
    it('returns false when given string is number', () => {
      const actual = axe.commons.text.hasUnicode('100', {
        punctuations: true
      });
      assert.isFalse(actual);
    });

    it('returns false when given string is a sentence', () => {
      const actual = axe.commons.text.hasUnicode('Earth is round', {
        punctuations: true
      });
      assert.isFalse(actual);
    });

    it('returns true when given string has punctuations', () => {
      const actual = axe.commons.text.hasUnicode("What's your name?", {
        punctuations: true
      });
      assert.isTrue(actual);
    });

    it('returns true for strings with money signs and odd symbols', () => {
      ['£', '¢', '¥', '€', '§', '±'].forEach(function (str) {
        const actual = axe.commons.text.hasUnicode(str, {
          punctuations: true
        });
        assert.isTrue(actual);
      });
    });
  });

  describe('text.hasUnicode, has combination of unicode', () => {
    it('returns false when given string is number', () => {
      const actual = axe.commons.text.hasUnicode('100', {
        emoji: true,
        nonBmp: true,
        punctuations: true
      });
      assert.isFalse(actual);
    });

    it('returns true when given string has unicode characters', () => {
      const actual = axe.commons.text.hasUnicode(
        'The ☀️ is orange, the ◓ is white.',
        {
          emoji: true,
          nonBmp: true,
          punctuations: true
        }
      );
      assert.isTrue(actual);
    });

    it('returns true when given format unicode characters', () => {
      // zero-width spacer character U+200B
      const actual = axe.commons.text.hasUnicode('\u200BHello World', {
        emoji: true,
        nonBmp: true,
        punctuations: true
      });
      assert.isTrue(actual);
    });

    it('returns true when given punctuation characters', () => {
      const actual = axe.commons.text.hasUnicode('Earth!!!', {
        emoji: true,
        nonBmp: true,
        punctuations: true
      });
      assert.isTrue(actual);
    });
  });
});

describe('text.removeUnicode', () => {
  it('returns string by removing non BMP unicode ', () => {
    const actual = axe.commons.text.removeUnicode('₨₨20000₨₨', {
      nonBmp: true
    });
    assert.equal(actual, '20000');
  });

  it('returns string by removing emoji unicode ', () => {
    const actual = axe.commons.text.removeUnicode('☀️Sun 🌎Earth', {
      emoji: true
    });
    assert.equal(actual, 'Sun Earth');
  });

  it('returns string after removing punctuations from word', () => {
    const actual = axe.commons.text.removeUnicode('Earth!!!', {
      punctuations: true
    });
    assert.equal(actual, 'Earth');
  });

  it('returns string removing all punctuations', () => {
    const actual = axe.commons.text.removeUnicode('<!,."\':;!>', {
      punctuations: true
    });
    assert.equal(actual, '');
  });

  it('returns string removing all private use unicode', () => {
    const actual = axe.commons.text.removeUnicode('', {
      nonBmp: true
    });
    assert.equal(actual, '');
  });

  it('returns string removing all supplementary private use unicode', () => {
    const actual = axe.commons.text.removeUnicode('󰀀󿰀󿿽󰏽', {
      nonBmp: true
    });
    assert.equal(actual, '');
  });

  it('returns the string with supplementary private use area A characters removed', () => {
    const actual = axe.commons.text.removeUnicode('\uDB80\uDFFE', {
      nonBmp: true
    });
    assert.equal(actual, '');
  });

  it('returns string removing combination of unicode characters', () => {
    const actual = axe.commons.text.removeUnicode(
      'The ☀️ is orange, the ◓ is white.',
      {
        emoji: true,
        nonBmp: true,
        punctuations: true
      }
    );
    assert.equal(actual, 'The  is orange the  is white');
  });

  it('returns string removing format unicode', () => {
    // zero-width spacer character U+200B
    const actual = axe.commons.text.removeUnicode('\u200BHello World', {
      nonBmp: true
    });
    assert.equal(actual, 'Hello World');
  });
});

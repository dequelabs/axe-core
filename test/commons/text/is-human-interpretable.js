describe('text.isHumanInterpretable', function () {
  it('returns 0 when given string is empty', function () {
    const actual = axe.commons.text.isHumanInterpretable('');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string is a single alpha character', function () {
    const singleCharacterExamples = ['i', 'x', 'X', '×', ''];
    singleCharacterExamples.forEach(function (characterExample) {
      const actual = axe.commons.text.isHumanInterpretable(characterExample);
      assert.equal(actual, 0);
    });
  });

  it('returns 0 when given string is in the symbolic text characters set (blocklist)', function () {
    const blocklistedSymbols = ['aA', 'Aa', 'abc', 'ABC'];
    blocklistedSymbols.forEach(function (symbolicText) {
      const actual = axe.commons.text.isHumanInterpretable(symbolicText);
      assert.equal(actual, 0);
    });
  });

  it('returns 0 when given string is only punctuations', function () {
    const actual = axe.commons.text.isHumanInterpretable('?!!!,.');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string that has a number', function () {
    const actual = axe.commons.text.isHumanInterpretable('7');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has emoji as a part of the sentence', function () {
    const actual = axe.commons.text.isHumanInterpretable('I like 🏀');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has non BMP character (eg: windings font) as part of the sentence', function () {
    const actual = axe.commons.text.isHumanInterpretable('I ✂ my hair');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has both non BMP character, and emoji as part of the sentence', function () {
    const actual = axe.commons.text.isHumanInterpretable(
      'I ✂ my hair, and I like 🏀'
    );
    assert.equal(actual, 1);
  });

  it('returns 0 when given string has only emoji', function () {
    const actual = axe.commons.text.isHumanInterpretable('🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has only non BNP characters', function () {
    const actual = axe.commons.text.isHumanInterpretable('⌛👓');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has combination of only non BNP characters and emojis', function () {
    const actual = axe.commons.text.isHumanInterpretable('⌛👓🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string is a punctuated sentence', function () {
    const actual = axe.commons.text.isHumanInterpretable(
      "I like football, but I prefer basketball; although I can't play either very well."
    );
    assert.equal(actual, 1);
  });

  it('returns 1 for a sentence without emoji or punctuations', function () {
    const actual = axe.commons.text.isHumanInterpretable('Earth is round');
    assert.equal(actual, 1);
  });
});

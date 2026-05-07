describe('text.isHumanInterpretable', () => {
  it('returns 0 when given string is empty', () => {
    const actual = axe.commons.text.isHumanInterpretable('');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string is a single alpha character', () => {
    const singleCharacterExamples = ['i', 'x', 'X', '×', ''];
    singleCharacterExamples.forEach(characterExample => {
      const actual = axe.commons.text.isHumanInterpretable(characterExample);
      assert.equal(actual, 0);
    });
  });

  it('returns 0 when given string is in the symbolic text characters set (blocklist)', () => {
    const blocklistedSymbols = ['aA', 'Aa', 'abc', 'ABC'];
    blocklistedSymbols.forEach(symbolicText => {
      const actual = axe.commons.text.isHumanInterpretable(symbolicText);
      assert.equal(actual, 0);
    });
  });

  it('returns 0 when given string is only punctuations', () => {
    const actual = axe.commons.text.isHumanInterpretable('?!!!,.');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string that has a number', () => {
    const actual = axe.commons.text.isHumanInterpretable('7');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has emoji as a part of the sentence', () => {
    const actual = axe.commons.text.isHumanInterpretable('I like 🏀');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has non BMP character (eg: windings font) as part of the sentence', () => {
    const actual = axe.commons.text.isHumanInterpretable('I ✂ my hair');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has both non BMP character, and emoji as part of the sentence', () => {
    const actual = axe.commons.text.isHumanInterpretable(
      'I ✂ my hair, and I like 🏀'
    );
    assert.equal(actual, 1);
  });

  it('returns 0 when given string has only emoji', () => {
    const actual = axe.commons.text.isHumanInterpretable('🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has only non BNP characters', () => {
    const actual = axe.commons.text.isHumanInterpretable('⌛👓');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has combination of only non BNP characters and emojis', () => {
    const actual = axe.commons.text.isHumanInterpretable('⌛👓🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string is a punctuated sentence', () => {
    const actual = axe.commons.text.isHumanInterpretable(
      "I like football, but I prefer basketball; although I can't play either very well."
    );
    assert.equal(actual, 1);
  });

  it('returns 1 for a sentence without emoji or punctuations', () => {
    const actual = axe.commons.text.isHumanInterpretable('Earth is round');
    assert.equal(actual, 1);
  });
});

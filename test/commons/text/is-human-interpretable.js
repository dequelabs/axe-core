describe('text.isHumanInterpretable', function () {
  it('returns 0 when given string is empty', function () {
    var actual = axe.commons.text.isHumanInterpretable('');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string is a single character that is blacklisted as icon', function () {
    var blacklistedIcons = ['x', 'i'];
    blacklistedIcons.forEach(function (iconText) {
      var actual = axe.commons.text.isHumanInterpretable(iconText);
      assert.equal(actual, 0);
    });
  });

  it('returns 0 when given string is only punctuations', function () {
    var actual = axe.commons.text.isHumanInterpretable('?!!!,.');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string has emoji as a part of the sentence', function () {
    var actual = axe.commons.text.isHumanInterpretable('I like 🏀');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has non BMP character (eg: windings font) as part of the sentence', function () {
    var actual = axe.commons.text.isHumanInterpretable('I ✂ my hair');
    assert.equal(actual, 1);
  });

  it('returns 1 when given string has both non BMP character, and emoji as part of the sentence', function () {
    var actual = axe.commons.text.isHumanInterpretable(
      'I ✂ my hair, and I like 🏀'
    );
    assert.equal(actual, 1);
  });

  it('returns 0 when given string has only emoji', function () {
    var actual = axe.commons.text.isHumanInterpretable('🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has only non BNP characters', function () {
    var actual = axe.commons.text.isHumanInterpretable('⌛👓');
    assert.equal(actual, 0);
  });

  it('returns 0 when given string has combination of only non BNP characters and emojis', function () {
    var actual = axe.commons.text.isHumanInterpretable('⌛👓🏀🍔🍉🎅');
    assert.equal(actual, 0);
  });

  it('returns 1 when given string is a punctuated sentence', function () {
    var actual = axe.commons.text.isHumanInterpretable(
      "I like football, but I prefer basketball; although I can't play either very well."
    );
    assert.equal(actual, 1);
  });

  it('returns 1 for a sentence without emoji or punctuations', function () {
    var actual = axe.commons.text.isHumanInterpretable('Earth is round');
    assert.equal(actual, 1);
  });
});

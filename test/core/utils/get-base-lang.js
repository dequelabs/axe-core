describe('axe.utils.getBaseLang', function () {
  'use strict';

  it('returns base lang as peanut for argument peanut-BUTTER', function () {
    var actual = axe.utils.getBaseLang('peanut-BUTTER');
    assert.equal(actual, 'peanut');
  });

  it('returns base lang as fr for argument FR-CA', function () {
    var actual = axe.utils.getBaseLang('FR-CA');
    assert.strictEqual(actual, 'fr');
  });

  it('returns base lang which is the prefix string before the first - (hyphen)', function () {
    var actual = axe.utils.getBaseLang('en-GB');
    assert.equal(actual, 'en');
  });

  it('returns primary language subtag as base lang for multi hyphenated argument', function () {
    var actual = axe.utils.getBaseLang('SOME-random-lang');
    assert.strictEqual(actual, 'some');
  });

  it('returns an empty string when argument is null or undefined', function () {
    var actualNull = axe.utils.getBaseLang(null);
    var actualUndefined = axe.utils.getBaseLang(undefined);
    var actualEmpty = axe.utils.getBaseLang();
    assert.strictEqual(actualNull, '');
    assert.strictEqual(actualUndefined, '');
    assert.strictEqual(actualEmpty, '');
  });
});

describe('axe.utils.getBaseLang', function () {
  'use strict';

  it('returns base lang as peanut for argument peanut-BUTTER', function () {
    let actual = axe.utils.getBaseLang('peanut-BUTTER');
    assert.equal(actual, 'peanut');
  });

  it('returns base lang as fr for argument FR-CA', function () {
    let actual = axe.utils.getBaseLang('FR-CA');
    assert.strictEqual(actual, 'fr');
  });

  it('returns base lang which is the prefix string before the first - (hyphen)', function () {
    let actual = axe.utils.getBaseLang('en-GB');
    assert.equal(actual, 'en');
  });

  it('returns primary language subtag as base lang for multi hyphenated argument', function () {
    let actual = axe.utils.getBaseLang('SOME-random-lang');
    assert.strictEqual(actual, 'some');
  });

  it('returns an empty string when argument is null or undefined', function () {
    let actualNull = axe.utils.getBaseLang(null);
    let actualUndefined = axe.utils.getBaseLang(undefined);
    let actualEmpty = axe.utils.getBaseLang();
    assert.strictEqual(actualNull, '');
    assert.strictEqual(actualUndefined, '');
    assert.strictEqual(actualEmpty, '');
  });
});

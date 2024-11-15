describe('axe.utils.parseTabindex', function () {
  'use strict';

  it('should return 0 for "0"', function () {
    assert.strictEqual(axe.utils.parseTabindex('0'), 0);
  });

  it('should return 1 for "+1"', function () {
    assert.strictEqual(axe.utils.parseTabindex('+1'), 1);
  });

  it('should return -1 for "-1"', function () {
    assert.strictEqual(axe.utils.parseTabindex('-1'), -1);
  });

  it('should return null for null', function () {
    assert.strictEqual(axe.utils.parseTabindex(null), null);
  });

  it('should return null for an empty string', function () {
    assert.strictEqual(axe.utils.parseTabindex(''), null);
  });

  it('should return null for a whitespace string', function () {
    assert.strictEqual(axe.utils.parseTabindex('   '), null);
  });

  it('should return null for non-numeric strings', function () {
    assert.strictEqual(axe.utils.parseTabindex('abc'), null);
  });

  it('should return the first valid digit(s) for decimal numbers', function () {
    assert.strictEqual(axe.utils.parseTabindex('2.5'), 2);
  });

  it('should return 123 for "123abc"', function () {
    assert.strictEqual(axe.utils.parseTabindex('123abc'), 123);
  });
});

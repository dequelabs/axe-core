describe('axe.utils.isValidLang', function () {
  'use strict';

  describe('isValidLang', function () {
    it('should return true for valid 3-character lang', function () {
      assert.isTrue(axe.utils.isValidLang('bbb'));
    });

    it('should return true for valid 2-character lang', function () {
      assert.isTrue(axe.utils.isValidLang('aa'));
    });

    it('should return false for invalid lang', function () {
      assert.isFalse(axe.utils.isValidLang('xyz'));
    });

    it('should return false for invalid 2-character lang', function () {
      assert.isFalse(axe.utils.isValidLang('bb'));
    });

    it('should return false for invalid 1-character lang code', function () {
      assert.isFalse(axe.utils.isValidLang('a'));
    });

    it('should return false for invalid 4-character lang code', function () {
      assert.isFalse(axe.utils.isValidLang('abcd'));
    });

    it('should return false for empty string', function () {
      assert.isFalse(axe.utils.isValidLang(''));
    });

    it('should return false for invalid lang code', function () {
      assert.isFalse(axe.utils.isValidLang('123'));
    });
  });
});

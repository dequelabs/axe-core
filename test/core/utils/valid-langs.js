describe('axe.utils.isValidLang', () => {
  describe('isValidLang', () => {
    it('should return true for valid 3-character lang', () => {
      assert.isTrue(axe.utils.isValidLang('bbb'));
    });

    it('should return true for valid 2-character lang', () => {
      assert.isTrue(axe.utils.isValidLang('aa'));
    });

    it('should return false for invalid lang', () => {
      assert.isFalse(axe.utils.isValidLang('xyz'));
    });

    it('should return false for invalid 2-character lang', () => {
      assert.isFalse(axe.utils.isValidLang('bb'));
    });

    it('should return false for invalid 1-character lang code', () => {
      assert.isFalse(axe.utils.isValidLang('a'));
    });

    it('should return false for invalid 4-character lang code', () => {
      assert.isFalse(axe.utils.isValidLang('abcd'));
    });

    it('should return false for empty string', () => {
      assert.isFalse(axe.utils.isValidLang(''));
    });

    it('should return false for invalid lang code', () => {
      assert.isFalse(axe.utils.isValidLang('123'));
    });
  });

  describe('validLangs', () => {
    it('should return an array of langs', () => {
      assert.isTrue(Array.isArray(axe.utils.validLangs()));
    });

    it('should include valid langs', () => {
      const langs = axe.utils.validLangs();
      assert.isTrue(langs.indexOf('aaa') !== -1);
      assert.isTrue(langs.indexOf('aa') !== -1);
      assert.isTrue(langs.indexOf('en') !== -1);
      assert.isTrue(langs.indexOf('zzj') !== -1);
    });
  });
});

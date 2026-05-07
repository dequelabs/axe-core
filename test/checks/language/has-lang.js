describe('has-lang', () => {
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const hasLangEvaluate = axe.testUtils.getCheckEvaluate('has-lang');

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if a lang attribute is present', () => {
    const params = checkSetup('<div id="target" lang="woohoo"></div>');

    assert.isTrue(hasLangEvaluate.apply(checkContext, params));
  });

  it('should return false if only `xml:lang` attribute is present', () => {
    const params = checkSetup('<div id="target" xml:lang="cats"></div>');

    assert.isFalse(hasLangEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noXHTML');
  });

  it('should return true if both `lang` and `xml:lang` attribute is present', () => {
    const params = checkSetup(
      '<div id="target" lang="cats" xml:lang="cats"></div>'
    );

    assert.isTrue(hasLangEvaluate.apply(checkContext, params));
  });

  it('should return false if xml:lang and lang attributes are not present', () => {
    const params = checkSetup('<div id="target"></div>');

    assert.isFalse(hasLangEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noLang');
  });

  it('should return false if lang is left empty', () => {
    const params = checkSetup('<div id="target" lang=""></div>');

    assert.isFalse(hasLangEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noLang');
  });

  it('should support options.attributes', () => {
    const params = checkSetup('<div id="target" foo="cats"></div>', {
      attributes: ['foo']
    });

    assert.isTrue(hasLangEvaluate.apply(checkContext, params));
  });
});

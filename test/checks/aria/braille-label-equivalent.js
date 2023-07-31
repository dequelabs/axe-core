describe('braille-label-equivalent tests', () => {
  const { checkSetup, getCheckEvaluate } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = getCheckEvaluate('braille-label-equivalent');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true without aria-braillelabel', () => {
    const params = checkSetup('<img id="target" alt="" />');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when aria-braillelabel is empty', () => {
    const params = checkSetup(
      '<img id="target" alt="" aria-braillelabel="" />'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when aria-braillelabel is whitespace-only', () => {
    const params = checkSetup(
      '<img id="target" alt="" aria-braillelabel=" \r\t\n " />'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  describe('when aria-braillelabel has text', () => {
    it('returns false when the accessible name is empty', () => {
      const params = checkSetup(`
        <img id="target" alt="" aria-braillelabel="foo" />
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('returns false when the accessible name has only whitespace', () => {
      const params = checkSetup(`
        <img id="target" alt=" \r\t\n " aria-braillelabel="foo" />
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('returns true when the accessible name is not empty', () => {
      const params = checkSetup(`
        <img id="target" alt="foo" aria-braillelabel="foo" />
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });
  });
});

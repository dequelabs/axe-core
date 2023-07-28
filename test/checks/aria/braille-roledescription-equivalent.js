describe('braille-roledescription-equivalent tests', () => {
  const { checkSetup, getCheckEvaluate } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = getCheckEvaluate('braille-roledescription-equivalent');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true without aria-brailleroledescription', () => {
    const params = checkSetup('<div id="target"></div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when aria-brailleroledecription is empty', () => {
    const params = checkSetup(
      '<div id="target" aria-brailleroledescription=""></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when aria-brailleroledecription is whitespace-only', () => {
    const params = checkSetup(
      '<div id="target" aria-brailleroledescription=" \r\t\n "></div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  describe('when aria-brailleroledescription has text', () => {
    it('returns false without aria-roledescription', () => {
      const params = checkSetup(`
        <div
          id="target"
          aria-brailleroledescription="foo"
        ></div>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, { messageKey: 'noRoleDescription' });
    });

    it('returns false when aria-roledescription is empty', () => {
      const params = checkSetup(`
        <div
          id="target"
          aria-roledescription=""
          aria-brailleroledescription="foo"
        ></div>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        messageKey: 'emptyRoleDescription'
      });
    });

    it('returns false when aria-roledescription has only whitespace', () => {
      const params = checkSetup(`
        <div
          id="target"
          aria-roledescription=" \r\t\n "
          aria-brailleroledescription="foo"
        ></div>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
      assert.deepEqual(checkContext._data, {
        messageKey: 'emptyRoleDescription'
      });
    });

    it('returns true when aria-roledescription is not empty', () => {
      const params = checkSetup(`
        <div
          id="target"
          aria-roledescription="foo"
          aria-brailleroledescription="foo"
        ></div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });
  });
});

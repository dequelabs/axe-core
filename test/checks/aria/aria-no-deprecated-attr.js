describe('aria-no-deprecated-attr', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate(
    'aria-no-deprecated-attr'
  );

  afterEach(() => {
    checkContext.reset();
    axe.reset();
  });

  it('returns undefined (needs review) for a deprecated attribute', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-grabbed="true">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-grabbed']);
  });

  it('returns undefined for aria-dropeffect', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-dropeffect="copy">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-dropeffect']);
  });

  it('collects multiple deprecated attributes', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-grabbed="true" aria-dropeffect="copy">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-grabbed', 'aria-dropeffect']);
  });

  it('returns true when no deprecated attributes are used', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-label="foo">Contents</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('is data-driven from the standards object', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-fizz': {
            type: 'nmtoken',
            deprecated: true
          }
        }
      }
    });
    const params = checkSetup(
      '<div id="target" aria-fizz="buzz">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-fizz']);
  });
});

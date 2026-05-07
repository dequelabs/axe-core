describe('aria-valid-attr', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should return false if any invalid ARIA attributes are found', () => {
    const vNode = queryFixture(
      '<div id="target" tabindex="1" aria-cats="true" aria-dogs="true"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-cats', 'aria-dogs']);
  });

  it('should return true if no invalid ARIA attributes are found', () => {
    const vNode = queryFixture(
      '<div id="target" tabindex="1" aria-selected="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return true for unsupported ARIA attributes', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-mccheddarton': {
            unsupported: true
          }
        }
      }
    });

    const vNode = queryFixture(
      '<div id="target" tabindex="1" aria-mccheddarton="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  describe('options', () => {
    it('should exclude provided attribute names', () => {
      const vNode = queryFixture(
        '<div id="target" aria-bats="cat" aria-puppies="2"></div>'
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr')
          .call(checkContext, null, ['aria-bats', 'aria-puppies'], vNode)
      );
    });
  });
});

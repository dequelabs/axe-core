describe('aria-allowed-attr-matches', () => {
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-allowed-attr');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('should return true on elements that have aria attributes', () => {
    const vNode = queryFixture(
      '<div role="button" id="target" aria-label="Thing 1" aria-mccheddarton="Unsupported thing 2"></div>'
    );

    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false on elements that have no aria attributes', () => {
    const vNode = queryFixture('<div role="button" id="target"></div>');

    assert.isFalse(rule.matches(null, vNode));
  });
});

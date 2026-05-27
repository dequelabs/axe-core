describe('aria-has-attr-matches', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-valid-attr-value');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('should return false if an element has no attributes', () => {
    const vNode = fixtureSetup('<div></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return false if an element has no ARIA attributes', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
  it('should return true if an element has ARIA attributes', () => {
    const vNode = queryFixture('<div id="target" aria-bats="monkeys"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });
});

describe('aria-required-parent-matches', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-required-parent');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true for a role that requires parent', () => {
    const vNode = queryFixture('<div id="target" role="listitem"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false for a role that does not require parent', () => {
    const vNode = queryFixture('<div id="target" role="alert"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
});

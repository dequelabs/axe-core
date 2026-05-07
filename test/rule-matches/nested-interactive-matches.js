describe('nested-interactive-matches', () => {
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('nested-interactive');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should match if element has children presentational', () => {
    const vNode = queryFixture('<button id="target"></button>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should match if aria element has children presentational', () => {
    const vNode = queryFixture('<div role="button" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should not match if element does not have children presentational', () => {
    const vNode = queryFixture('<a href="foo.html" id="target"></a>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should not match if element has no role', () => {
    const vNode = queryFixture('<span id="target"></span>');
    assert.isFalse(rule.matches(null, vNode));
  });
});

describe('no-negative-tabindex-matches', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const rule = axe.utils.getRule('frame-title');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns true for nodes with no tabindex', () => {
    const vNode = queryFixture('<div id="target"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a zero tabindex', () => {
    const vNode = queryFixture('<div id="target" tabindex="0"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with a positive tabindex', () => {
    const vNode = queryFixture('<div id="target" tabindex="4"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns true for nodes with an invalid tabindex', () => {
    const vNode = queryFixture('<div id="target" tabindex="foo"></div>');
    const actual = rule.matches(null, vNode);
    assert.isTrue(actual);
  });

  it('returns false for nodes with a negative tabindex', () => {
    const vNode = queryFixture('<div id="target" tabindex="-10"></div>');
    const actual = rule.matches(null, vNode);
    assert.isFalse(actual);
  });
});

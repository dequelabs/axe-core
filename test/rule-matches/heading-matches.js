describe('heading-matches', () => {
  const html = axe.testUtils.html;
  const queryFixture = axe.testUtils.queryFixture;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('empty-heading');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('should return false on elements that are not headings', () => {
    const vNode = fixtureSetup('<div></div>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return true on elements with role="heading"', () => {
    const vNode = queryFixture('<div role="heading" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on regular headings without roles', () => {
    for (let i = 1; i <= 6; i++) {
      const vNode = queryFixture(html`<h${i} id="target"></h${i}>`);
      assert.isTrue(rule.matches(null, vNode));
    }
  });

  it('should return false on headings with their role changes', () => {
    const vNode = queryFixture('<h1 role="banner" id="target"></h1>');
    assert.isFalse(rule.matches(null, vNode));
  });

  it('should return true on headings with their role changes to an invalid role', () => {
    const vNode = queryFixture('<h1 role="bruce" id="target"></h1>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on headings with their role changes to an abstract role', () => {
    const vNode = queryFixture('<h1 role="widget" id="target"></h1>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true on headings with explicit role="none" and an empty aria-label to account for presentation conflict resolution', () => {
    const vNode = queryFixture(
      '<h1 aria-label="" role="none" id="target"></h1>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });
});

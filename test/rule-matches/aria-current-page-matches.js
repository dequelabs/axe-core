describe('aria-current-page-matches', () => {
  const { queryFixture } = axe.testUtils;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-current-page');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('returns true for a link marked aria-current="page"', () => {
    const vNode = queryFixture(
      '<a id="target" href="/x" aria-current="page">x</a>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });

  it('matches the aria-current value case-insensitively', () => {
    const vNode = queryFixture(
      '<a id="target" href="/x" aria-current="PAGE">x</a>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns true for an area marked aria-current="page"', () => {
    const vNode = queryFixture(
      '<map name="m"><area id="target" href="/x" aria-current="page" alt="x"></map>'
    );
    assert.isTrue(rule.matches(null, vNode));
  });

  it('returns false for other aria-current values', () => {
    for (const value of ['true', 'step', 'false', '']) {
      const vNode = queryFixture(
        `<a id="target" href="/x" aria-current="${value}">x</a>`
      );
      assert.isFalse(rule.matches(null, vNode), value);
    }
  });

  it('returns false for a fragment-only href', () => {
    const vNode = queryFixture(
      '<a id="target" href="#main" aria-current="page">x</a>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('returns true for a fragment-only hash route', () => {
    for (const href of ['#/users', '#!/users']) {
      const vNode = queryFixture(
        `<a id="target" href="${href}" aria-current="page">x</a>`
      );
      assert.isTrue(rule.matches(null, vNode), href);
    }
  });

  it('returns false for a javascript: URL', () => {
    const vNode = queryFixture(
      '<a id="target" href="javascript:void(0)" aria-current="page">x</a>'
    );
    assert.isFalse(rule.matches(null, vNode));
  });

  it('is not selected without an href', () => {
    axe.testUtils.fixtureSetup('<a aria-current="page">x</a>');
    assert.lengthOf(axe.utils.querySelectorAll(axe._tree[0], rule.selector), 0);
  });
});

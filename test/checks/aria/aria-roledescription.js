describe('aria-roledescription', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true for elements with an implicit supported role', () => {
    const vNode = queryFixture(
      '<button aria-roledescription="Awesome Button" id="target">Click</button>'
    );
    const actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
      checkContext,
      null,
      {
        supportedRoles: ['button']
      },
      vNode
    );
    assert.equal(actual, true);
    assert.isNull(checkContext._data, null);
  });

  it('returns true for elements with an explicit supported role', () => {
    const vNode = queryFixture(
      '<div role="radio" aria-roledescription="Awesome Radio" id="target">Click</div>'
    );
    const actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
      checkContext,
      null,
      {
        supportedRoles: ['radio']
      },
      vNode
    );
    assert.equal(actual, true);
    assert.isNull(checkContext._data, null);
  });

  it('returns undefined for elements with an unsupported role', () => {
    const vNode = queryFixture(
      '<div role="main" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    const actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, undefined);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements without role', () => {
    const vNode = queryFixture(
      '<div aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    const actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=presentation', () => {
    const vNode = queryFixture(
      '<div role="presentation" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    const actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=none', () => {
    const vNode = queryFixture(
      '<div role="none" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );

    const actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });
});

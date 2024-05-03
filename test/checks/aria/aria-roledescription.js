describe('aria-roledescription', function () {
  'use strict';

  let checkContext = axe.testUtils.MockCheckContext();
  let queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true for elements with an implicit supported role', function () {
    let vNode = queryFixture(
      '<button aria-roledescription="Awesome Button" id="target">Click</button>'
    );
    let actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
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

  it('returns true for elements with an explicit supported role', function () {
    let vNode = queryFixture(
      '<div role="radio" aria-roledescription="Awesome Radio" id="target">Click</div>'
    );
    let actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
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

  it('returns undefined for elements with an unsupported role', function () {
    let vNode = queryFixture(
      '<div role="main" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    let actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, undefined);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements without role', function () {
    let vNode = queryFixture(
      '<div aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    let actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=presentation', function () {
    let vNode = queryFixture(
      '<div role="presentation" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    let actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=none', function () {
    let vNode = queryFixture(
      '<div role="none" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );

    let actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });
});

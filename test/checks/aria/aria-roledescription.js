describe('aria-roledescription', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true for elements with an implicit supported role', function () {
    var vNode = queryFixture(
      '<button aria-roledescription="Awesome Button" id="target">Click</button>'
    );
    var actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
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
    var vNode = queryFixture(
      '<div role="radio" aria-roledescription="Awesome Radio" id="target">Click</div>'
    );
    var actual = axe.testUtils.getCheckEvaluate('aria-roledescription').call(
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
    var vNode = queryFixture(
      '<div role="main" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, undefined);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements without role', function () {
    var vNode = queryFixture(
      '<div aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=presentation', function () {
    var vNode = queryFixture(
      '<div role="presentation" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=none', function () {
    var vNode = queryFixture(
      '<div role="none" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );

    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, null, {}, vNode);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });
});

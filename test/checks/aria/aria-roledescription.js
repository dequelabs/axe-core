describe.only('aria-roledescription', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var queryFixture = axe.testUtils.queryFixture;
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  afterEach(function () {
    checkContext.reset();
  });

  it('returns true for elements with an implicit supported role', function () {
    var virtualNode = queryFixture(
      '<button aria-roledescription="Awesome Button" id="target">Click</button>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild, {
        supportedRoles: ['button']
      });
    assert.equal(actual, true);
    assert.isNull(checkContext._data, null);
  });

  it('returns true for elements with an explicit supported role', function () {
    var virtualNode = queryFixture(
      '<div role="radio" aria-roledescription="Awesome Radio"  id="target">Click</div>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild, {
        supportedRoles: ['radio']
      });
    assert.equal(actual, true);
    assert.isNull(checkContext._data, null);
  });

  it('returns undefined for elements with an unsupported role', function () {
    var virtualNode = queryFixture(
      '<div role="main" aria-roledescription="Awesome Main"  id="target">The main element</div>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild);
    assert.equal(actual, undefined);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements without role', function () {
    var virtualNode = queryFixture(
      '<div aria-roledescription="Awesome Main">The main element</div>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=presentation', function () {
    var virtualNode = queryFixture(
      '<div role="presentation" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });

  it('returns false for elements with role=none', function () {
    var virtualNode = queryFixture(
      '<div role="none" aria-roledescription="Awesome Main" id="target">The main element</div>'
    );
    flatTreeSetup(virtualNode);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-roledescription')
      .call(checkContext, virtualNode.firstChild);
    assert.equal(actual, false);
    assert.isNull(checkContext._data, null);
  });
});

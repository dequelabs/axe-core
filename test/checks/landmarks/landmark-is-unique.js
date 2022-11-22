describe('landmark-is-unique', function () {
  'use strict';

  var checkContext = new axe.testUtils.MockCheckContext();
  var fixture;
  var axeFixtureSetup;

  beforeEach(function () {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
  });

  afterEach(function () {
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true, with correct role and no accessible text', function () {
    axeFixtureSetup('<div role="main">test</div>');
    var node = fixture.querySelector('div');
    var expectedData = {
      accessibleText: null,
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('landmark-is-unique')
        .call(checkContext, node, {}, virtualNode)
    );
    assert.deepEqual(checkContext._data, expectedData);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });

  it('should return true, with correct role and the accessible text lowercased', function () {
    axeFixtureSetup('<div role="main" aria-label="TEST text">test</div>');
    var node = fixture.querySelector('div');
    var expectedData = {
      accessibleText: 'test text',
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    var virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('landmark-is-unique')
        .call(checkContext, node, {}, virtualNode)
    );
    assert.deepEqual(checkContext._data, expectedData);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });
});

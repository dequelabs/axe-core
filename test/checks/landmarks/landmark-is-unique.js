describe('landmark-is-unique', function () {
  'use strict';

  let checkContext = new axe.testUtils.MockCheckContext();
  let fixture;
  let axeFixtureSetup;

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
    let node = fixture.querySelector('div');
    let expectedData = {
      accessibleText: null,
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
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
    let node = fixture.querySelector('div');
    let expectedData = {
      accessibleText: 'test text',
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('landmark-is-unique')
        .call(checkContext, node, {}, virtualNode)
    );
    assert.deepEqual(checkContext._data, expectedData);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });
});

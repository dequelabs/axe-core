describe('landmark-is-unique', () => {
  const checkContext = new axe.testUtils.MockCheckContext();
  let fixture;
  let axeFixtureSetup;

  beforeEach(() => {
    fixture = document.getElementById('fixture');
    axeFixtureSetup = axe.testUtils.fixtureSetup;
  });

  afterEach(() => {
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true, with correct role and no accessible text', () => {
    axeFixtureSetup('<div role="main">test</div>');
    const node = fixture.querySelector('div');
    const expectedData = {
      accessibleText: null,
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('landmark-is-unique')
        .call(checkContext, node, {}, virtualNode)
    );
    assert.deepEqual(checkContext._data, expectedData);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });

  it('should return true, with correct role and the accessible text lowercased', () => {
    axeFixtureSetup('<div role="main" aria-label="TEST text">test</div>');
    const node = fixture.querySelector('div');
    const expectedData = {
      accessibleText: 'test text',
      role: 'main'
    };
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('landmark-is-unique')
        .call(checkContext, node, {}, virtualNode)
    );
    assert.deepEqual(checkContext._data, expectedData);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });
});

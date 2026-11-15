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
    const { contentHash, ...data } = checkContext._data;
    assert.deepEqual(data, expectedData);
    assert.isString(contentHash);
    assert.deepEqual(checkContext._relatedNodes, [node]);
  });

  it('should return a content hash for labelled landmarks with content', () => {
    axeFixtureSetup(
      '<nav aria-label="Pages"><a href="#1">1</a> <a href="#2">2</a></nav>' +
        '<nav aria-label="Pages"><a href="#1">1</a> <a href="#2">2</a></nav>' +
        '<nav aria-label="Pages"><a href="#3">3</a> <a href="#4">4</a></nav>'
    );
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const evaluate = axe.testUtils.getCheckEvaluate('landmark-is-unique');
    const hashes = Array.from(fixture.querySelectorAll('nav')).map(node => {
      const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
      assert.isTrue(evaluate.call(checkContext, node, {}, virtualNode));
      return checkContext._data.contentHash;
    });

    assert.isString(hashes[0]);
    assert.equal(hashes[0], hashes[1]);
    assert.notEqual(hashes[0], hashes[2]);
  });

  it('should not return a content hash for labelled landmarks without content', () => {
    axeFixtureSetup('<nav aria-label="Pages"></nav>');
    const node = fixture.querySelector('nav');
    axe._tree = axe.utils.getFlattenedTree(fixture);
    const virtualNode = axe.utils.getNodeFromTree(axe._tree[0], node);
    axe.testUtils
      .getCheckEvaluate('landmark-is-unique')
      .call(checkContext, node, {}, virtualNode);
    assert.deepEqual(checkContext._data, {
      accessibleText: 'pages',
      role: 'navigation'
    });
  });
});

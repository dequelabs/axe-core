describe('axe.setup', () => {
  afterEach(() => {
    axe.teardown();
  });

  it('should setup the tree', () => {
    axe._tree = undefined;
    axe.setup();
    assert.exists(axe._tree);
  });

  it('should default the tree to use html element', () => {
    axe.setup();
    assert.equal(axe._tree[0].actualNode, document.documentElement);
  });

  it('should use the passed in node as the root of the tree', () => {
    axe.setup(document.body);
    assert.equal(axe._tree[0].actualNode, document.body);
  });

  it('should return the root node', () => {
    const vNode = axe.setup(document.body);
    assert.equal(vNode.actualNode, document.body);
  });

  it('should setup selector data', () => {
    axe._selectorData = undefined;
    axe.setup();
    assert.exists(axe._selectorData);
  });

  it('takes documentElement when passed the document', () => {
    axe.setup(document);
    assert.equal(axe._tree[0].actualNode, document.documentElement);
  });

  it('should throw if called twice in a row', () => {
    function fn() {
      axe.setup();
      axe.setup();
    }

    assert.throws(fn);
  });
});

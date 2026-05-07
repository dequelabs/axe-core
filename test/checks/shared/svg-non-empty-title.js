describe('svg-non-empty-title tests', () => {
  const fixture = document.getElementById('fixture');
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('svg-non-empty-title');

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if the element has a `title` child', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><title>Time II: Party</title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if the `title` child has text nested in another element', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><title><g>Time II: Party</g></title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if the element has a `title` child with `display:none`', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><title style="display: none;">Time II: Party</title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if the element has no `title` child', () => {
    const checkArgs = checkSetup('<svg id="target"></svg>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'noTitle');
  });

  it('returns false if the `title` child is empty', () => {
    const checkArgs = checkSetup('<svg id="target"><title></title></svg>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  it('returns false if the `title` is a grandchild', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><circle><title>Time II: Party</title></circle></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'noTitle');
  });

  it('returns false if the `title` child has only whitespace', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><title> \t\r\n </title></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  it('returns false if there are multiple titles, and the first is empty', () => {
    const checkArgs = checkSetup(
      '<svg id="target"><title></title><title>Time II: Party</title></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  describe('Serial Virtual Node', () => {
    it('returns true if the element has a `title` child', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      const child = new axe.SerialVirtualNode({
        nodeName: 'title'
      });
      const text = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'Time II: Party'
      });
      child.parent = serialNode;
      child.children = [text];
      serialNode.children = [child];
      const checkArgs = [null, {}, serialNode];

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    });

    it('returns false if the element has no `title` child', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      serialNode.children = [];
      const checkArgs = [null, {}, serialNode];

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.messageKey, 'noTitle');
    });

    it('returns undefined if the element has empty children', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      const checkArgs = [null, {}, serialNode];

      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
    });
  });
});

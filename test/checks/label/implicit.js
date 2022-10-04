describe('implicit-label', () => {
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('implicit-label');
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('returns false if an empty label is present', () => {
    const params = checkSetup('<label><input type="text" id="target"></label>');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns false on an empty label when then control has a value', () => {
    const params = checkSetup(
      '<label><input type="text" id="target" value="snacks"></label>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns false if an invisible non-empty label is present', () => {
    const params = checkSetup(
      '<label><span style="display: none">Text</span> <input type="text" id="target"></label>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns true if a non-empty label is present', () => {
    const params = checkSetup(
      '<label>Text <input type="text" id="target"></label>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns false if a label is not present', () => {
    const node = document.createElement('input');
    node.type = 'text';
    fixtureSetup(node);
    const virtualNode = axe.utils.getNodeFromTree(node);
    assert.isFalse(checkEvaluate.call(checkContext, null, {}, virtualNode));
  });

  describe('data', () => {
    it('is null if there is no label', () => {
      const params = checkSetup('<input type="text" id="target">');
      checkEvaluate.apply(checkContext, params);
      assert.isNull(checkContext._data);
    });

    it('includes the implicit label if one is set', () => {
      const params = checkSetup(
        '<label>Some <input type="text" id="target"> text</label>'
      );
      checkEvaluate.apply(checkContext, params);
      assert.deepEqual(checkContext._data, { implicitLabel: 'Some text' });
    });

    it('has { implicitLabel: "" } when the label is empty', () => {
      const params = checkSetup(
        '<label> <input type="text" id="target"> </label>'
      );
      checkEvaluate.apply(checkContext, params);
      assert.deepEqual(checkContext._data, { implicitLabel: '' });
    });
  });

  describe('relatedNodes', () => {
    it('is null if there is no label', () => {
      const params = checkSetup('<input type="text" id="target">');
      checkEvaluate.apply(checkContext, params);
      assert.isEmpty(checkContext._relatedNodes);
    });

    it('includes the nearest label as its related node', () => {
      const params = checkSetup(
        '<label id="lbl"> <input type="text" id="target"> </label>'
      );
      checkEvaluate.apply(checkContext, params);
      const ids = checkContext._relatedNodes.map(node => '#' + node.id);
      assert.deepEqual(ids, ['#lbl']);
    });
  });

  describe('SerialVirtualNode', () => {
    it('returns false if no implicit label', () => {
      const virtualNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text'
        }
      });
      virtualNode.parent = null;
      assert.isFalse(checkEvaluate.call(checkContext, null, {}, virtualNode));
    });

    it('returns undefined if tree is not complete', () => {
      const virtualNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text'
        }
      });
      assert.isUndefined(
        checkEvaluate.call(checkContext, null, {}, virtualNode)
      );
    });
  });
});

describe('explicit-label', () => {
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('explicit-label');
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('returns false if an empty label is present', () => {
    const params = checkSetup(
      '<label for="target"></label><input type="text" id="target">'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns false if the label is empty except for the target value', () => {
    const params = checkSetup(
      '<label for="target"> <input type="text" id="target" value="snacks"> </label>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns false if an empty label is present that uses aria-labelledby', () => {
    const params = checkSetup(
      '<input type="text" id="target">' +
        '<label for="target" aria-labelledby="lbl"></label>' +
        '<span id="lbl">aria label</span>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns true if a non-empty label is present', () => {
    const params = checkSetup(
      '<label for="target">Text</label><input type="text" id="target">'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true if an invisible non-empty label is present, to defer to hidden-explicit-label', () => {
    const params = checkSetup(
      '<label for="target" style="display: none;">Text</label><input type="text" id="target">'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns false if a label is not present', () => {
    const params = checkSetup('<input type="text" id="target" />');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('should work for multiple labels', () => {
    const params = checkSetup(
      '<label for="target"></label><label for="target">Text</label><input type="text" id="target">'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  describe('.data', () => {
    it('is null if there is no label', () => {
      const params = checkSetup('<input type="text" id="target" />');
      checkEvaluate.apply(checkContext, params);
      assert.isNull(checkContext._data);
    });

    it('includes the `explicitLabel` text of the first non-empty label', () => {
      const params = checkSetup(
        '<label for="target">  </label>' +
          '<label for="target"> text </label>' +
          '<label for="target"> more text </label>' +
          '<input type="text" id="target" />'
      );
      checkEvaluate.apply(checkContext, params);
      assert.deepEqual(checkContext._data, { explicitLabel: 'text' });
    });

    it('is empty { explicitLabel: "" } if the label is empty', () => {
      const params = checkSetup(
        '<label for="target">  </label>' +
          '<label for="target"></label>' +
          '<input type="text" id="target" />'
      );
      checkEvaluate.apply(checkContext, params);
      assert.deepEqual(checkContext._data, { explicitLabel: '' });
    });
  });

  describe('related nodes', () => {
    it('is empty when there are no labels', () => {
      const params = checkSetup('<input type="text" id="target" />');
      checkEvaluate.apply(checkContext, params);
      assert.isEmpty(checkContext._relatedNodes);
    });

    it('includes each associated label', () => {
      const params = checkSetup(
        '<label for="target" id="lbl1"></label>' +
          '<label for="target" id="lbl2"></label>' +
          '<input type="text" id="target" />'
      );
      checkEvaluate.apply(checkContext, params);
      const ids = checkContext._relatedNodes.map(node => '#' + node.id);
      assert.deepEqual(ids, ['#lbl1', '#lbl2']);
    });
  });

  describe('with shadow DOM', () => {
    it('returns true if input and label are in the same shadow root', () => {
      const root = document.createElement('div');
      const shadow = root.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<label for="target">American band</label><input id="target">';
      fixtureSetup(root);

      const vNode = axe.utils.getNodeFromTree(shadow.querySelector('#target'));
      assert.isTrue(checkEvaluate.call(checkContext, null, {}, vNode));
    });

    it('returns true if label content is slotted', () => {
      const root = document.createElement('div');
      root.innerHTML = 'American band';
      const shadow = root.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<label for="target"><slot></slot></label><input id="target">';
      fixtureSetup(root);

      const vNode = axe.utils.getNodeFromTree(shadow.querySelector('#target'));
      assert.isTrue(checkEvaluate.call(checkContext, null, {}, vNode));
    });

    it('returns false if input is inside shadow DOM and the label is not', () => {
      const root = document.createElement('div');
      root.innerHTML = '<label for="target">American band</label>';
      const shadow = root.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<slot></slot><input id="target">';
      fixtureSetup(root);

      const vNode = axe.utils.getNodeFromTree(shadow.querySelector('#target'));
      assert.isFalse(checkEvaluate.call(checkContext, null, {}, vNode));
    });

    it('returns false if label is inside shadow DOM and the input is not', () => {
      const root = document.createElement('div');
      root.innerHTML = '<input id="target">';
      const shadow = root.attachShadow({ mode: 'open' });
      shadow.innerHTML =
        '<label for="target">American band</label><slot></slot>';
      fixtureSetup(root);

      const vNode = axe.utils.getNodeFromTree(root.querySelector('#target'));
      assert.isFalse(checkEvaluate.call(checkContext, null, {}, vNode));
    });
  });

  describe('SerialVirtualNode', () => {
    it('returns undefined', () => {
      const virtualNode = new axe.SerialVirtualNode({
        nodeName: 'input',
        attributes: {
          type: 'text'
        }
      });
      assert.isFalse(checkEvaluate.call(checkContext, null, {}, virtualNode));
    });
  });
});

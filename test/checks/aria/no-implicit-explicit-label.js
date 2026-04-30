describe('no-implicit-explicit-label', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const check = checks['no-implicit-explicit-label'];
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns false when there is no label text or accessible text', () => {
    const vNode = queryFixture(
      '<div id="target" role="searchbox" contenteditable="true"></div>'
    );
    const actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  it('returns undefined when there is no accessible text', () => {
    const vNode = queryFixture(
      '<label for="target">Choose currency:</label><div id="target" role="searchbox" contenteditable="true"></div>'
    );
    const actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns undefined when accessible text does not contain label text', () => {
    const vNode = queryFixture(
      '<label for="target">Choose country:</label><div id="target" aria-label="country" role="combobox">England</div>'
    );
    const actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isUndefined(actual);
  });

  it('returns false when accessible text contains label text', () => {
    const vNode = queryFixture(
      '<label for="target">Country</label><div id="target" aria-label="Choose country" role="combobox">England</div>'
    );
    const actual = check.evaluate.call(checkContext, null, {}, vNode);
    assert.isFalse(actual);
  });

  describe('SerialVirtualNode', () => {
    it('should return false if there is no parent', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });
      serialNode.parent = null;

      const actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isFalse(actual);
    });

    it('should return undefined if incomplete tree', () => {
      const serialNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          role: 'combobox',
          'aria-label': 'woohoo'
        }
      });

      const actual = check.evaluate.call(checkContext, null, {}, serialNode);
      assert.isUndefined(actual);
    });
  });
});

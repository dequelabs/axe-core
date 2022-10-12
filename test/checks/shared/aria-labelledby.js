describe('aria-labelledby', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('aria-labelledby');

  it('should return true if an aria-labelledby and its target is present', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo"></div><div id="woohoo">bananas</div>'
    );
    assert.isTrue(checkEvaluate(null, {}, node));
  });

  it('should return true if only one element referenced by aria-labelledby has visible text', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo">bananas</div>'
    );
    assert.isTrue(checkEvaluate(null, {}, node));
  });

  it('should return false if an aria-labelledby is not present', () => {
    const node = queryFixture('<div id="target"></div>');
    assert.isFalse(checkEvaluate(null, {}, node));
  });

  it('should return true if an aria-labelledby is present that references hidden elements', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo" style="display:none">bananas</div>'
    );
    assert.isTrue(checkEvaluate(null, {}, node));
  });

  it('should return false if an aria-labelledby is present, but references an element with only hidden content', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo noexist hehe"></div><div id="woohoo"><span style="display: none">bananas</span></div>'
    );
    assert.isFalse(checkEvaluate(null, {}, node));
  });

  it('returns false if aria-labelledby refers to the own element', () => {
    const vNode = queryFixture(
      '<input aria-labelledby="target" value="in the sky" id="target">'
    );
    assert.isFalse(checkEvaluate(null, {}, vNode));
  });

  it('returns false if aria-labelledby refers to parent, and there are no sibling', () => {
    const vNode = queryFixture(
      '<div id="lbl"> <input aria-labelledby="lbl" value="in the sky" id="target"> </div>'
    );
    assert.isFalse(checkEvaluate(null, {}, vNode));
  });

  it('should return true if an aria-labelledby is present that references elements with has aria-hidden=true', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo"></div><div id="woohoo" aria-hidden="true">bananas</div>'
    );
    assert.isTrue(checkEvaluate(null, {}, node));
  });

  it('should return false if an aria-labelledby is present that references elements with has aria-hidden=true in the content', () => {
    const node = queryFixture(
      '<div id="target" aria-labelledby="woohoo"></div><div id="woohoo"><span aria-hidden="true">bananas</span></div>'
    );
    assert.isFalse(checkEvaluate(null, {}, node));
  });

  describe('SerialVirtualNode', () => {
    it('should return false if an aria-labelledby is not present', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'div'
      });
      assert.isFalse(checkEvaluate(null, {}, node));
    });

    it('should return undefined if an aria-labelledby is present', () => {
      const node = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-labelledby': 'woohoo'
        }
      });
      assert.isUndefined(checkEvaluate(null, {}, node));
    });
  });
});

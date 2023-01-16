describe('dom.is-inert', () => {
  const isInert = axe.commons.dom.isInert;
  const { queryFixture } = axe.testUtils;

  it('should return true for element with "inert=false`', () => {
    const vNode = queryFixture('<div id="target" inert="false"></div>');

    assert.isTrue(isInert(vNode));
  });

  it('should return true for element with "inert`', () => {
    const vNode = queryFixture('<div id="target" inert></div>');

    assert.isTrue(isInert(vNode));
  });

  it('should return false for element without inert', () => {
    const vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(isInert(vNode));
  });

  it('should return true for ancestor with inert', () => {
    const vNode = queryFixture(
      '<div inert><div><div id="target"></div></div></div>'
    );

    assert.isTrue(isInert(vNode));
  });

  describe('options.skipAncestors', () => {
    it('should return false for ancestor with inert', () => {
      const vNode = queryFixture(
        '<div inert><div><div id="target"></div></div></div>'
      );

      assert.isFalse(isInert(vNode, { skipAncestors: true }));
    });
  });
});

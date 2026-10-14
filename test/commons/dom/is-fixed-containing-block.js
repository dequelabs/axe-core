describe('dom.isFixedContainingBlock', () => {
  const { queryFixture } = axe.testUtils;
  const isFixedContainingBlock = axe.commons.dom.isFixedContainingBlock;

  ['static', 'relative', 'absolute', 'fixed', 'sticky'].forEach(position => {
    it(`returns false for position: ${position}`, () => {
      const vNode = queryFixture(
        `<div id="target" style="position: ${position}"></div>`
      );
      assert.isFalse(isFixedContainingBlock(vNode));
    });
  });

  it('returns true for a transformed element', () => {
    const vNode = queryFixture(
      '<div id="target" style="transform: translateX(0)"></div>'
    );
    assert.isTrue(isFixedContainingBlock(vNode));
  });

  it('returns false for display: contents', () => {
    const vNode = queryFixture(
      '<div id="target" style="display: contents; transform: translateX(0)"></div>'
    );
    assert.isFalse(isFixedContainingBlock(vNode));
  });
});

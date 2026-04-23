describe('dom.getRootChildren', () => {
  const getRootChildren = axe.commons.dom.getRootChildren;
  const fixture = document.querySelector('#fixture');
  const queryShadowFixture = axe.testUtils.queryShadowFixture;

  it('should return the children of the root node of a complete tree', () => {
    axe.setup();
    const expected = axe.utils.getNodeFromTree(
      document.documentElement
    ).children;
    assert.deepEqual(getRootChildren(fixture), expected);
  });

  it('should return undefined for disconnected tree', () => {
    axe.setup();
    axe.utils.getNodeFromTree(document.documentElement).parent = undefined;
    assert.isUndefined(getRootChildren(fixture));
  });

  it('should throw for shadow DOM', () => {
    const target = queryShadowFixture(
      '<div id="shadow"></div>',
      '<div id="target">Hello World</div><div id="child1"></div><div id="child2"></div>'
    );

    assert.throws(() => {
      getRootChildren(target);
    });
  });
});

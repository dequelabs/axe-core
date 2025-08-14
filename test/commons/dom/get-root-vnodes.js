describe('dom.getRootVNodes', () => {
  const getRootVNodes = axe.commons.dom.getRootVNodes;
  const fixture = document.querySelector('#fixture');
  const queryShadowFixture = axe.testUtils.queryShadowFixture;

  it('should return the root vNode of complete tree', () => {
    axe.setup();
    const expected = [axe.utils.getNodeFromTree(document.documentElement)];
    assert.deepEqual(getRootVNodes(fixture), expected);
  });

  it('should return undefined for disconnected tree', () => {
    axe.setup();
    axe.utils.getNodeFromTree(document.documentElement).parent = undefined;
    assert.isUndefined(getRootVNodes(fixture));
  });

  it('should return each child of a shadow DOM host', () => {
    const target = queryShadowFixture(
      '<div id="shadow"></div>',
      '<div id="target">Hello World</div><div id="child1"></div><div id="child2"></div>'
    );

    const expected = target.parent.children;
    assert.deepEqual(getRootVNodes(target), expected);
  });
});

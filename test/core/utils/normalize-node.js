describe('axe.utils.normalizeNode', () => {
  const normalizeNode = axe.utils.normalizeNode;
  const queryFixture = axe.testUtils.queryFixture;

  it('returns the virtual node and DOM node when passed a virtual node', () => {
    const expected = queryFixture('<div id="target">Hello</div>');

    const { vNode, node } = normalizeNode(expected);
    assert.equal(expected, vNode);
    assert.equal(expected.actualNode, node);
  });

  it('returns the virtual node and DOM node when passed a virtual node', () => {
    const expected = queryFixture('<div id="target">Hello</div>');

    const { vNode, node } = normalizeNode(expected.actualNode);
    assert.equal(expected, vNode);
    assert.equal(expected.actualNode, node);
  });
});

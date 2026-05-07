describe('hasVisualOverlap', () => {
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const hasVisualOverlap = axe.commons.math.hasVisualOverlap;

  it('returns false if there is no overlap', () => {
    const rootNode = fixtureSetup('<a>foo</a><b>bar</b>');
    const vNodeA = rootNode.children[0];
    const vNodeB = rootNode.children[1];
    assert.isFalse(hasVisualOverlap(vNodeA, vNodeB));
  });

  it('returns true if B overlaps A', () => {
    const rootNode = fixtureSetup('<a><b>bar</b></a>');
    const vNodeA = rootNode.children[0];
    const vNodeB = vNodeA.children[0];
    assert.isTrue(hasVisualOverlap(vNodeA, vNodeB));
  });

  it('returns true A overlaps B', () => {
    const rootNode = fixtureSetup('<b><a>bar</a></b>');
    const vNodeB = rootNode.children[0];
    const vNodeA = vNodeB.children[0];
    assert.isFalse(hasVisualOverlap(vNodeA, vNodeB));
  });
});

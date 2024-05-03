describe('hasVisualOverlap', function () {
  'use strict';
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let hasVisualOverlap = axe.commons.math.hasVisualOverlap;

  it('returns false if there is no overlap', function () {
    let rootNode = fixtureSetup('<a>foo</a><b>bar</b>');
    let vNodeA = rootNode.children[0];
    let vNodeB = rootNode.children[1];
    assert.isFalse(hasVisualOverlap(vNodeA, vNodeB));
  });

  it('returns true if B overlaps A', function () {
    let rootNode = fixtureSetup('<a><b>bar</b></a>');
    let vNodeA = rootNode.children[0];
    let vNodeB = vNodeA.children[0];
    assert.isTrue(hasVisualOverlap(vNodeA, vNodeB));
  });

  it('returns true A overlaps B', function () {
    let rootNode = fixtureSetup('<b><a>bar</a></b>');
    let vNodeB = rootNode.children[0];
    let vNodeA = vNodeB.children[0];
    assert.isFalse(hasVisualOverlap(vNodeA, vNodeB));
  });
});

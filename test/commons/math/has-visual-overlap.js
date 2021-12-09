describe('hasVisualOverlap', function () {
  'use strict';
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var hasVisualOverlap = axe.commons.math.hasVisualOverlap;

  // hasVisualOverlap requires the grid to be set up
  // For performance reasons axe-core does not do this in setup,
  // so we'll need to call it ourselves.
  var createGrid = axe.commons.dom.createGrid;

  it('returns 0 if there is no overlap', function () {
    var rootNode = fixtureSetup('<a>foo</a><b>bar</b>');
    createGrid();
    var vNodeA = rootNode.children[0];
    var vNodeB = rootNode.children[1];
    assert.equal(hasVisualOverlap(vNodeA, vNodeB), 0);
  });

  it('returns 1 if B overlaps A', function () {
    var rootNode = fixtureSetup('<a><b>bar</b></a>');
    createGrid();
    var vNodeA = rootNode.children[0];
    var vNodeB = vNodeA.children[0];
    assert.equal(hasVisualOverlap(vNodeA, vNodeB), 1);
  });

  it('returns -1 if A overlaps B', function () {
    var rootNode = fixtureSetup('<b><a>bar</a></b>');
    createGrid();
    var vNodeB = rootNode.children[0];
    var vNodeA = vNodeB.children[0];
    assert.equal(hasVisualOverlap(vNodeA, vNodeB), -1);
  });
});

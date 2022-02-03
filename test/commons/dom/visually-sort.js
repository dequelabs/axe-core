// This method is mostly tested through color-contrast integrations
describe('visually-sort', function () {
  'use strict';

  var fixtureSetup = axe.testUtils.fixtureSetup;
  var visuallySort = axe.commons.dom.visuallySort;

  // visuallySort requires the grid to be set up
  // For performance reasons axe-core does not do this in setup,
  // so we'll need to call it ourselves.
  var createGrid = axe.commons.dom.createGrid;

  it('returns 1 if B overlaps A', function () {
    var rootNode = fixtureSetup('<a><b>bar</b></a>');
    createGrid();
    var vNodeA = rootNode.children[0];
    var vNodeB = vNodeA.children[0];
    assert.equal(visuallySort(vNodeA, vNodeB), 1);
  });

  it('returns -1 if A overlaps B', function () {
    var rootNode = fixtureSetup('<b><a>bar</a></b>');
    createGrid();
    var vNodeB = rootNode.children[0];
    var vNodeA = vNodeB.children[0];
    assert.equal(visuallySort(vNodeA, vNodeB), -1);
  });
});

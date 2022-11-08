// Additional tests for createGrid are part of createRectStack tests,
// which is what createGrid was originally part of
describe('create-grid', function () {
  var fixture;
  var createGrid = axe.commons.dom.createGrid;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var gridSize = axe.constants.gridSize;

  function findPositions(grid, vNode) {
    var positions = [];

    grid.cells.forEach(function (rowCells, rowIndex) {
      rowCells.forEach(function (cells, colIndex) {
        if (cells.includes(vNode)) {
          positions.push({
            x: colIndex + rowCells._negativeIndex,
            y: rowIndex + grid.cells._negativeIndex
          });
        }
      });
    });
    return positions;
  }

  it('returns the grid size', function () {
    axe.setup();
    assert.equal(createGrid(), axe.constants.gridSize);
  });

  it('sets ._grid to nodes in the grid', function () {
    fixture = fixtureSetup('<span>Hello world</span>');
    assert.isUndefined(fixture._grid);
    assert.isUndefined(fixture.children[0]._grid);

    createGrid();
    assert.isDefined(fixture._grid);
    assert.equal(fixture._grid, fixture.children[0]._grid);
  });

  it('adds elements to the correct cell in the grid', function () {
    fixture = fixtureSetup('<span>Hello world</span>');
    createGrid();
    var positions = findPositions(fixture._grid, fixture.children[0]);
    assert.deepEqual(positions, [{ x: 0, y: 0 }]);
  });

  it('adds large elements to multiple cell', function () {
    fixture = fixtureSetup(
      '<span style="display: inline-block; width: 300px; height: 300px;">' +
        'Hello world</span>'
    );
    createGrid();

    var positions = findPositions(fixture._grid, fixture.children[0]);
    assert.deepEqual(positions, [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]);
  });

  describe('hidden elements', function () {
    beforeEach(function () {
      // Ensure the fixture itself is part of the grid, even if its content isn't
      document
        .querySelector('#fixture')
        .setAttribute('style', 'min-height: 10px');
    });

    it('does not add hidden elements', function () {
      fixture = fixtureSetup('<div style="display: none">hidden</div>');
      createGrid();
      var position = findPositions(fixture._grid, fixture.children[0]);
      assert.isEmpty(position);
      assert.isUndefined(fixture.children[0]._grid);
    });

    it('does not add off screen elements', function () {
      fixture = fixtureSetup(
        '<div style="position: fixed; top: -3em">off screen</div>'
      );
      createGrid();
      var position = findPositions(fixture._grid, fixture.children[0]);
      assert.isEmpty(position);
      assert.isUndefined(fixture.children[0]._grid);
    });

    it('does add partially on screen elements', function () {
      fixture = fixtureSetup(
        '<div style="position: fixed; top: -1em; min-height: 2em">off screen</div>'
      );
      createGrid();
      var position = findPositions(fixture._grid, fixture.children[0]);
      assert.deepEqual(position, [
        { x: 0, y: -1 },
        { x: 0, y: 0 }
      ]);
    });
  });

  describe('when scrolled', () => {
    before(() => {
      document.body.setAttribute('style', 'margin: 0');
    });

    after(() => {
      document.body.removeAttribute('style');
    });

    it('adds elements scrolled out of view', function () {
      const gridScroll = 2;
      fixture =
        fixtureSetup(`<div id="scroller" style="height: ${gridSize}px; width: ${gridSize}px; overflow: scroll">
          <div style="height: ${gridSize}px">T1</div>
          <div style="height: ${gridSize}px">T2</div>
          <div style="height: ${gridSize}px">T3</div>
          <div style="height: ${gridSize}px">T4</div>
          <div style="height: ${gridSize}px">T5</div>
        </div>`);
      const scroller = fixture.children[0];
      scroller.actualNode.scroll(0, gridSize * gridScroll);
      const childElms = scroller.children.filter(
        ({ props }) => props.nodeName === 'div'
      );

      createGrid();
      childElms.forEach((child, index) => {
        assert.isDefined(child._grid, `Expect child ${index} to be defined`);
        var position = findPositions(child._grid, child);
        assert.deepEqual(position, [{ x: 0, y: index - gridScroll }]);
      });
    });
  });

  describe('subGrids', function () {
    it('sets the .subGrid property', function () {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      var vOverflow = fixture.children[0];
      assert.isUndefined(vOverflow._subGrid);
      createGrid();
      assert.isDefined(vOverflow._subGrid);
      assert.notEqual(vOverflow._grid, vOverflow._subGrid);
    });

    it('sets the ._grid of children as the subGrid', function () {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      var vOverflow = fixture.children[0];
      var vSpan = vOverflow.children[0];
      assert.equal(vOverflow._subGrid, vSpan._grid);
    });

    it('does not add scrollable children to the root grid', function () {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      var vSpan = fixture.children[0].children[0];
      var position = findPositions(fixture._grid, vSpan);
      assert.isEmpty(position);
    });

    it('adds scrollable children to the subGrid', function () {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      var vOverflow = fixture.children[0];
      var vSpan = vOverflow.children[0];
      var position = findPositions(vOverflow._subGrid, vSpan);
      assert.deepEqual(position, [
        { x: 0, y: 0 },
        { x: 0, y: 1 }
      ]);
    });
  });
});

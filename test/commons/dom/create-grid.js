// Additional tests for createGrid are part of createRectStack tests,
// which is what createGrid was originally part of
describe('create-grid', () => {
  let fixture;
  const createGrid = axe.commons.dom.createGrid;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const queryFixture = axe.testUtils.queryFixture;
  const gridSize = axe.constants.gridSize;

  function findPositions(grid, vNode) {
    const positions = [];
    grid.loopGridPosition(grid.boundaries, (cell, position) => {
      if (cell.includes(vNode)) {
        positions.push(position);
      }
    });
    return positions;
  }

  it('returns the grid size', () => {
    axe.setup();
    assert.equal(createGrid(), axe.constants.gridSize);
  });

  it('sets ._grid to nodes in the grid', () => {
    fixture = fixtureSetup('<span>Hello world</span>');
    assert.isUndefined(fixture._grid);
    assert.isUndefined(fixture.children[0]._grid);

    createGrid();
    assert.isDefined(fixture._grid);
    assert.equal(fixture._grid, fixture.children[0]._grid);
  });

  it('adds elements to the correct cell in the grid', () => {
    fixture = fixtureSetup('<span>Hello world</span>');
    createGrid();
    const positions = findPositions(fixture._grid, fixture.children[0]);
    assert.deepEqual(positions, [{ col: 0, row: 0 }]);
  });

  it('adds large elements to multiple cell', () => {
    fixture = fixtureSetup(
      '<span style="display: inline-block; width: 300px; height: 300px;">' +
        'Hello world</span>'
    );
    createGrid();

    const positions = findPositions(fixture._grid, fixture.children[0]);
    assert.deepEqual(positions, [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 }
    ]);
  });

  it('only adds the visible non-overflow area of large elements', () => {
    const vNode = queryFixture(`
      <div style="overflow: hidden; width: 300px; height: 300px;">
        <span id="target" style="display: inline-block; width: 1000px; height: 1000px;">' +
        'Hello world</span>
      </div>
    `);
    createGrid();

    const positions = findPositions(vNode._grid, vNode);
    assert.deepEqual(positions, [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 }
    ]);
  });

  describe('stackingOrder', () => {
    it('adds stacking context information', () => {
      fixture = fixtureSetup('<span>Hello world</span>');
      createGrid();
      const vNode = fixture.children[0];
      assert.lengthOf(vNode._stackingOrder, 1);
      // purposefully do not test stackLevel and treeOrder values as they are
      // implementation details that can easily change
      assert.hasAllKeys(vNode._stackingOrder[0], [
        'stackLevel',
        'treeOrder',
        'vNode'
      ]);
      assert.typeOf(vNode._stackingOrder[0].stackLevel, 'number');
      assert.typeOf(vNode._stackingOrder[0].treeOrder, 'number');
      assert.isNull(vNode._stackingOrder[0].vNode); // root stack
    });

    // when to use z-index values can be tested though
    it('sets the stack level equal to the z-index of positioned elements', () => {
      const vNode = queryFixture(
        '<div id="target" style="position: absolute; z-index: 100">Hello world</div>'
      );
      createGrid();
      assert.equal(vNode._stackingOrder[0].stackLevel, 100);
    });

    it("ignores z-index on elements that aren't positioned", () => {
      const vNode = queryFixture(
        '<div id="target" style="opacity: 0.2; z-index: 100">Hello world</div>'
      );
      createGrid();
      assert.notEqual(vNode._stackingOrder[0].stackLevel, 100);
    });

    it('uses z-index on children of flex elements', () => {
      const vNode = queryFixture(
        '<div style="display: flex"><div id="target" style="z-index: 100">Hello world</div></div>'
      );
      createGrid();
      assert.equal(vNode._stackingOrder[0].stackLevel, 100);
    });

    it('creates multiple stacking context when they are nested', () => {
      const vNode = queryFixture(`
        <div style="opacity: 0.2">
          <div style="transform: translate(42px, 18px);">
            <div id="target">Hello world</div>
          </div>
        </div>
      `);
      createGrid();
      assert.lengthOf(vNode._stackingOrder, 2);
    });
  });

  describe('hidden elements', () => {
    beforeEach(() => {
      // Ensure the fixture itself is part of the grid, even if its content isn't
      document
        .querySelector('#fixture')
        .setAttribute('style', 'min-height: 10px');
    });

    it('does not add hidden elements', () => {
      fixture = fixtureSetup('<div style="display: none">hidden</div>');
      createGrid();
      const position = findPositions(fixture._grid, fixture.children[0]);
      assert.isEmpty(position);
      assert.isUndefined(fixture.children[0]._grid);
    });

    it('does not add off screen elements', () => {
      fixture = fixtureSetup(
        '<div style="position: fixed; top: -3em">off screen</div>'
      );
      createGrid();
      const position = findPositions(fixture._grid, fixture.children[0]);
      assert.isEmpty(position);
      assert.isUndefined(fixture.children[0]._grid);
    });

    it('does add partially on screen elements', () => {
      fixture = fixtureSetup(
        '<div style="position: fixed; top: -1em; min-height: 2em">off screen</div>'
      );
      createGrid();
      const position = findPositions(fixture._grid, fixture.children[0]);
      assert.deepEqual(position, [
        { col: 0, row: -1 },
        { col: 0, row: 0 }
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

    it('adds elements vertically scrolled out of view', () => {
      const gridScroll = 2;
      fixture =
        fixtureSetup(`<div id="scroller" style="height: ${gridSize}px; width: ${gridSize}px; overflow: scroll">
          <div style="height: ${gridSize}px">V1</div>
          <div style="height: ${gridSize}px">V2</div>
          <div style="height: ${gridSize}px">V3</div>
          <div style="height: ${gridSize}px">V4</div>
          <div style="height: ${gridSize}px">V5</div>
        </div>`);
      const scroller = fixture.children[0];
      scroller.actualNode.scroll(0, gridSize * gridScroll);
      const childElms = scroller.children.filter(
        ({ props }) => props.nodeName === 'div'
      );

      createGrid();
      childElms.forEach((child, index) => {
        assert.isDefined(child._grid, `Expect child ${index} to be defined`);
        const position = findPositions(child._grid, child);
        assert.deepEqual(position, [{ col: 0, row: index - gridScroll }]);
      });
    });

    it('adds elements horizontally scrolled out of view', () => {
      const gridScroll = 2;
      fixture =
        fixtureSetup(`<div id="scroller" style="width: ${gridSize}px; overflow: scroll">
        <div style="width: ${gridSize * 6}px;">
          <div style="width: ${gridSize}px; float: left;">H1</div>
          <div style="width: ${gridSize}px; float: left;">H2</div>
          <div style="width: ${gridSize}px; float: left;">H3</div>
          <div style="width: ${gridSize}px; float: left;">H4</div>
          <div style="width: ${gridSize}px; float: left;">H5</div>
        </div>
      </div>`);
      const scroller = fixture.children[0];
      scroller.actualNode.scroll(gridSize * gridScroll, 0);
      const childElms = scroller.children[0].children.filter(
        ({ props }) => props.nodeName === 'span'
      );

      createGrid();
      childElms.forEach((child, index) => {
        assert.isDefined(child._grid, `Expect child ${index} to be defined`);
        const position = findPositions(child._grid, child);
        assert.deepEqual(position, [{ col: index - gridScroll, row: 0 }]);
      });
    });
  });

  describe('subGrids', () => {
    it('sets the .subGrid property', () => {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      const vOverflow = fixture.children[0];
      assert.isUndefined(vOverflow._subGrid);
      createGrid();
      assert.isDefined(vOverflow._subGrid);
      assert.notEqual(vOverflow._grid, vOverflow._subGrid);
    });

    it('sets the ._grid of children as the subGrid', () => {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      const vOverflow = fixture.children[0];
      const vSpan = vOverflow.children[0];
      assert.equal(vOverflow._subGrid, vSpan._grid);
    });

    it('does not add scrollable children to the root grid', () => {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      const vSpan = fixture.children[0].children[0];
      const position = findPositions(fixture._grid, vSpan);
      assert.isEmpty(position);
    });

    it('adds scrollable children to the subGrid', () => {
      fixture = fixtureSetup(
        '<div style="overflow: scroll; height: 100px;">' +
          '<span style="display: inline-block; height: 300px" id="x">x</span>' +
          '</div>'
      );
      createGrid();
      const vOverflow = fixture.children[0];
      const vSpan = vOverflow.children[0];
      const position = findPositions(vOverflow._subGrid, vSpan);
      assert.deepEqual(position, [
        { col: 0, row: 0 },
        { col: 0, row: 1 }
      ]);
    });
  });
});

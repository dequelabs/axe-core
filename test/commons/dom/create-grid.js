// Additional tests for createGrid are part of createRectStack tests,
// which is what createGrid was originally part of
describe('create-grid', () => {
  const html = axe.testUtils.html;
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
    assert.isTrue(fixture._grid === fixture.children[0]._grid);
  });

  it('adds elements to the correct cell in the grid', () => {
    fixture = fixtureSetup('<span>Hello world</span>');
    createGrid();
    const positions = findPositions(fixture._grid, fixture.children[0]);
    assert.deepEqual(positions, [{ col: 0, row: 0 }]);
  });

  it('adds large elements to multiple cell', () => {
    fixture = fixtureSetup(html`
      <span style="display: inline-block; width: 300px; height: 300px;">
        Hello world
      </span>
    `);
    createGrid();

    const positions = findPositions(fixture._grid, fixture.children[1]);
    assert.deepEqual(positions, [
      { col: 0, row: 0 },
      { col: 1, row: 0 },
      { col: 0, row: 1 },
      { col: 1, row: 1 }
    ]);
  });

  it('only adds the visible non-overflow area of large elements', () => {
    const vNode = queryFixture(html`
      <div style="overflow: hidden; width: 300px; height: 300px;">
        <span
          id="target"
          style="display: inline-block; width: 1000px; height: 1000px;"
        >
          Hello world
        </span>
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
        'pseudo',
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
      const vNode = queryFixture(html`
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
      fixture = fixtureSetup(html`
        <div
          id="scroller"
          style="height: ${gridSize}px; width: ${gridSize}px; overflow: scroll"
        >
          <div style="height: ${gridSize}px">V1</div>
          <div style="height: ${gridSize}px">V2</div>
          <div style="height: ${gridSize}px">V3</div>
          <div style="height: ${gridSize}px">V4</div>
          <div style="height: ${gridSize}px">V5</div>
        </div>
      `);
      const scroller = fixture.children[1];
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
      fixture = fixtureSetup(
        html`<div id="scroller" style="width: ${gridSize}px; overflow: scroll">
          <div style="width: ${gridSize * 6}px;">
            <div style="width: ${gridSize}px; float: left;">H1</div>
            <div style="width: ${gridSize}px; float: left;">H2</div>
            <div style="width: ${gridSize}px; float: left;">H3</div>
            <div style="width: ${gridSize}px; float: left;">H4</div>
            <div style="width: ${gridSize}px; float: left;">H5</div>
          </div>
        </div>`
      );
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
      fixture = fixtureSetup(html`
        <div style="overflow: scroll; height: 100px;">
          <span style="display: inline-block; height: 300px" id="x">x</span>
        </div>
      `);
      const vOverflow = fixture.children[1];
      assert.isUndefined(vOverflow._subGrid);
      createGrid();
      assert.isDefined(vOverflow._subGrid);
      assert.notEqual(vOverflow._grid, vOverflow._subGrid);
    });

    it('sets the ._grid of children as the subGrid', () => {
      fixture = fixtureSetup(html`
        <div style="overflow: scroll; height: 100px;">
          <span style="display: inline-block; height: 300px" id="x">x</span>
        </div>
      `);
      createGrid();
      const vOverflow = fixture.children[1];
      const vSpan = vOverflow.children[1];
      assert.equal(vOverflow._subGrid, vSpan._grid);
    });

    it('does not add scrollable children to the root grid', () => {
      fixture = fixtureSetup(html`
        <div style="overflow: scroll; height: 100px;">
          <span style="display: inline-block; height: 300px" id="x">x</span>
        </div>
      `);
      createGrid();
      const vSpan = fixture.children[1].children[1];
      const position = findPositions(fixture._grid, vSpan);
      assert.isEmpty(position);
    });

    it('adds scrollable children to the subGrid', () => {
      fixture = fixtureSetup(html`
        <div style="overflow: scroll; height: 100px;">
          <span style="display: inline-block; height: 300px" id="x">x</span>
        </div>
      `);
      createGrid();
      const vOverflow = fixture.children[1];
      const vSpan = vOverflow.children[1];
      const position = findPositions(vOverflow._subGrid, vSpan);
      assert.deepEqual(position, [
        { col: 0, row: 0 },
        { col: 0, row: 1 }
      ]);
    });
  });

  describe('absolutely positioned elements', () => {
    const scrollerStyle = 'overflow: auto; height: 50px; width: 100px;';
    const absStyle =
      'position: absolute; top: 0; left: 0; width: 20px; height: 20px;';

    function getVNode(id) {
      return axe.utils.getNodeFromTree(document.getElementById(id));
    }

    // grids are too large for chai to print in a failure message
    function assertGrid(actual, expected, message) {
      assert.isTrue(actual === expected, message);
    }

    it('adds an absolute element to the grid of its nearest positioned ancestor outside a scroll region', () => {
      fixtureSetup(html`
        <div id="positioned" style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="height: 200px">
              <div id="target" style="${absStyle}"></div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      const scroller = getVNode('scroller');
      const target = getVNode('target');
      assert.isDefined(scroller._subGrid);
      assertGrid(target._grid, getVNode('positioned')._grid);
      assert.isFalse(target._grid === scroller._subGrid);
      assert.isEmpty(findPositions(scroller._subGrid, target));
    });

    it('adds descendants of an escaped absolute element to the same grid', () => {
      fixtureSetup(html`
        <div id="positioned" style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="height: 200px">
              <div id="target" style="${absStyle}">
                <div><span id="child">x</span></div>
              </div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      assertGrid(getVNode('child')._grid, getVNode('positioned')._grid);
    });

    it('adds an absolute element with no positioned ancestor to the root grid', () => {
      fixture = fixtureSetup(html`
        <div id="scroller" style="${scrollerStyle}">
          <div style="height: 200px">
            <div id="target" style="${absStyle}"></div>
          </div>
        </div>
      `);
      createGrid();
      assertGrid(getVNode('target')._grid, fixture._grid);
      assert.isNull(getVNode('target')._grid.container);
    });

    it('keeps an absolute element in the subgrid when the scroll region is its nearest positioned ancestor', () => {
      fixtureSetup(html`
        <div style="position: relative">
          <div id="scroller" style="position: relative; ${scrollerStyle}">
            <div style="height: 200px">
              <div id="target" style="${absStyle}"></div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      assertGrid(getVNode('target')._grid, getVNode('scroller')._subGrid);
    });

    it('keeps an absolute element in the subgrid when its nearest positioned ancestor is inside the scroll region', () => {
      fixtureSetup(html`
        <div style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="position: relative; height: 200px">
              <div id="target" style="${absStyle}"></div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      assertGrid(getVNode('target')._grid, getVNode('scroller')._subGrid);
    });

    it('adds the content of a scroll region inside an escaped absolute element to that scroll region subgrid', () => {
      fixtureSetup(html`
        <div id="positioned" style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="height: 200px">
              <div
                style="position: absolute; top: 0; left: 0; width: 60px; height: 40px"
              >
                <div
                  id="inner-scroller"
                  style="overflow: auto; height: 30px; width: 50px"
                >
                  <div id="inner-content" style="height: 100px">x</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      const innerScroller = getVNode('inner-scroller');
      assert.isDefined(innerScroller._subGrid);
      assertGrid(innerScroller._grid, getVNode('positioned')._grid);
      assertGrid(getVNode('inner-content')._grid, innerScroller._subGrid);
    });

    it('adds an absolute element inside an escaped absolute element to the same grid', () => {
      fixtureSetup(html`
        <div id="positioned" style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="height: 200px">
              <div
                style="position: absolute; top: 0; left: 0; width: 60px; height: 40px"
              >
                <div>
                  <div id="target" style="${absStyle}"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      assertGrid(getVNode('target')._grid, getVNode('positioned')._grid);
    });

    it('keeps position: relative and position: sticky elements in the subgrid', () => {
      fixtureSetup(html`
        <div style="position: relative">
          <div id="scroller" style="${scrollerStyle}">
            <div style="height: 200px">
              <div id="relative" style="position: relative">x</div>
              <div id="sticky" style="position: sticky; top: 0">y</div>
            </div>
          </div>
        </div>
      `);
      createGrid();
      const subGrid = getVNode('scroller')._subGrid;
      assertGrid(getVNode('relative')._grid, subGrid);
      assertGrid(getVNode('sticky')._grid, subGrid);
    });
  });
});

// Additional tests for createGrid are part of createRectStack tests,
// which is what createGrid was originally part of
describe('create-grid', () => {
  const html = axe.testUtils.html;
  let fixture;
  const createGrid = axe.commons.dom.createGrid;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const queryFixture = axe.testUtils.queryFixture;
  const gridSize = axe.constants.gridSize;
  const getVNode = selector =>
    axe.utils.getNodeFromTree(document.querySelector(selector));
  const gridName = grid => {
    if (!grid) {
      return 'no grid';
    }
    const container = grid.container;
    return container
      ? `subGrid(${container.props.id || container.props.nodeName})`
      : 'root grid';
  };

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
    assert.isTrue(
      fixture._grid === fixture.children[0]._grid,
      `expected ${gridName(fixture._grid)} === ${gridName(fixture.children[0]._grid)}`
    );
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

  describe('absolute elements escaping an overflow hidden ancestor', () => {
    it('does not clip an absolute element to an ancestor below its containing block', () => {
      fixtureSetup(html`
        <div id="wrapper" style="position: relative">
          <div style="overflow: hidden; height: 20px">
            <div
              id="dropdown"
              style="position: absolute; top: 30px; left: 0; width: 100px; height: 40px"
            ></div>
          </div>
        </div>
      `);
      createGrid();
      const vDropdown = getVNode('#dropdown');
      assert.isTrue(
        vDropdown._grid === getVNode('#wrapper')._grid,
        `expected ${gridName(vDropdown._grid)} === ${gridName(getVNode('#wrapper')._grid)}`
      );
      assert.isNotEmpty(findPositions(vDropdown._grid, vDropdown));
    });

    it('clips an absolute element to its containing block', () => {
      fixtureSetup(html`
        <div style="position: relative">
          <div
            id="card"
            style="overflow: hidden; height: 20px; position: relative"
          >
            <div
              id="dropdown"
              style="position: absolute; top: 30px; left: 0; width: 100px; height: 40px"
            ></div>
          </div>
        </div>
      `);
      createGrid();
      assert.isDefined(getVNode('#card')._grid);
      assert.isUndefined(getVNode('#dropdown')._grid);
    });

    it('does not clip the in-flow content of an escaped absolute element', () => {
      fixtureSetup(html`
        <div id="wrapper" style="position: relative">
          <div style="overflow: hidden; height: 20px">
            <div
              style="position: absolute; top: 30px; left: 0; width: 100px; height: 40px"
            >
              <button id="item" style="width: 80px; height: 30px">item</button>
            </div>
          </div>
        </div>
      `);
      createGrid();
      const vItem = getVNode('#item');
      assert.isTrue(axe.commons.dom.isVisibleOnScreen(vItem));
      assert.isTrue(
        vItem._grid === getVNode('#wrapper')._grid,
        `expected ${gridName(vItem._grid)} === ${gridName(getVNode('#wrapper')._grid)}`
      );
      assert.isNotEmpty(findPositions(vItem._grid, vItem));
    });

    it('does not clip fixed content to an overflow hidden ancestor', () => {
      fixtureSetup(html`
        <div style="overflow: hidden; height: 20px">
          <div
            id="fixed"
            style="position: fixed; top: 100px; left: 0; width: 100px; height: 40px"
          >
            <button id="item" style="width: 80px; height: 30px">item</button>
          </div>
        </div>
      `);
      createGrid();
      const vFixed = getVNode('#fixed');
      const vItem = getVNode('#item');
      assert.isDefined(vFixed._grid);
      assert.isDefined(vItem._grid);
      assert.isNotEmpty(findPositions(vFixed._grid, vFixed));
      assert.isNotEmpty(findPositions(vItem._grid, vItem));
    });

    it('clips a fixed element to an overflow hidden ancestor that is its containing block', () => {
      fixtureSetup(html`
        <div style="position: relative">
          <div
            id="card"
            style="overflow: hidden; height: 20px; transform: translateX(0)"
          >
            <div
              id="fixed"
              style="position: fixed; top: 30px; left: 0; width: 100px; height: 40px"
            ></div>
          </div>
        </div>
      `);
      createGrid();
      assert.isDefined(getVNode('#card')._grid);
      assert.isUndefined(getVNode('#fixed')._grid);
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
    const absoluteInScrollMarkup = html`
      <section style="display: flex">
        <button id="a" style="padding: 0">A</button>
        <div
          id="wrap"
          style="width: 1px; height: 1px; margin-right: 1em; display: inline-block; overflow: auto; scrollbar-width: none"
        >
          <span style="opacity: 0">hidden</span>
          <button
            id="b"
            style="padding: 0; position: absolute; margin-top: -1.4em; margin-left: 0.2em"
          >
            B
          </button>
        </div>
        <button id="c" style="padding: 0">C</button>
      </section>
    `;

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

    it("moves absolute elements without a containing block out of the scroll container's subGrid", () => {
      fixtureSetup(absoluteInScrollMarkup);
      createGrid();
      assert.isDefined(getVNode('#wrap')._subGrid);
      assert.isTrue(
        getVNode('#b')._grid !== getVNode('#wrap')._subGrid,
        `expected ${gridName(getVNode('#b')._grid)} !== ${gridName(getVNode('#wrap')._subGrid)}`
      );
      assert.isTrue(
        getVNode('#b')._grid === getVNode('#a')._grid,
        `expected ${gridName(getVNode('#b')._grid)} === ${gridName(getVNode('#a')._grid)}`
      );
    });

    describe('absolute elements on a scrolling page', () => {
      let htmlStyle, bodyStyle;
      beforeEach(() => {
        htmlStyle = document.documentElement.style.cssText;
        bodyStyle = document.body.style.cssText;
      });
      afterEach(() => {
        document.documentElement.style.cssText = htmlStyle;
        document.body.style.cssText = bodyStyle;
      });

      it('uses the html subGrid when the document scrolls', () => {
        document.documentElement.style.height = '5000px';
        document.documentElement.style.overflowY = 'scroll';
        fixtureSetup(absoluteInScrollMarkup);
        createGrid();
        const vHtml = axe.utils.getNodeFromTree(document.documentElement);
        assert.isDefined(vHtml._subGrid);
        assert.isTrue(
          getVNode('#a')._grid === vHtml._subGrid,
          `expected ${gridName(getVNode('#a')._grid)} === ${gridName(vHtml._subGrid)}`
        );
        assert.isTrue(
          getVNode('#b')._grid === vHtml._subGrid,
          `expected ${gridName(getVNode('#b')._grid)} === ${gridName(vHtml._subGrid)}`
        );
      });

      it('uses the body subGrid when body is the scroll container', () => {
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';
        document.body.style.overflowX = 'hidden';
        fixtureSetup(
          html`${absoluteInScrollMarkup}
            <div style="height: 5000px"></div>`
        );
        createGrid();
        const vHtml = axe.utils.getNodeFromTree(document.documentElement);
        const vBody = axe.utils.getNodeFromTree(document.body);
        assert.isUndefined(vHtml._subGrid);
        assert.isDefined(vBody._subGrid);
        assert.isTrue(
          getVNode('#a')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#a')._grid)} === ${gridName(vBody._subGrid)}`
        );
        assert.isTrue(
          getVNode('#b')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#b')._grid)} === ${gridName(vBody._subGrid)}`
        );
      });

      it('uses the body subGrid when body is the scroll container and html is positioned', () => {
        document.documentElement.style.height = '100%';
        document.documentElement.style.position = 'relative';
        document.body.style.height = '100%';
        document.body.style.overflowX = 'hidden';
        fixtureSetup(
          html`${absoluteInScrollMarkup}
            <div style="height: 5000px"></div>`
        );
        createGrid();
        const vHtml = axe.utils.getNodeFromTree(document.documentElement);
        const vBody = axe.utils.getNodeFromTree(document.body);
        assert.isUndefined(vHtml._subGrid);
        assert.isDefined(vBody._subGrid);
        assert.isTrue(
          getVNode('#a')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#a')._grid)} === ${gridName(vBody._subGrid)}`
        );
        assert.isTrue(
          getVNode('#b')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#b')._grid)} === ${gridName(vBody._subGrid)}`
        );
      });

      it('does not use the body subGrid when body scrolls independently of the document', () => {
        document.documentElement.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.overflow = 'auto';
        fixtureSetup(
          html`${absoluteInScrollMarkup}
            <div style="height: 5000px"></div>`
        );
        createGrid();
        const vHtml = axe.utils.getNodeFromTree(document.documentElement);
        const vBody = axe.utils.getNodeFromTree(document.body);
        assert.isUndefined(vHtml._subGrid);
        assert.isDefined(vBody._subGrid);
        assert.isTrue(
          getVNode('#a')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#a')._grid)} === ${gridName(vBody._subGrid)}`
        );
        assert.isTrue(
          getVNode('#b')._grid === vHtml._grid,
          `expected ${gridName(getVNode('#b')._grid)} === ${gridName(vHtml._grid)}`
        );
      });

      it('uses the html subGrid when both html and body scroll', () => {
        document.documentElement.style.height = '5000px';
        document.documentElement.style.overflowY = 'scroll';
        document.body.style.height = '100px';
        document.body.style.overflow = 'auto';
        fixtureSetup(
          html`${absoluteInScrollMarkup}
            <div style="height: 300px"></div>`
        );
        createGrid();
        const vHtml = axe.utils.getNodeFromTree(document.documentElement);
        const vBody = axe.utils.getNodeFromTree(document.body);
        assert.isDefined(vHtml._subGrid);
        assert.isDefined(vBody._subGrid);
        assert.isTrue(
          getVNode('#a')._grid === vBody._subGrid,
          `expected ${gridName(getVNode('#a')._grid)} === ${gridName(vBody._subGrid)}`
        );
        assert.isTrue(
          getVNode('#b')._grid === vHtml._subGrid,
          `expected ${gridName(getVNode('#b')._grid)} === ${gridName(vHtml._subGrid)}`
        );
      });
    });

    describe('absolute elements with a positioned ancestor', () => {
      it('stays in the subGrid when the scroll container is positioned', () => {
        fixtureSetup(html`
          <div
            id="wrap"
            style="overflow: auto; height: 50px; position: relative"
          >
            <span id="abs" style="position: absolute; top: 0">abs</span>
            <div style="height: 300px"></div>
          </div>
        `);
        createGrid();
        assert.isDefined(getVNode('#wrap')._subGrid);
        assert.isDefined(getVNode('#abs')._grid);
        assert.isTrue(
          getVNode('#abs')._grid === getVNode('#wrap')._subGrid,
          `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#wrap')._subGrid)}`
        );
      });

      it('stays in the subGrid when the positioned ancestor is inside the scroll container', () => {
        fixtureSetup(html`
          <div id="wrap" style="overflow: auto; height: 50px">
            <div style="position: relative">
              <span id="abs" style="position: absolute; top: 0">abs</span>
            </div>
            <div style="height: 300px"></div>
          </div>
        `);
        createGrid();
        assert.isDefined(getVNode('#wrap')._subGrid);
        assert.isDefined(getVNode('#abs')._grid);
        assert.isTrue(
          getVNode('#abs')._grid === getVNode('#wrap')._subGrid,
          `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#wrap')._subGrid)}`
        );
      });

      it('stays in the subGrid when the positioned ancestor has no size', () => {
        fixtureSetup(html`
          <div id="wrap" style="overflow: auto; height: 50px">
            <div style="position: relative; height: 0">
              <span id="abs" style="position: absolute; top: 0">abs</span>
            </div>
            <div style="height: 300px"></div>
          </div>
        `);
        createGrid();
        assert.isDefined(getVNode('#wrap')._subGrid);
        assert.isDefined(getVNode('#abs')._grid);
        assert.isTrue(
          getVNode('#abs')._grid === getVNode('#wrap')._subGrid,
          `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#wrap')._subGrid)}`
        );
      });

      it('leaves the subGrid when the positioned ancestor is outside the scroll container', () => {
        fixtureSetup(html`
          <div id="outer" style="position: relative">
            <div id="wrap" style="overflow: auto; height: 50px">
              <span id="abs" style="position: absolute; top: 0">abs</span>
              <div style="height: 300px"></div>
            </div>
          </div>
        `);
        createGrid();
        assert.isDefined(getVNode('#wrap')._subGrid);
        assert.isTrue(
          getVNode('#abs')._grid === getVNode('#outer')._grid,
          `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#outer')._grid)}`
        );
      });
    });

    it('ignores display: contents ancestors when finding the containing block', () => {
      fixtureSetup(html`
        <div id="outer" style="position: relative">
          <div id="wrap" style="overflow: auto; height: 50px">
            <div style="display: contents; position: relative">
              <span id="abs" style="position: absolute; top: 0">abs</span>
            </div>
            <div style="height: 300px"></div>
          </div>
        </div>
      `);
      createGrid();
      assert.isDefined(getVNode('#wrap')._subGrid);
      assert.isTrue(
        getVNode('#abs')._grid === getVNode('#outer')._grid,
        `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#outer')._grid)}`
      );
    });

    it('adds absolute elements inside a fixed element to the grid of the fixed element', () => {
      fixtureSetup(html`
        <div
          id="fixed"
          style="position: fixed; top: 0; left: 0; width: 100px; height: 50px"
        >
          <span id="abs" style="position: absolute; top: 0; left: 0">abs</span>
        </div>
      `);
      createGrid();
      assert.isDefined(getVNode('#fixed')._grid);
      assert.isTrue(
        getVNode('#abs')._grid === getVNode('#fixed')._grid,
        `expected ${gridName(getVNode('#abs')._grid)} === ${gridName(getVNode('#fixed')._grid)}`
      );
    });

    describe('absolute elements with a non-positioned containing block', () => {
      [
        'transform: translateX(0)',
        'filter: blur(0)',
        'perspective: 100px',
        'contain: paint',
        'will-change: transform',
        'translate: 1px',
        'rotate: 1deg',
        'scale: 1.01',
        'backdrop-filter: blur(1px)',
        'content-visibility: auto',
        'will-change: translate'
      ].forEach(style => {
        it(`stays in the subGrid when an ancestor has ${style}`, () => {
          fixtureSetup(html`
            <div style="position: relative">
              <div id="track" style="overflow-x: auto; width: 100px">
                <div id="slide" style="width: 300px; height: 50px; ${style}">
                  <span id="badge" style="position: absolute; top: 0; left: 0"
                    >New</span
                  >
                </div>
              </div>
            </div>
          `);
          createGrid();
          assert.isDefined(getVNode('#track')._subGrid);
          assert.isTrue(
            getVNode('#badge')._grid === getVNode('#track')._subGrid,
            `expected ${gridName(getVNode('#badge')._grid)} === ${gridName(getVNode('#track')._subGrid)}`
          );
        });
      });
    });

    it('adds descendants of slotted content to the subGrid of a scroll container in the shadow tree', () => {
      fixtureSetup(
        html`
          <div id="host">
            <template shadowrootmode="open">
              <div id="scroller" style="overflow: auto; height: 50px">
                <slot></slot>
              </div>
            </template>
            <div id="slotted">
              <span id="inner" style="display: block; height: 300px"
                >inner</span
              >
            </div>
          </div>
        `,
        { shadow: true }
      );
      createGrid();
      const shadowRoot = document.querySelector('#host').shadowRoot;
      const vScroller = axe.utils.getNodeFromTree(
        shadowRoot.querySelector('#scroller')
      );
      assert.isDefined(vScroller._subGrid);
      assert.isTrue(
        getVNode('#slotted')._grid === vScroller._subGrid,
        `expected ${gridName(getVNode('#slotted')._grid)} === ${gridName(vScroller._subGrid)}`
      );
      assert.isTrue(
        getVNode('#inner')._grid === vScroller._subGrid,
        `expected ${gridName(getVNode('#inner')._grid)} === ${gridName(vScroller._subGrid)}`
      );
    });
  });
});

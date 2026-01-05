describe('dom.getNodeGrid', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const getNodeGrid = axe.commons.dom.getNodeGrid;

  it('returns the grid of an vNode', () => {
    const vNode = queryFixture(`
      <section id="container" style="height: 2em; overflow: auto;">
        <p id="target" style="height: 2em;">  text  </p>
        <p id="sibling" style="height: 2em;">  text  </p>
      </section>
    `);
    const grid = getNodeGrid(vNode);
    assert.equal(grid.container.props.id, 'container');
  });

  it('returns the grid of an elm', () => {
    const vNode = queryFixture(`
      <section id="container" style="height: 2em; overflow: auto;">
        <p id="target" style="height: 2em;">  text  </p>
        <p id="sibling" style="height: 2em;">  text  </p>
      </section>
    `);
    const grid = getNodeGrid(vNode.actualNode);
    assert.equal(grid.container.props.id, 'container');
  });
});

describe('getOffset', () => {
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const getOffset = axe.commons.math.getOffset;
  const round = 0.2;

  it('returns center to edge of circle when both are undersized', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 50px; left: 0">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.closeTo(getOffset(nodeA, nodeB), 38, round);
  });

  it('returns center to edge of square when one is undersized', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 30px; height: 30px; margin: 0; padding: 0; position: absolute; top: 50px; left: 0">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.closeTo(getOffset(nodeA, nodeB), 45, round);
  });

  it('returns center to corner of square when at a diagonal', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 30px; height: 30px; margin: 0; padding: 0; position: absolute; top: 50px; left: 50px">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.closeTo(getOffset(nodeA, nodeB), 63.6, round);
  });

  it('returns 0 if nodeA is overlapped by nodeB', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 30px; height: 30px; margin: 0; padding: 0; position: absolute; top: -10px; left: -10px">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.equal(getOffset(nodeA, nodeB), 0);
  });

  it('returns 0 if nodeB is overlapped by nodeA', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 30px; height: 30px; margin: 0; padding: 0; position: absolute; top: -10px; left: -10px">&nbsp;</button>
    `);
    const nodeA = fixture.children[3];
    const nodeB = fixture.children[1];
    assert.equal(getOffset(nodeA, nodeB), 0);
  });

  it('subtracts minNeighbourRadius from center-to-center calculations', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 50px; left: 0">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.closeTo(getOffset(nodeA, nodeB, 30), 20, round);
  });

  it('returns 0 if center of nodeA is enclosed by nodeB', () => {
    const fixture = fixtureSetup(`
      <button style="width: 50px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 10px; height: 10px; margin: 0; padding: 0; position: absolute; top: 0; left: 20px;">&nbsp;</button>
    `);
    const nodeA = fixture.children[1];
    const nodeB = fixture.children[3];
    assert.equal(getOffset(nodeA, nodeB, 30), 0);
  });
});

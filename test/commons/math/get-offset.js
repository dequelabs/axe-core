describe.only('getOffset', () => {
  'use strict';
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const getOffset = axe.commons.math.getOffset;
  const round = 0.2;

  it('returns center to center distance when both are undersized', () => {
    const fixture = fixtureSetup(`
      <button style="width: 10px; height: 10px; margin: 0; position: absolute; top: 0; left: 0">&nbsp;</button>
      <button style="width: 10px; height: 10px; margin: 0; position: absolute; top: 30px; left: 0">&nbsp;</button>
    `);
    const nodeA = fixture.children[0];
    const nodeB = fixture.children[1];
    assert.closeTo(getOffset(nodeA, nodeB), 30, round);
    assert.closeTo(getOffset(nodeB, nodeA), 30, round);
  });
});

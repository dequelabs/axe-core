describe('get-target-size', () => {
  const getTargetSize = axe.commons.dom.getTargetSize;
  const { queryFixture } = axe.testUtils;

  it('returns the bounding rect when unobscured', () => {
    const vNode = queryFixture('<button id="target">x</button>');
    const rect = getTargetSize(vNode);
    assert.deepEqual(rect, vNode.actualNode.getBoundingClientRect());
  });

  it('returns target size when obscured', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px;"></div>
    `);
    const rect = getTargetSize(vNode);
    assert.deepEqual(rect, new DOMRect(10, 5, 20, 40));
  });

  it('ignores elements with "pointer-events: none"', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px; pointer-events: none"></div>
    `);
    const rect = getTargetSize(vNode);
    assert.deepEqual(rect, vNode.actualNode.getBoundingClientRect());
  });

  it("ignores elements that don't overlap the target", () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 60px; top: 0; width: 50px; height: 50px;"></div>
    `);
    const rect = getTargetSize(vNode);
    assert.deepEqual(rect, vNode.actualNode.getBoundingClientRect());
  });

  it('returns the largest unobscured area', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px;"></div>
      <div style="position: absolute; left: 0px; top: 0px; width: 50px; height: 10px"></div>
    `);
    const rect = getTargetSize(vNode);
    assert.deepEqual(rect, new DOMRect(10, 10, 20, 35));
  });
});

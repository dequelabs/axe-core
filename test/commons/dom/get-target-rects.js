describe('get-target-rects', () => {
  const getTargetRects = axe.commons.dom.getTargetRects;
  const { queryFixture } = axe.testUtils;

  it('returns the bounding rect when unobscured', () => {
    const vNode = queryFixture('<button id="target">x</button>');
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [vNode.actualNode.getBoundingClientRect()]);
  });

  it('returns subset rect when obscured', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px;"></div>
    `);
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [new DOMRect(10, 5, 20, 40)]);
  });

  it('ignores elements with "pointer-events: none"', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px; pointer-events: none"></div>
    `);
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [vNode.actualNode.getBoundingClientRect()]);
  });

  it("ignores elements that don't overlap the target", () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 60px; top: 0; width: 50px; height: 50px;"></div>
    `);
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [vNode.actualNode.getBoundingClientRect()]);
  });

  it('ignores non-tabbable descendants of the target', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">
        <div style="position: absolute; left: 5px; top: 5px; width: 50px; height: 50px;"></div>
      </button>
    `);
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [vNode.actualNode.getBoundingClientRect()]);
  });

  it('returns each unobscured area', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 30px; top: 0; width: 50px; height: 50px;"></div>
      <div style="position: absolute; left: 0px; top: 20px; width: 50px; height: 10px"></div>
    `);
    const rects = getTargetRects(vNode);
    assert.deepEqual(rects, [
      new DOMRect(10, 5, 20, 15),
      new DOMRect(10, 30, 20, 15)
    ]);
  });

  it('returns empty if target is fully obscured', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">x</button>
      <div style="position: absolute; left: 0; top: 0; width: 50px; height: 50px;"></div>
    `);
    const rects = getTargetRects(vNode);
    assert.lengthOf(rects, 0);
  });

  it('returns subset rect of the target with tabbable descendant', () => {
    const vNode = queryFixture(`
      <button id="target" style="width: 30px; height: 40px; position: absolute; left: 10px; top: 5px">
        <div tabindex="0" style="position: absolute; left: 5px; top: 5px; width: 50px; height: 50px;"></div>
      </button>
    `);
    const rects = getTargetRects(vNode);
    console.log(JSON.stringify(rects));
    assert.deepEqual(rects, [
      new DOMRect(10, 5, 30, 7),
      new DOMRect(10, 5, 7, 40)
    ]);
  });
});

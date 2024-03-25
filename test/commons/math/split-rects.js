describe('splitRects', () => {
  const splitRects = axe.commons.math.splitRects;

  it('returns the original rect if there is no clipping rect', () => {
    const rectA = new DOMRect(0, 0, 100, 50);
    const rects = splitRects(rectA, []);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  it('returns the original rect if there is no overlap', () => {
    const rectA = new DOMRect(0, 0, 100, 50);
    const rectB = new DOMRect(0, 50, 50, 50);
    const rects = splitRects(rectA, [rectB]);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  it('returns empty array if there are too many overlapping rects', () => {
    const rects = [];
    for (let i = 0; i < 100; i++) {
      rects.push(new DOMRect(i, i, 50, 50));
    }
    const rectA = new DOMRect(0, 0, 1000, 1000);
    assert.lengthOf(splitRects(rectA, rects), 0);
  });

  describe('with one overlapping rect', () => {
    it('returns one rect if overlaps covers two corners', () => {
      const rectA = new DOMRect(0, 0, 100, 50);
      const rectB = new DOMRect(40, 0, 100, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], new DOMRect(0, 0, 40, 50));
    });

    it('returns two rects if overlap covers one corner', () => {
      const rectA = new DOMRect(0, 0, 100, 100);
      const rectB = new DOMRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 2);
      assert.deepEqual(rects[0], new DOMRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], new DOMRect(0, 0, 50, 100));
    });

    it('returns three rects if overlap covers an edge, but no corner', () => {
      const rectA = new DOMRect(0, 0, 100, 150);
      const rectB = new DOMRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], new DOMRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], new DOMRect(0, 100, 100, 50));
      assert.deepEqual(rects[2], new DOMRect(0, 0, 50, 150));
    });

    it('returns four rects if overlap sits in the middle, touching no corner', () => {
      const rectA = new DOMRect(0, 0, 150, 150);
      const rectB = new DOMRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 4);
      assert.deepEqual(rects[0], new DOMRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], new DOMRect(100, 0, 50, 150));
      assert.deepEqual(rects[2], new DOMRect(0, 100, 150, 50));
      assert.deepEqual(rects[3], new DOMRect(0, 0, 50, 150));
    });

    it('returns no rects if overlap covers the entire input rect', () => {
      const rectA = new DOMRect(0, 0, 100, 50);
      const rectB = new DOMRect(-50, -50, 400, 400);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 0);
    });
  });

  describe('with multiple overlaps', () => {
    it('can return a single rect two overlaps each cover an edge', () => {
      const rectA = new DOMRect(0, 0, 150, 50);
      const rectB = new DOMRect(0, 0, 50, 50);
      const rectC = new DOMRect(100, 0, 50, 50);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], new DOMRect(50, 0, 50, 50));
    });

    it('can recursively clips regions', () => {
      const rectA = new DOMRect(0, 0, 150, 100);
      const rectB = new DOMRect(0, 50, 50, 50);
      const rectC = new DOMRect(100, 50, 50, 50);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], new DOMRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], new DOMRect(50, 0, 100, 50));
      assert.deepEqual(rects[2], new DOMRect(50, 0, 50, 100));
    });

    it('returns no rects if overlap covers the entire input rect', () => {
      const rectA = new DOMRect(0, 0, 100, 50);
      const rectB = new DOMRect(50, 50, 200, 200);
      const rectC = new DOMRect(-50, -50, 200, 200);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 0);
    });
  });
});

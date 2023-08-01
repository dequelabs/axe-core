describe('splitRects', () => {
  const splitRects = axe.commons.math.splitRects;
  function createRect(x, y, width, height) {
    return new DOMRect(x, y, width, height);
  }

  it('returns the original rect if there is no clipping rect', () => {
    const rectA = createRect(0, 0, 100, 50);
    const rects = splitRects(rectA, []);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  it('returns the original rect if there is no overlap', () => {
    const rectA = createRect(0, 0, 100, 50);
    const rectB = createRect(0, 50, 50, 50);
    const rects = splitRects(rectA, [rectB]);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  describe('with one overlapping rect', () => {
    it('returns one rect if overlaps covers two corners', () => {
      const rectA = createRect(0, 0, 100, 50);
      const rectB = createRect(40, 0, 100, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], createRect(0, 0, 40, 50));
    });

    it('returns two rects if overlap covers one corner', () => {
      const rectA = createRect(0, 0, 100, 100);
      const rectB = createRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 2);
      assert.deepEqual(rects[0], createRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], createRect(0, 0, 50, 100));
    });

    it('returns three rects if overlap covers an edge, but no corner', () => {
      const rectA = createRect(0, 0, 100, 150);
      const rectB = createRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], createRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], createRect(0, 100, 100, 50));
      assert.deepEqual(rects[2], createRect(0, 0, 50, 150));
    });

    it('returns four rects if overlap sits in the middle, touching no corner', () => {
      const rectA = createRect(0, 0, 150, 150);
      const rectB = createRect(50, 50, 50, 50);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 4);
      assert.deepEqual(rects[0], createRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], createRect(100, 0, 50, 150));
      assert.deepEqual(rects[2], createRect(0, 100, 150, 50));
      assert.deepEqual(rects[3], createRect(0, 0, 50, 150));
    });

    it('returns no rects if overlap covers the entire input rect', () => {
      const rectA = createRect(0, 0, 100, 50);
      const rectB = createRect(-50, -50, 400, 400);
      const rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 0);
    });
  });

  describe('with multiple overlaps', () => {
    it('can return a single rect two overlaps each cover an edge', () => {
      const rectA = createRect(0, 0, 150, 50);
      const rectB = createRect(0, 0, 50, 50);
      const rectC = createRect(100, 0, 50, 50);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], createRect(50, 0, 50, 50));
    });

    it('can recursively clips regions', () => {
      const rectA = createRect(0, 0, 150, 100);
      const rectB = createRect(0, 50, 50, 50);
      const rectC = createRect(100, 50, 50, 50);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], createRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], createRect(50, 0, 100, 50));
      assert.deepEqual(rects[2], createRect(50, 0, 50, 100));
    });

    it('returns no rects if overlap covers the entire input rect', () => {
      const rectA = createRect(0, 0, 100, 50);
      const rectB = createRect(50, 50, 200, 200);
      const rectC = createRect(-50, -50, 200, 200);
      const rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 0);
    });
  });
});

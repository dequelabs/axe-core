describe('splitRects', function () {
  var splitRects = axe.commons.math.splitRects;
  function createRect(x, y, width, height) {
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      top: y,
      left: x,
      bottom: y + height,
      right: x + width
    };
  }

  it('returns the original rect if there is no clipping rect', function () {
    var rectA = createRect(0, 0, 100, 50);
    var rects = splitRects(rectA, []);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  it('returns the original rect if there is no overlap', function () {
    var rectA = createRect(0, 0, 100, 50);
    var rectB = createRect(0, 50, 50, 50);
    var rects = splitRects(rectA, [rectB]);
    assert.lengthOf(rects, 1);
    assert.deepEqual(rects[0], rectA);
  });

  describe('with one overlapping rect', function () {
    it('returns one rect if overlaps covers two corners', function () {
      var rectA = createRect(0, 0, 100, 50);
      var rectB = createRect(40, 0, 100, 50);
      var rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], createRect(0, 0, 40, 50));
    });

    it('returns two rects if overlap covers one corner', function () {
      var rectA = createRect(0, 0, 100, 100);
      var rectB = createRect(50, 50, 50, 50);
      var rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 2);
      assert.deepEqual(rects[0], createRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], createRect(0, 0, 50, 100));
    });

    it('returns three rects if overlap covers an edge, but no corner', function () {
      var rectA = createRect(0, 0, 100, 150);
      var rectB = createRect(50, 50, 50, 50);
      var rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], createRect(0, 0, 100, 50));
      assert.deepEqual(rects[1], createRect(0, 100, 100, 50));
      assert.deepEqual(rects[2], createRect(0, 0, 50, 150));
    });

    it('returns four rects if overlap sits in the middle, touching no corner', function () {
      var rectA = createRect(0, 0, 150, 150);
      var rectB = createRect(50, 50, 50, 50);
      var rects = splitRects(rectA, [rectB]);
      assert.lengthOf(rects, 4);
      assert.deepEqual(rects[0], createRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], createRect(100, 0, 50, 150));
      assert.deepEqual(rects[2], createRect(0, 100, 150, 50));
      assert.deepEqual(rects[3], createRect(0, 0, 50, 150));
    });
  });

  describe('with multiple overlaps', function () {
    it('can return a single rect two overlaps each cover an edge', function () {
      var rectA = createRect(0, 0, 150, 50);
      var rectB = createRect(0, 0, 50, 50);
      var rectC = createRect(100, 0, 50, 50);
      var rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 1);
      assert.deepEqual(rects[0], createRect(50, 0, 50, 50));
    });

    it('can recursively clips regions', function () {
      var rectA = createRect(0, 0, 150, 100);
      var rectB = createRect(0, 50, 50, 50);
      var rectC = createRect(100, 50, 50, 50);
      var rects = splitRects(rectA, [rectB, rectC]);
      assert.lengthOf(rects, 3);
      assert.deepEqual(rects[0], createRect(0, 0, 150, 50));
      assert.deepEqual(rects[1], createRect(50, 0, 100, 50));
      assert.deepEqual(rects[2], createRect(50, 0, 50, 100));
    });
  });
});

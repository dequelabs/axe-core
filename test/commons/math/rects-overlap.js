describe('math.rects-overlap', function () {
  const rectsOverlap = axe.commons.math.rectsOverlap;

  let rectA, rectB;
  beforeEach(() => {
    rectA = {
      left: 0,
      right: 10,
      top: 0,
      bottom: 10
    };
    rectB = {
      left: 5,
      right: 20,
      top: 0,
      bottom: 5
    };
  });

  it('returns true when rects overlap', () => {
    assert.isTrue(rectsOverlap(rectA, rectB));
  });

  it('should not matter on order', () => {
    assert.isTrue(rectsOverlap(rectB, rectA));
  });

  it('returns false when rects do not overlap (horizontally)', () => {
    rectA.left = 25;
    rectA.right = 40;

    assert.isFalse(rectsOverlap(rectA, rectB));
  });

  it('returns false when rects do not overlap (vertically)', () => {
    rectA.top = 15;
    rectA.bottom = 25;

    assert.isFalse(rectsOverlap(rectA, rectB));
  });

  it('returns false when rects are next to one another', () => {
    rectA.left = 20;
    rectA.right = 25;

    assert.isFalse(rectsOverlap(rectA, rectB));
  });

  it('returns false when rects barely overlap due to floating point', () => {
    rectA.left = 20.5;
    rectA.right = 25.9;
    rectB.left = 10.9;
    rectB.right = 20.9;

    assert.isFalse(rectsOverlap(rectA, rectB));
  });
});

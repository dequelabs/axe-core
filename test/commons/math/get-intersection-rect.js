describe('math.getIntersectionRect', () => {
  const { getIntersectionRect } = axe.commons.math;

  it('returns the intersection of two rects', () => {
    const rect1 = new DOMRect(10, 10, 20, 30);
    const rect2 = new DOMRect(15, 10, 20, 30);
    const actual = getIntersectionRect(rect1, rect2);
    const expected = new DOMRect(15, 10, 15, 30);

    assert.deepEqual(actual, expected);
  });

  it('should not matter on order', () => {
    const rect1 = new DOMRect(10, 10, 20, 30);
    const rect2 = new DOMRect(15, 10, 20, 30);
    const actual = getIntersectionRect(rect2, rect1);
    const expected = new DOMRect(15, 10, 15, 30);

    assert.deepEqual(actual, expected);
  });

  it('returns null when rects do not intersect (horizontally)', () => {
    const rect1 = new DOMRect(10, 10, 20, 30);
    const rect2 = new DOMRect(50, 10, 20, 30);
    const actual = getIntersectionRect(rect1, rect2);

    assert.isNull(actual);
  });

  it('returns null when rects do not intersect (vertically)', () => {
    const rect1 = new DOMRect(10, 10, 20, 30);
    const rect2 = new DOMRect(15, 60, 20, 30);
    const actual = getIntersectionRect(rect1, rect2);

    assert.isNull(actual);
  });

  it('returns null when rects are next to one another', () => {
    const rect1 = new DOMRect(10, 10, 20, 30);
    const rect2 = new DOMRect(30, 10, 20, 30);
    const actual = getIntersectionRect(rect1, rect2);

    assert.isNull(actual);
  });
});

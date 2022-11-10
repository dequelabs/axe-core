describe('isPointInRect', () => {
  const isPointInRect = axe.commons.math.isPointInRect;

  it('returns true when the point is inside the rect', () => {
    const rect = new DOMRect(10, 20, 10, 20);
    const point = new DOMPoint(15, 30);
    assert.isTrue(isPointInRect(point, rect));
  });

  it('returns true when the point is on the edge', () => {
    const rect = new DOMRect(10, 20, 10, 20);
    assert.isTrue(isPointInRect(new DOMPoint(10, 20), rect));
    assert.isTrue(isPointInRect(new DOMPoint(20, 40), rect));
  });

  it('returns false when the point is vertically outside the rect', () => {
    const rect = new DOMRect(10, 20, 10, 20);
    const point = new DOMPoint(15, 50);
    assert.isFalse(isPointInRect(point, rect));
  });

  it('returns false when the point is horizontally outside the rect', () => {
    const rect = new DOMRect(10, 20, 10, 20);
    const point = new DOMPoint(25, 30);
    assert.isFalse(isPointInRect(point, rect));
  });
});

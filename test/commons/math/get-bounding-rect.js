describe('getBoundingRect', () => {
  const getBoundingRect = axe.commons.math.getBoundingRect;

  it('returns a rect that bounds both rects', () => {
    const rectA = new DOMRect(10, 10, 5, 5);
    const rectB = new DOMRect(25, 25, 5, 5);
    const rectC = new DOMRect(10, 10, 20, 20);
    assert.deepEqual(getBoundingRect(rectA, rectB), rectC);
  });
});

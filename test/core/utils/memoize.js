describe('axe.utils.memoize', () => {
  it('should add the function to axe._memoizedFns', () => {
    const length = axe._memoizedFns.length;

    axe.utils.memoize(function myFn() {});
    assert.equal(axe._memoizedFns.length, length + 1);
  });
});

describe('axe.utils.memoize', () => {
  it('should add the function to axe._memoizedFns', () => {
    const length = axe._memoizedFns.length;

    axe.utils.memoize(function myFn() {});
    assert.equal(axe._memoizedFns.length, length + 1);
  });

  it('should pass options through to memoizee', () => {
    let calls = 0;
    const memoized = axe.utils.memoize(
      function myFn(vNode) {
        calls++;
        return String(vNode);
      },
      { primitive: true }
    );

    // Two different objects that stringify the same share a cache entry only
    // when the primitive option actually reaches memoizee. Without it the
    // cache keys on object identity and the function runs twice.
    assert.equal(memoized({ toString: () => 'node-1' }), 'node-1');
    assert.equal(memoized({ toString: () => 'node-1' }), 'node-1');
    assert.equal(calls, 1);
  });
});

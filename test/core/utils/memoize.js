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
        return `${vNode}#${calls}`;
      },
      { primitive: true }
    );

    // distinct objects that stringify alike share a cache entry only in
    // primitive mode; otherwise memoizee keys on object identity and the
    // second call runs the function again, returning node-1#2
    assert.equal(memoized({ toString: () => 'node-1' }), 'node-1#1');
    assert.equal(memoized({ toString: () => 'node-1' }), 'node-1#1');
  });
});

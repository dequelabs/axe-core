describe('axe.utils.memoize', () => {
  it('should add the function to axe._memoizedFns', () => {
    const length = axe._memoizedFns.length;

    axe.utils.memoize(function myFn() {});
    assert.equal(axe._memoizedFns.length, length + 1);
  });

  it('should pass options through to memoizee', () => {
    let calls = 0;
    const memoized = axe.utils.memoize(
      function myFn(vNode, isAncestor) {
        calls++;
        return `${vNode}|${isAncestor}`;
      },
      { primitive: true }
    );
    const vNode = { toString: () => 'node-1' };

    assert.equal(memoized(vNode, true), 'node-1|true');
    assert.equal(memoized(vNode, true), 'node-1|true');
    assert.equal(calls, 1);
  });
});

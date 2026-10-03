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

  it('should cache object tuples by identity', () => {
    let calls = 0;
    const memoized = axe.utils.memoize(function myFn(first, second) {
      calls++;
      return { first, second };
    });
    const first = {};
    const second = {};
    const result = memoized(first, second);
    const reverseResult = memoized(second, first);

    assert.strictEqual(memoized(first, second), result);
    assert.notStrictEqual(reverseResult, result);

    memoized.delete(first, second);
    assert.notStrictEqual(memoized(first, second), result);
    assert.strictEqual(memoized(second, first), reverseResult);

    memoized.clear();
    memoized(first, second);
    assert.equal(calls, 4);
  });

  it('should preserve memoizee key semantics', () => {
    const unary = axe.utils.memoize(value => ({ value }));
    assert.strictEqual(unary(NaN), unary(Number.NaN));
    assert.strictEqual(unary(0), unary(-0));
    assert.notStrictEqual(unary(1), unary('1'));

    let calls = 0;
    const fixed = axe.utils.memoize(function myFn(first, second) {
      calls++;
      return { first, second };
    });
    assert.strictEqual(fixed('value'), fixed('value', undefined));
    assert.strictEqual(
      fixed('value', 'second', 'ignored'),
      fixed('value', 'second', 'also ignored')
    );
    assert.equal(calls, 2);
  });

  it('should defer unusual function lengths to memoizee', () => {
    function myFn() {}
    Object.defineProperty(myFn, 'length', { value: 1.5 });

    assert.doesNotThrow(() => axe.utils.memoize(myFn));
  });

  it('should preserve unary deletion and clearing', () => {
    const memoized = axe.utils.memoize(value => ({ value }));
    const key = {};
    const first = memoized(key);
    memoized.delete(key);
    const second = memoized(key);
    assert.notStrictEqual(first, second);
    memoized.clear();
    assert.notStrictEqual(memoized(key), second);
  });

  it('should preserve explicit variadic lengths', () => {
    const memoized = axe.utils.memoize(
      function myFn(first) {
        return [first, ...Array.from(arguments).slice(1)];
      },
      { length: false }
    );
    assert.notStrictEqual(memoized('first'), memoized('first', 'second'));
  });

  it('should preserve an explicit custom normalizer', () => {
    const memoized = axe.utils.memoize(value => ({ value }), {
      normalizer: args => args[0].key
    });
    assert.strictEqual(
      memoized({ key: 'shared' }),
      memoized({ key: 'shared' })
    );
  });

  it('should retain zero-argument caching', () => {
    const memoized = axe.utils.memoize(() => ({}));
    assert.strictEqual(memoized(), memoized());
  });
});

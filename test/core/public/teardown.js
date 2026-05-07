describe('axe.teardown', () => {
  it('should reset the tree', () => {
    axe._tree = 'foo';
    axe.teardown();
    assert.isUndefined(axe._tree);
  });

  it('should reset selector data', () => {
    axe._selectorData = 'foo';
    axe.teardown();
    assert.isUndefined(axe._selectorData);
  });

  it('should reset selector data', () => {
    axe._selectCache = 'foo';
    axe.teardown();
    assert.isUndefined(axe._selectCache);
  });

  it('should reset memozied functions', () => {
    const orgFn = axe._memoizedFns[0];
    let called = false;
    axe._memoizedFns[0] = {
      clear: () => {
        called = true;
      }
    };
    axe.teardown();
    assert.isTrue(called);
    axe._memoizedFns[0] = orgFn;
  });

  it('should reset the cache', () => {
    const orgFn = axe._cache.clear;
    let called = false;
    axe._cache.clear = () => {
      called = true;
    };
    axe.teardown();
    assert.isTrue(called);
    axe._cache.clear = orgFn;
  });
});

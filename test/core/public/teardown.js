describe('axe.teardown', function () {
  'use strict';

  it('should reset the tree', function () {
    axe._tree = 'foo';
    axe.teardown();
    assert.isUndefined(axe._tree);
  });

  it('should reset selector data', function () {
    axe._selectorData = 'foo';
    axe.teardown();
    assert.isUndefined(axe._selectorData);
  });

  it('should reset selector data', function () {
    axe._selectCache = 'foo';
    axe.teardown();
    assert.isUndefined(axe._selectCache);
  });

  it('should reset memozied functions', function () {
    var orgFn = axe._memoizedFns[0];
    var called = false;
    axe._memoizedFns[0] = {
      clear: function () {
        called = true;
      }
    };
    axe.teardown();
    assert.isTrue(called);
    axe._memoizedFns[0] = orgFn;
  });

  it('should reset the cache', function () {
    var orgFn = axe._cache.clear;
    var called = false;
    axe._cache.clear = function () {
      called = true;
    };
    axe.teardown();
    assert.isTrue(called);
    axe._cache.clear = orgFn;
  });
});

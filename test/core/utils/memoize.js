describe('axe.utils.memoize', function () {
  'use strict';

  it('should add the function to axe._memoizedFns', function () {
    axe._memoizedFns.length = 0;

    axe.utils.memoize(function myFn() {});
    assert.equal(axe._memoizedFns.length, 1);
  });
});

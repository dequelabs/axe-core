describe('axe.utils.memoize', function () {
  'use strict';

  it('should add the function to axe._memoizedFns', function () {
    const length = axe._memoizedFns.length;

    axe.utils.memoize(function myFn() {});
    assert.equal(axe._memoizedFns.length, length + 1);
  });
});

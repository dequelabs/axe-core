describe('axe.utils.toArray', () => {
  it('should call Array.prototype.slice', () => {
    const orig = Array.prototype.slice;
    let called = false;
    const arrayLike = { 0: 'cats', length: 1 };

    Array.prototype.slice = function () {
      called = true;
      assert.equal(this, arrayLike);
    };

    axe.utils.toArray(arrayLike);

    assert.isTrue(called);

    Array.prototype.slice = orig;
  });

  it('should return an array', () => {
    const arrayLike = { 0: 'cats', length: 1 };

    const result = axe.utils.toArray(arrayLike);
    assert.isArray(result);
  });
});

describe('axe.utils.uniqueArray', () => {
  it('should filter duplicate values', () => {
    const array1 = [1, 2, 3, 4, 5];
    const array2 = [1, 3, 7];

    const result = axe.utils.uniqueArray(array1, array2);
    assert.isArray(result);
    assert.includeMembers(result, [1, 2, 3, 4, 5, 7]);
  });
});

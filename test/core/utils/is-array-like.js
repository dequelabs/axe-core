describe('axe.utils.isArrayLike', () => {
  const isArrayLike = axe.utils.isArrayLike;

  it('is true for an array', () => {
    assert.isTrue(isArrayLike([]));
  });

  it('is true for an array-like object', () => {
    assert.isTrue(isArrayLike({ length: 1 }));
  });

  it('is false for strings (which also have .length)', () => {
    assert.isFalse(isArrayLike('string'));
  });

  it('is false for a Node with .length', () => {
    const div = document.createElement('div');
    div.length = 123;
    assert.isFalse(isArrayLike(div));
  });

  it('is false for non-array-like objects', () => {
    assert.isFalse(isArrayLike({}));
    assert.isFalse(isArrayLike(null));
    assert.isFalse(isArrayLike(undefined));
    assert.isFalse(isArrayLike(1));
    assert.isFalse(isArrayLike(true));
    assert.isFalse(isArrayLike(false));
  });
});

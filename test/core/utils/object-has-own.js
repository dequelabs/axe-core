describe('axe.utils.objectHasOwn', () => {
  const objectHasOwn = axe.utils.objectHasOwn;

  it('is true for an object with a property', () => {
    assert.isTrue(objectHasOwn({ prop: true }, 'prop'));
  });

  it('is false for an object without a property', () => {
    assert.isFalse(objectHasOwn({}, 'prop'));
  });

  it('is false for non-objects', () => {
    assert.isFalse(objectHasOwn('string', 'prop'));
    assert.isFalse(objectHasOwn(1, 'prop'));
    assert.isFalse(objectHasOwn([], 'prop'));
    assert.isFalse(objectHasOwn(null, 'prop'));
  });

  it('is false if the property comes from the prototype', () => {
    assert.isFalse(objectHasOwn(Object.create({ prop: true }), 'prop'));
  });
});

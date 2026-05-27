describe('axe.utils.findBy', () => {
  it('should find the first matching object', () => {
    const array = [
      {
        id: 'monkeys',
        foo: 'bar'
      },
      {
        id: 'bananas'
      },
      {
        id: 'monkeys',
        bar: 'baz'
      }
    ];

    assert.equal(axe.utils.findBy(array, 'id', 'monkeys'), array[0]);
  });

  it('should return undefined with no match', () => {
    const array = [
      {
        id: 'monkeys',
        foo: 'bar'
      },
      {
        id: 'bananas'
      },
      {
        id: 'monkeys',
        bar: 'baz'
      }
    ];

    assert.isUndefined(axe.utils.findBy(array, 'id', 'macaque'));
  });

  it('should not throw if passed falsey first parameter', () => {
    assert.isUndefined(axe.utils.findBy(null, 'id', 'macaque'));
  });

  it('ignores any non-object elements in the array', () => {
    const obj = {
      id: 'monkeys',
      foo: 'bar'
    };
    const array = ['bananas', true, null, 123, obj];

    assert.equal(axe.utils.findBy(array, 'id', 'monkeys'), obj);
  });

  it('only looks at owned properties', () => {
    const obj1 = { id: 'monkeys', eat: 'bananas' };
    const obj2 = Object.create(obj1);
    obj2.id = 'gorillas';
    assert.equal(axe.utils.findBy([obj2, obj1], 'eat', 'bananas'), obj1);
  });
});

describe('axe.utils.findBy', function () {
  'use strict';

  it('should find the first matching object', function () {
    var array = [
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

  it('should return undefined with no match', function () {
    var array = [
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

  it('should not throw if passed falsey first parameter', function () {
    assert.isUndefined(axe.utils.findBy(null, 'id', 'macaque'));
  });

  it('ignores any non-object elements in the array', function () {
    var array = [
      {
        id: 'monkeys',
        foo: 'bar'
      },
      'bananas',
      true,
      null,
      123
    ];

    assert.equal(axe.utils.findBy(array, 'id', 'monkeys'), array[0]);
  });

  it('only looks at owned properties', function () {
    var array = [
      {
        id: 'monkeys',
        Constructor: 'monkeys'
      },
      {
        id: 'bananas'
      }
    ];

    assert.deepEqual(axe.utils.findBy(array, 'Constructor', 'monkeys'), {
      id: 'monkeys',
      Constructor: 'monkeys'
    });
  });
});

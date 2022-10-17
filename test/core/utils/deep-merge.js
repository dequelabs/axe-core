describe('utils.deepMerge', function () {
  var deepMerge = axe.utils.deepMerge;

  it('should merge two objects', function () {
    var obj1 = { a: 'one' };
    var obj2 = { b: 'two' };

    assert.deepEqual(deepMerge(obj1, obj2), {
      a: 'one',
      b: 'two'
    });
  });

  it('should not modify the objects', function () {
    var obj1 = { a: 'one' };
    var obj2 = { a: 'two' };
    deepMerge(obj1, obj2);

    assert.deepEqual(obj1, { a: 'one' });
    assert.deepEqual(obj2, { a: 'two' });
  });

  it('should return a new object', function () {
    var obj1 = { a: 'one' };
    var obj2 = { a: 'two' };
    var obj3 = deepMerge(obj1, obj2);

    assert.notStrictEqual(obj1, obj3);
    assert.notStrictEqual(obj2, obj3);
  });

  it('should not merge arrays', function () {
    var obj1 = { a: ['one', 'two'] };
    var obj2 = { a: ['three'] };

    assert.deepEqual(deepMerge(obj1, obj2), { a: ['three'] });
  });

  it('should merge nested objects', function () {
    var obj1 = { a: { a: ['one'] } };
    var obj2 = { a: { a: ['one', 'two'], b: 'three' } };

    assert.deepEqual(deepMerge(obj1, obj2), {
      a: {
        a: ['one', 'two'],
        b: 'three'
      }
    });
  });

  it('should accept multiple objects', function () {
    var obj1 = { a: { a: ['one'] } };
    var obj2 = { a: { a: ['one', 'two'], b: 'three' } };
    var obj3 = { a: { b: 'four' }, b: 'five' };

    assert.deepEqual(deepMerge(obj1, obj2, obj3), {
      a: {
        a: ['one', 'two'],
        b: 'four'
      },
      b: 'five'
    });
  });

  it('should handle bad sources', function () {
    var obj;

    assert.doesNotThrow(function () {
      obj = deepMerge(null, undefined, true, 'one', ['a', 'b'], 1, { a: 'b' });
    });
    assert.deepEqual(obj, { a: 'b' });
  });
});

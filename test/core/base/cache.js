describe('axe._cache', function () {
  'use strict';

  beforeEach(function () {
    axe._cache.clear();
  });

  it('should set items from the cache without error', function () {
    function fn() {
      axe._cache.set('foo', 'bar');
    }
    assert.doesNotThrow(fn);
  });

  it('should not throw for non-string keys', function () {
    function fn() {
      axe._cache.set(1, 'bar');
      axe._cache.set({}, 'bar');
      axe._cache.set(null, 'bar');
    }
    assert.doesNotThrow(fn);
  });

  it('should get an item from the cache', function () {
    axe._cache.set('foo', 'bar');
    var value = axe._cache.get('foo');
    assert.equal(value, 'bar');
  });

  it('should clear the cache', function () {
    axe._cache.set('foo', 'bar');
    axe._cache.clear();
    var value = axe._cache.get('foo');
    assert.isUndefined(value);
  });

  it('should set a default value when using `get()` with a second param', function () {
    assert.strictEqual(axe._cache.get('foo', 'bar'), 'bar');
  });

  it('should accept callbacks that return primitive types as default value', function () {
    var primitives = [12345, 'foo', false, null, undefined];

    for (var i = 0; i < primitives.length; i++) {
      var testCase = primitives[i];
      assert.strictEqual(
        axe._cache.get(i, function () {
          return testCase;
        }),
        testCase,
        typeof testCase
      );
    }
  });

  it('should accept callbacks who return objects as default value', function () {
    assert.deepEqual(
      axe._cache.get('object callback', function () {
        return {
          foo: 'bar'
        };
      }),
      { foo: 'bar' }
    );
  });

  it('should not re-calculate the default value for second `get()` call', function () {
    axe._cache.get('Foo', 12345);

    assert.strictEqual(
      typeof axe._cache.get('Foo', 'should not be set to a string'),
      'number'
    );
  });

  it('should not re-calculate the default value when it is set to `undefined`', function () {
    axe._cache.get('Foo', undefined);
    assert.strictEqual(
      typeof axe._cache.get('Foo', 'should not be set to a string'),
      'undefined'
    );
  });

  it('should not override a value from `set()` with a default `get()` value', function () {
    axe._cache.set('foo', 'bar');
    axe._cache.get('foo', 'baz');
    assert.equal(axe._cache.get('foo'), 'bar');
  });

  it('should override a value from `get()` default with a `set()` value', function () {
    axe._cache.get('foo', 'baz');
    axe._cache.set('foo', 'bar');
    assert.equal(axe._cache.get('foo'), 'bar');
  });

  it('should return undefined for key lookup miss when no default value is provided', function () {
    assert.strictEqual(typeof axe._cache.get('foo'), 'undefined');
  });

  it('should throw if there are too many arguments', function () {
    function fn() {
      axe._cache.get('foo', 'bar', 'baz');
    }
    assert.throws(fn);
  });

  it('should throw if there are no arguments', function () {
    function fn() {
      axe._cache.get();
    }
    assert.throws(fn);
  });
});

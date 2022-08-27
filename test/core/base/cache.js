describe('axe._cache', function () {
  'use strict';

  describe('set', function () {
    it('should set items from the cache without error', function () {
      function fn() {
        axe._cache.set('foo', 'bar');
      }
      assert.doesNotThrow(fn);
    });

    it('should throw for non-string keys', function () {
      assert.throws(function () {
        axe._cache.set(1, 'bar');
      }, TypeError);
      assert.throws(function () {
        axe._cache.set({}, 'bar');
      }, TypeError);
      assert.throws(function () {
        axe._cache.set(null, 'bar');
      }, TypeError);
      assert.throws(function () {
        axe._cache.set(function () {
          return;
        }, 'bar');
      }, TypeError);
    });
  });

  describe('get', function () {
    it('should get an item from the cache', function () {
      axe._cache.set('foo', 'bar');
      var value = axe._cache.get('foo');
      assert.equal(value, 'bar');
    });

    it('should return undefined for key lookup miss', function () {
      assert.isUndefined(axe._cache.get('foo'));
    });

    describe('with default value', function () {
      it('should set a default value', function () {
        assert.equal(axe._cache.get('foo', 'bar'), 'bar');
      });

      it('should accept callbacks that return primitive types', function () {
        var primitives = [12345, 'foo', false, null, undefined, {}, []];

        for (var i = 0; i < primitives.length; i++) {
          var testCase = primitives[i];
          assert.strictEqual(
            axe._cache.get(i.toString(), function () {
              return testCase;
            }),
            testCase,
            typeof testCase
          );
        }
      });

      it('default function should only be called once', function () {
        var spy = sinon.spy();
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        assert.isTrue(spy.calledOnce);
      });

      it('should not re-calculate when set to `undefined`', function () {
        axe._cache.get('Foo', undefined);
        assert.isUndefined(
          axe._cache.get('Foo', 'should not be set to a string')
        );
      });

      it('should not override a value from `set()`', function () {
        axe._cache.set('foo', 'bar');
        axe._cache.get('foo', 'baz');
        assert.equal(axe._cache.get('foo'), 'bar');
      });

      it('should override a value from `get()` with a `set()` value', function () {
        axe._cache.get('foo', 'baz');
        axe._cache.set('foo', 'bar');
        assert.equal(axe._cache.get('foo'), 'bar');
      });
    });
  });

  describe('clear', function () {
    it('should clear the cache', function () {
      axe._cache.set('foo', 'bar');
      axe._cache.clear();
      var value = axe._cache.get('foo');
      assert.isUndefined(value);
    });
  });
});

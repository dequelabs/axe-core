describe('axe._cache', function () {
  'use strict';

  describe('set', function () {
    it('should set items without error', function () {
      function fn() {
        axe._cache.set('foo', 'bar');
      }
      assert.doesNotThrow(fn);
    });

    // undefined is a valid result type of a potentially expensive operation in axe-core
    it('should set `undefined` without error', function () {
      axe._cache.set('foo', undefined);

      function fn() {
        assert.isUndefined(axe._cache.get('foo'));
      }
      assert.doesNotThrow(fn);
    });

    it('should throw TypeError for non-string keys', function () {
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

    it('should throw TypeError for empty string keys', function () {
      assert.throws(function () {
        axe._cache.set('', 'bar');
      }, TypeError);
    });
  });

  describe('get', function () {
    it('should get an item from the cache', function () {
      axe._cache.set('foo', 'bar');
      var value = axe._cache.get('foo');
      assert.equal(value, 'bar');
    });

    it('should return `undefined` for key lookup miss', function () {
      assert.isUndefined(axe._cache.get('foo'));
    });

    describe('with creator function', function () {
      it('should set and return primitive types', function () {
        assert.equal(
          axe._cache.get('integer', function () {
            return 1;
          }),
          1
        );
        assert.equal(
          axe._cache.get('float', function () {
            return 1.1;
          }),
          1.1
        );
        assert.equal(
          axe._cache.get('string', function () {
            return 'foo';
          }),
          'foo'
        );
        assert.isTrue(
          axe._cache.get('boolean', function () {
            return true;
          })
        );
        assert.isNull(
          axe._cache.get('null', function () {
            return null;
          })
        );

        var obj = { foo: 'bar' };
        assert.equal(
          axe._cache.get('object', function () {
            return obj;
          }),
          obj
        );

        assert.sameOrderedMembers(
          axe._cache.get('array', function () {
            return [1, 2, 3];
          }),
          [1, 2, 3]
        );
      });

      it('should throw TypeError when creator is not a function', function () {
        function fn() {
          axe._cache.get('foo', 'bar');
        }
        assert.throws(fn, TypeError);
      });

      it('should throw if creator is not valid, even if key exists', function () {
        axe._cache.set('foo', function () {
          return 'bar';
        });
        assert.throws(function () {
          axe._cache.get('foo', 'baz');
        }, TypeError);
      });

      it('should not execute creator if key already exists', function () {
        var spy = sinon.spy();
        axe._cache.set('foo', spy);
        axe._cache.get('foo', spy);
        assert.isFalse(spy.called);
      });

      it('creator should evaluate once', function () {
        var spy = sinon.spy(function () {
          return true;
        });
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        assert.isTrue(spy.calledOnce);
      });

      it('should not re-evaluate when return is `undefined`', function () {
        var spy = sinon.spy(function () {
          return undefined;
        });
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        assert.isTrue(spy.calledOnce);
      });

      it('should not override a value from `set()`', function () {
        axe._cache.set('foo', 'bar');
        axe._cache.get('foo', function () {
          return 'baz';
        });
        assert.equal(axe._cache.get('foo'), 'bar');
      });

      it('should override a value from `get()` with a `set()` value', function () {
        axe._cache.get('foo', function () {
          return 'baz';
        });
        axe._cache.set('foo', 'bar');
        assert.equal(axe._cache.get('foo'), 'bar');
      });

      it('should set value after calling with undefined', function () {
        axe._cache.get('foo');
        axe._cache.get('foo', function () {
          return 'value';
        });
        assert.equal(axe._cache.get('foo'), 'value');
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

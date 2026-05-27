describe('axe._cache', () => {
  describe('set', () => {
    it('should set items without error', () => {
      function fn() {
        axe._cache.set('foo', 'bar');
      }
      assert.doesNotThrow(fn);
    });

    it('should set `undefined` without error', () => {
      function fn() {
        axe._cache.set('foo', undefined);
      }
      assert.doesNotThrow(fn);
    });

    it('should throw for non-string keys', () => {
      assert.throws(() => {
        axe._cache.set(1, 'bar');
      });
      assert.throws(() => {
        axe._cache.set({}, 'bar');
      });
      assert.throws(() => {
        axe._cache.set(null, 'bar');
      });
      assert.throws(() => {
        axe._cache.set(() => {
          return;
        }, 'bar');
      });
    });

    it('should throw for empty string keys', () => {
      assert.throws(() => {
        axe._cache.set('', 'bar');
      });
    });
  });

  describe('get', () => {
    it('should get an item from the cache', () => {
      axe._cache.set('foo', 'bar');
      const value = axe._cache.get('foo');
      assert.equal(value, 'bar');
    });

    it('should return `undefined` for key lookup miss', () => {
      assert.isUndefined(axe._cache.get('foo'));
    });

    describe('with creator function', () => {
      it('should set and return primitive types', () => {
        assert.equal(
          axe._cache.get('integer', () => {
            return 1;
          }),
          1
        );
        assert.equal(
          axe._cache.get('float', () => {
            return 1.1;
          }),
          1.1
        );
        assert.equal(
          axe._cache.get('string', () => {
            return 'foo';
          }),
          'foo'
        );
        assert.isTrue(
          axe._cache.get('boolean', () => {
            return true;
          })
        );
        assert.isNull(
          axe._cache.get('null', () => {
            return null;
          })
        );

        const obj = { foo: 'bar' };
        assert.equal(
          axe._cache.get('object', () => {
            return obj;
          }),
          obj
        );

        const arr = [1, 2, 3];
        assert.equal(
          axe._cache.get('array', () => {
            return arr;
          }),
          arr
        );
      });

      it('should throw when creator is not a function', () => {
        function fn() {
          axe._cache.get('foo', 'bar');
        }
        assert.throws(fn);
      });

      it('should throw when creator function returns `undefined`', () => {
        function fn() {
          axe._cache.get('foo', () => {
            return undefined;
          });
        }
        assert.throws(fn);
      });

      it('should not evaluate creator if key already exists', () => {
        const spy = sinon.spy();
        axe._cache.set('foo', 'bar');
        axe._cache.get('foo', spy);
        assert.isTrue(spy.notCalled);
      });

      it('should evaluate creator once', () => {
        const spy = sinon.spy(() => {
          return true;
        });
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        axe._cache.get('foo', spy);
        assert.isTrue(spy.calledOnce);
      });

      it('should not override a value from `set()`', () => {
        axe._cache.set('foo', 'bar');
        axe._cache.get('foo', () => {
          return 'baz';
        });
        assert.equal(axe._cache.get('foo'), 'bar');
      });

      it('should override a value from `get()` with a `set()` value', () => {
        axe._cache.get('foo', () => {
          return 'baz';
        });
        axe._cache.set('foo', 'bar');
        assert.equal(axe._cache.get('foo'), 'bar');
      });

      it('should set value after calling with undefined', () => {
        axe._cache.get('foo');
        axe._cache.get('foo', () => {
          return 'value';
        });
        assert.equal(axe._cache.get('foo'), 'value');
      });
    });
  });

  describe('clear', () => {
    it('should clear the cache', () => {
      axe._cache.set('foo', 'bar');
      axe._cache.clear();
      const value = axe._cache.get('foo');
      assert.isUndefined(value);
    });
  });
});

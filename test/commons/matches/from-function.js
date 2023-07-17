describe('matches.fromFunction', () => {
  const fromFunction = axe.commons.matches.fromFunction;
  function noop() {}

  it('throws an error when the matcher is a number', () => {
    assert.throws(() => {
      fromFunction(noop, 123);
    });
  });

  it('throws an error when the matcher is a string', () => {
    assert.throws(() => {
      fromFunction(noop, 'foo');
    });
  });

  it('throws an error when the matcher is an array', () => {
    assert.throws(() => {
      fromFunction(noop, ['foo']);
    });
  });

  it('throws an error when the matcher is a RegExp', () => {
    assert.throws(() => {
      fromFunction(noop, /foo/);
    });
  });

  describe('with object matches', () => {
    let keyMap = {};
    function getValue(key) {
      return key;
    }

    it('passes every object key to the getValue function once', () => {
      const keys = ['foo', 'bar', 'baz'];
      function getValueOnce(key) {
        const index = keys.indexOf(key);
        assert.notEqual(index, -1);
        keys.splice(index, 1);
        return key;
      }

      fromFunction(getValueOnce, {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      });
      assert.lengthOf(keys, 0);
    });

    it('returns true if every value is matched', () => {
      keyMap = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
      assert.isTrue(fromFunction(getValue, keyMap));
    });

    it('returns false if any value is not matched', () => {
      keyMap = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
      assert.isFalse(
        fromFunction(function (key) {
          if (key === 'bar') {
            return 'mismatch';
          }
          return key;
        }, keyMap)
      );
    });

    it('returns true if there are no keys', () => {
      assert.isTrue(fromFunction(getValue, {}));
    });
  });
});

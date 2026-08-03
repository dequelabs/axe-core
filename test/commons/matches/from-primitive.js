describe('matches.fromPrimitive', () => {
  const fromPrimitive = axe.commons.matches.fromPrimitive;

  it('returns true when strictly equal', () => {
    assert.isTrue(fromPrimitive('foo', 'foo'));
    assert.isTrue(fromPrimitive(null, null));
    assert.isTrue(fromPrimitive(true, true));
    assert.isTrue(fromPrimitive(123, 123));
    assert.isTrue(fromPrimitive(undefined, undefined));
  });

  it('returns false when not strictly equal', () => {
    assert.isFalse(fromPrimitive('foo', 'bar'));
    assert.isFalse(fromPrimitive(null, undefined));
    assert.isFalse(fromPrimitive(false, null));
    assert.isFalse(fromPrimitive(true, false));
    assert.isFalse(fromPrimitive(123, 456));
    assert.isFalse(fromPrimitive(undefined, null));
  });

  describe('with array matchers', () => {
    it('returns true if the string is included', () => {
      assert.isTrue(fromPrimitive('bar', ['foo', 'bar', 'baz']));
    });
    it('returns false if the string is not included', () => {
      assert.isFalse(fromPrimitive('foo bar', ['foo', 'bar', 'baz']));
    });
    it('returns false when passed `undefined`', () => {
      assert.isFalse(fromPrimitive(undefined, ['foo', 'bar', 'baz']));
    });
  });

  describe('with function matchers', () => {
    it('returns true if the function returns a truthy value', () => {
      assert.isTrue(
        fromPrimitive('foo', val => {
          assert.equal(val, 'foo');
          return true;
        })
      );
      assert.isTrue(
        fromPrimitive('foo', () => {
          return 123;
        })
      );
      assert.isTrue(
        fromPrimitive('foo', () => {
          return {};
        })
      );
    });
    it('returns false if the function returns a falsey value', () => {
      assert.isFalse(
        fromPrimitive('foo', val => {
          assert.equal(val, 'foo');
          return false;
        })
      );
      assert.isFalse(
        fromPrimitive('foo', () => {
          return 0;
        })
      );
      assert.isFalse(
        fromPrimitive('foo', () => {
          return undefined;
        })
      );
    });
  });

  describe('with RegExp matchers', () => {
    it('returns true if the regexp matches', () => {
      assert.isTrue(fromPrimitive('bar', /^(foo|bar|baz)$/));
    });
    it('returns false if the regexp does not match', () => {
      assert.isFalse(fromPrimitive('foobar', /^(foo|bar|baz)$/));
    });
    it('returns false for null value', () => {
      assert.isFalse(fromPrimitive(null, /.*/));
    });
  });

  describe('with RegExp string', () => {
    it('returns true if the regexp matches', () => {
      assert.isTrue(fromPrimitive('bar', '/^(foo|bar|baz)$/'));
    });
    it('returns false if the regexp does not match', () => {
      assert.isFalse(fromPrimitive('foobar', '/^(foo|bar|baz)$/'));
    });
    it('returns false for null value', () => {
      assert.isFalse(fromPrimitive(null, '/.*/'));
    });
  });
});

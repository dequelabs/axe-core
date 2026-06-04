describe('matches.fromPrimative', () => {
  const fromPrimative = axe.commons.matches.fromPrimative;

  it('returns true when strictly equal', () => {
    assert.isTrue(fromPrimative('foo', 'foo'));
    assert.isTrue(fromPrimative(null, null));
    assert.isTrue(fromPrimative(true, true));
    assert.isTrue(fromPrimative(123, 123));
    assert.isTrue(fromPrimative(undefined, undefined));
  });

  it('returns false when not strictly equal', () => {
    assert.isFalse(fromPrimative('foo', 'bar'));
    assert.isFalse(fromPrimative(null, undefined));
    assert.isFalse(fromPrimative(false, null));
    assert.isFalse(fromPrimative(true, false));
    assert.isFalse(fromPrimative(123, 456));
    assert.isFalse(fromPrimative(undefined, null));
  });

  describe('with array matchers', () => {
    it('returns true if the string is included', () => {
      assert.isTrue(fromPrimative('bar', ['foo', 'bar', 'baz']));
    });
    it('returns false if the string is not included', () => {
      assert.isFalse(fromPrimative('foo bar', ['foo', 'bar', 'baz']));
    });
    it('returns false when passed `undefined`', () => {
      assert.isFalse(fromPrimative(undefined, ['foo', 'bar', 'baz']));
    });
  });

  describe('with function matchers', () => {
    it('returns true if the function returns a truthy value', () => {
      assert.isTrue(
        fromPrimative('foo', val => {
          assert.equal(val, 'foo');
          return true;
        })
      );
      assert.isTrue(
        fromPrimative('foo', () => {
          return 123;
        })
      );
      assert.isTrue(
        fromPrimative('foo', () => {
          return {};
        })
      );
    });
    it('returns false if the function returns a falsey value', () => {
      assert.isFalse(
        fromPrimative('foo', val => {
          assert.equal(val, 'foo');
          return false;
        })
      );
      assert.isFalse(
        fromPrimative('foo', () => {
          return 0;
        })
      );
      assert.isFalse(
        fromPrimative('foo', () => {
          return undefined;
        })
      );
    });
  });

  describe('with RegExp matchers', () => {
    it('returns true if the regexp matches', () => {
      assert.isTrue(fromPrimative('bar', /^(foo|bar|baz)$/));
    });
    it('returns false if the regexp does not match', () => {
      assert.isFalse(fromPrimative('foobar', /^(foo|bar|baz)$/));
    });
    it('returns false for null value', () => {
      assert.isFalse(fromPrimative(null, /.*/));
    });
  });

  describe('with RegExp string', () => {
    it('returns true if the regexp matches', () => {
      assert.isTrue(fromPrimative('bar', '/^(foo|bar|baz)$/'));
    });
    it('returns false if the regexp does not match', () => {
      assert.isFalse(fromPrimative('foobar', '/^(foo|bar|baz)$/'));
    });
    it('returns false for null value', () => {
      assert.isFalse(fromPrimative(null, '/.*/'));
    });
  });
});

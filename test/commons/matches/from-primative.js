describe('matches.fromPrimative', function () {
  var fromPrimative = axe.commons.matches.fromPrimative;

  it('returns true when strictly equal', function () {
    assert.isTrue(fromPrimative('foo', 'foo'));
    assert.isTrue(fromPrimative(null, null));
    assert.isTrue(fromPrimative(true, true));
    assert.isTrue(fromPrimative(123, 123));
    assert.isTrue(fromPrimative(undefined, undefined));
  });

  it('returns false when not strictly equal', function () {
    assert.isFalse(fromPrimative('foo', 'bar'));
    assert.isFalse(fromPrimative(null, undefined));
    assert.isFalse(fromPrimative(false, null));
    assert.isFalse(fromPrimative(true, false));
    assert.isFalse(fromPrimative(123, 456));
    assert.isFalse(fromPrimative(undefined, null));
  });

  describe('with array matchers', function () {
    it('returns true if the string is included', function () {
      assert.isTrue(fromPrimative('bar', ['foo', 'bar', 'baz']));
    });
    it('returns false if the string is not included', function () {
      assert.isFalse(fromPrimative('foo bar', ['foo', 'bar', 'baz']));
    });
    it('returns false when passed `undefined`', function () {
      assert.isFalse(fromPrimative(undefined, ['foo', 'bar', 'baz']));
    });
  });

  describe('with function matchers', function () {
    it('returns true if the function returns a truthy value', function () {
      assert.isTrue(
        fromPrimative('foo', function (val) {
          assert.equal(val, 'foo');
          return true;
        })
      );
      assert.isTrue(
        fromPrimative('foo', function () {
          return 123;
        })
      );
      assert.isTrue(
        fromPrimative('foo', function () {
          return {};
        })
      );
    });
    it('returns false if the function returns a falsey value', function () {
      assert.isFalse(
        fromPrimative('foo', function (val) {
          assert.equal(val, 'foo');
          return false;
        })
      );
      assert.isFalse(
        fromPrimative('foo', function () {
          return 0;
        })
      );
      assert.isFalse(
        fromPrimative('foo', function () {
          return undefined;
        })
      );
    });
  });

  describe('with RegExp matchers', function () {
    it('returns true if the regexp matches', function () {
      assert.isTrue(fromPrimative('bar', /^(foo|bar|baz)$/));
    });
    it('returns false if the regexp does not match', function () {
      assert.isFalse(fromPrimative('foobar', /^(foo|bar|baz)$/));
    });
    it('returns false for null value', function () {
      assert.isFalse(fromPrimative(null, /.*/));
    });
  });

  describe('with RegExp string', function () {
    it('returns true if the regexp matches', function () {
      assert.isTrue(fromPrimative('bar', '/^(foo|bar|baz)$/'));
    });
    it('returns false if the regexp does not match', function () {
      assert.isFalse(fromPrimative('foobar', '/^(foo|bar|baz)$/'));
    });
    it('returns false for null value', function () {
      assert.isFalse(fromPrimative(null, '/.*/'));
    });
  });
});

describe('axe.utils.assert', function () {
  it('does nothing when passed a truthy value', function () {
    assert.doesNotThrow(function () {
      axe.utils.assert(true);
      axe.utils.assert('foo');
      axe.utils.assert(123);
      axe.utils.assert([]);
      axe.utils.assert({});
    });
  });

  it('throws an error when passed a falsey value', function () {
    assert.throws(function () {
      axe.utils.assert(false);
    });
    assert.throws(function () {
      axe.utils.assert(0);
    });
    assert.throws(function () {
      axe.utils.assert(null);
    });
    assert.throws(function () {
      axe.utils.assert(undefined);
    });
  });

  it('sets second argument as the error message', function () {
    var message = 'Something went wrong';
    try {
      axe.utils.assert(false, message);
    } catch (e) {
      assert.instanceOf(e, Error);
      assert.equal(e.message, message);
    }
  });
});

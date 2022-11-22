describe('matches.condition', function () {
  var condition = axe.commons.matches.condition;

  it('passes the first argument to the condition', function () {
    var count = 0;
    condition('foo', function (foo) {
      assert.equal('foo', foo);
      count++;
    });
    assert.equal(count, 1);
  });

  it('returns true if the condition returns a truthy value', function () {
    assert.isTrue(
      condition('foo', function () {
        return 123;
      })
    );
  });

  it('returns false if the condition returns a falsey value', function () {
    assert.isFalse(
      condition('foo', function () {
        return 0;
      })
    );
  });
});

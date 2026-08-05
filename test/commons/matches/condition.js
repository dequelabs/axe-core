describe('matches.condition', () => {
  const condition = axe.commons.matches.condition;

  it('passes the first argument to the condition', () => {
    let count = 0;
    condition('foo', foo => {
      assert.equal('foo', foo);
      count++;
    });
    assert.equal(count, 1);
  });

  it('returns true if the condition returns a truthy value', () => {
    assert.isTrue(
      condition('foo', () => {
        return 123;
      })
    );
  });

  it('returns false if the condition returns a falsey value', () => {
    assert.isFalse(
      condition('foo', () => {
        return 0;
      })
    );
  });
});

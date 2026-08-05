describe('heading-order-partial-context test', () => {
  let results;
  before(done => {
    axe.run(
      { include: [['header'], ['footer']] },
      { runOnly: ['heading-order'] },
      (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      }
    );
  });

  it('should find 2 passes', () => {
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.passes[0].nodes, 2);
  });

  it('should find 0 violations', () => {
    assert.lengthOf(results.violations, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

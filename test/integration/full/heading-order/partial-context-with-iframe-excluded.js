describe('heading-order-partial-context-with-iframe test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
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
  });

  it('should find 1 passes', () => {
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.passes[0].nodes, 1);
  });

  it('should find 1 violation', () => {
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.violations[0].nodes, 1);
  });

  it('should find 0 incompletes', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

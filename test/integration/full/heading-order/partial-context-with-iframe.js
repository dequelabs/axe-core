describe('heading-order-partial-context-with-iframe test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { include: [['header'], ['footer'], ['iframe']] },
        { runOnly: ['heading-order'] },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  it('should find 4 passes', () => {
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.passes[0].nodes, 4);
  });

  it('should find 0 violations', () => {
    assert.lengthOf(results.violations, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

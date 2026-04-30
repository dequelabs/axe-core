describe('document-title test failure', () => {
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['document-title'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 1', () => {
      assert.lengthOf(results.violations[0].nodes, 1);
    });
    it('should find first level iframe', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
    });
  });

  describe('passes', () => {
    it('should find 0', () => {
      assert.lengthOf(results.passes, 0);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

describe('th-has-data-cells cantTell test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        '#fixture',
        {
          runOnly: { type: 'rule', values: ['th-has-data-cells'] }
        },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('passes/violations', () => {
    it('should find 0 passes', () => {
      assert.lengthOf(results.passes, 0);
    });
    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete data', () => {
    it('should be incomplete for missing or empty data cells', () => {
      const resultNodes = results.incomplete[0].nodes;
      assert.lengthOf(resultNodes, 2);
      resultNodes[0].any.forEach(check => {
        assert.match(check.message, 'Table data cells are missing or empty');
      });
    });
  });
});

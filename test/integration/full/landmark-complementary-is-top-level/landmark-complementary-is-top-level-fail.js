describe('landmark-complementary-is-top-level test fail', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        {
          runOnly: {
            type: 'rule',
            values: ['landmark-complementary-is-top-level']
          }
        },
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
      assert.lengthOf(results.violations, 1);
    });

    it('should find 3 nodes', () => {
      assert.lengthOf(results.violations[0].nodes, 3);
    });
  });

  describe('passes', () => {
    it('should find none', () => {
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

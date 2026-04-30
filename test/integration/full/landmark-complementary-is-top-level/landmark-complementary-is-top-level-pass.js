describe('landmark-complementary-is-top-level test pass', () => {
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
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 5', () => {
      assert.lengthOf(results.passes[0].nodes, 5);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

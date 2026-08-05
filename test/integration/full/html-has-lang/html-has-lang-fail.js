/**
 * Note:
 * This rule does not include `iframe` uses matches "window-is-top.js"
 */
describe('html-has-lang fail test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['html-has-lang'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 1 violations', () => {
      assert.lengthOf(results.violations, 1);
    });

    it('should find #fail1', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
    });
  });

  describe('passes', () => {
    it('should find 0 passes', () => {
      assert.lengthOf(results.passes, 0);
    });
  });
});

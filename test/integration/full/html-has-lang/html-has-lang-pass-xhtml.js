/**
 * Note:
 * This rule does not include `iframe` uses matches "window-is-top.js"
 */
describe('html-has-lang pass test', () => {
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
    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 1', () => {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find #pass1', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
    });
  });
});

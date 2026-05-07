describe(`aria-hidden on body test ${window.location.pathname}`, () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['aria-hidden-body'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find some', () => {
      assert.lengthOf(results.violations, 1);
    });
  });
});

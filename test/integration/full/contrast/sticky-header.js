describe('color-contrast sticky header test', () => {
  describe('violations', () => {
    it('should find none', done => {
      axe.run(
        '#fixture',
        { runOnly: { type: 'rule', values: ['color-contrast'] } },
        (err, results) => {
          assert.isNull(err);
          assert.lengthOf(results.violations, 0);
          done();
        }
      );
    });
  });
});

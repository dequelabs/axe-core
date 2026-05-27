describe('definition-list overriden with ARIA role', () => {
  it('should find no matches', done => {
    axe.run(
      { runOnly: { type: 'rule', values: ['definition-list'] } },
      (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0);
        assert.lengthOf(results.passes, 0);
        done();
      }
    );
  });
});

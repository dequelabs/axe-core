describe('list overriden with ARIA role', () => {
  it('should find no matches', done => {
    axe.run(
      '#fixture',
      { runOnly: { type: 'rule', values: ['list'] } },
      (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        done();
      }
    );
  });
});

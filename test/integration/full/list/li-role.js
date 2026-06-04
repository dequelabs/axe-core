describe('li overriden with ARIA role', () => {
  it('should find no matching violations and one pass', done => {
    axe.run(
      '#fixture',
      { runOnly: { type: 'rule', values: ['listitem'] } },
      (err, results) => {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0, 'violations');
        assert.lengthOf(results.passes, 1, 'passes');
        assert.lengthOf(results.passes[0].nodes, 1, 'ARIA container');
        done();
      }
    );
  });
});

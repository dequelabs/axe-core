describe('meta-refresh inapplicable', () => {
  it('should be inapplicable', done => {
    axe.run({ runOnly: 'meta-refresh' }, (err, results) => {
      try {
        assert.isNull(err);
        assert.lengthOf(results.violations, 0, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        assert.lengthOf(results.incomplete, 0, 'passes');
        assert.lengthOf(results.inapplicable, 1, 'inapplicable');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});

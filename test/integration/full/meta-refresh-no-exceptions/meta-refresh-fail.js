describe('meta-refresh-no-exceptions fail', () => {
  it('should be a violation', done => {
    axe.run({ runOnly: 'meta-refresh-no-exceptions' }, (err, results) => {
      try {
        assert.isNull(err);
        assert.lengthOf(results.violations, 1, 'violations');
        assert.lengthOf(results.passes, 0, 'passes');
        assert.lengthOf(results.incomplete, 0, 'passes');
        assert.lengthOf(results.inapplicable, 0, 'inapplicable');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});

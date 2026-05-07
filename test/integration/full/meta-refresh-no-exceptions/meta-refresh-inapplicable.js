describe('meta-refresh-no-exceptions inapplicable', () => {
  it('should be inapplicable', done => {
    axe.run({ runOnly: 'meta-refresh-no-exceptions' }, (err, results) => {
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

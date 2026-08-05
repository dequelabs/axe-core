describe('html-xml-lang-mismatch test', () => {
  let results;
  before(done => {
    axe.run(
      {
        runOnly: {
          type: 'rule',
          values: ['html-xml-lang-mismatch']
        }
      },
      (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      }
    );
  });

  describe('inapplicable', () => {
    it('should find one', () => {
      assert.lengthOf(results.inapplicable, 1);
    });
  });
});

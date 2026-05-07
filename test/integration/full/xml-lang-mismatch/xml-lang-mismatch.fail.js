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

  describe('violations', () => {
    it('should find one', () => {
      assert.lengthOf(results.violations[0].nodes, 1);
    });

    it('should find html', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, ['html']);
    });
  });
});

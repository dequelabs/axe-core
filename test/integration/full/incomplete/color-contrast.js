describe('contrast cantTell test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        '#fixture',
        {
          runOnly: { type: 'rule', values: ['color-contrast'] }
        },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('passes/violations', () => {
    it('should find 0 passes', () => {
      assert.lengthOf(results.passes, 0);
    });
    it('should find 0 violations', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete data', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete, 1);
    });

    describe('indicating specific reasons', () => {
      it('works for image nodes', () => {
        const resultNodes = results.incomplete[0].nodes;
        resultNodes[0].any.forEach(check => {
          assert.match(check.message, /image node/);
        });
      });

      it('works for background gradients', () => {
        const resultNodes = results.incomplete[0].nodes;
        resultNodes[1].any.forEach(check => {
          assert.match(check.message, /background gradient/);
        });
      });
    });
  });
});

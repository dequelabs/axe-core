describe('region fail test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run({ runOnly: { type: 'rule', values: ['region'] } }, (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('violations', () => {
    it('should find all violations', () => {
      assert.lengthOf(results.violations[0].nodes, 6);
    });

    it('should find wrapper', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#wrapper']);
    });

    it('should find image without an alt tag', () => {
      assert.deepEqual(results.violations[0].nodes[1].target, ['#img-no-alt']);
    });

    it('should find focusable image', () => {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#img-focusable'
      ]);
    });

    it('should find image with global aria attr', () => {
      assert.deepEqual(results.violations[0].nodes[3].target, [
        '#img-aria-global'
      ]);
    });

    it('should find object with a label', () => {
      assert.deepEqual(results.violations[0].nodes[4].target, [
        '#labeled-object'
      ]);
    });

    it('should find div with an role of none', () => {
      assert.deepEqual(results.violations[0].nodes[5].target, [
        '#none-role-div'
      ]);
    });
  });
});

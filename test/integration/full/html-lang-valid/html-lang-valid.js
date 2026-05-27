describe('html-lang-valid test', () => {
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        { runOnly: { type: 'rule', values: ['html-lang-valid'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 3', () => {
      assert.lengthOf(results.violations[0].nodes, 3);
    });

    it('should find first level iframe', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        '#frame1',
        '#violation1'
      ]);
    });

    it('should find second level iframe', () => {
      assert.deepEqual(results.violations[0].nodes[1].target, [
        '#frame1',
        '#frame2',
        '#violation2'
      ]);
    });

    it('should find #violation2c', () => {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#frame1',
        '#frame5',
        '#violation2c'
      ]);
    });
  });

  describe('passes', () => {
    it('should find 2', () => {
      assert.lengthOf(results.passes[0].nodes, 2);
    });

    it('should find #pass1', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, [
        '#frame1',
        '#frame3',
        '#pass1'
      ]);
    });

    it('should find #pass2b', () => {
      assert.deepEqual(results.passes[0].nodes[1].target, [
        '#frame1',
        '#frame4',
        '#pass2b'
      ]);
    });
  });
});

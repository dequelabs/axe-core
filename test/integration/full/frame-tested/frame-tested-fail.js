describe('frame-tested-fail test', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run(
        {
          runOnly: { type: 'rule', values: ['frame-tested'] },
          checks: {
            'frame-tested': { options: { isViolation: true } }
          }
        },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 1', () => {
      assert.lengthOf(results.violations[0].nodes, 1);
    });
    it('should find the failing iframe', () => {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        '#frame',
        '#fail'
      ]);
    });
  });

  describe('incomplete', () => {
    it('should find 0', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('passes', () => {
    it('should find 2', () => {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 2);

      assert.deepEqual(results.passes[0].nodes[0].target, ['#frame']);
      assert.deepEqual(results.passes[0].nodes[1].target, ['#frame', '#pass']);
    });
  });
});

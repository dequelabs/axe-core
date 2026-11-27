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
    it('should find 2', () => {
      assert.lengthOf(results.violations[0].nodes, 2);
    });
    it('should find the failing iframe and frame', () => {
      assert.deepEqual(
        results.violations[0].nodes.map(node => node.target),
        [
          ['#frame', '#fail'],
          ['#frameset', '#fail']
        ]
      );
    });
  });

  describe('incomplete', () => {
    it('should find 0', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('passes', () => {
    it('should find 4', () => {
      assert.lengthOf(results.passes, 1);
      assert.deepEqual(
        results.passes[0].nodes.map(node => node.target),
        [['#frame'], ['#frame', '#pass'], ['#frameset'], ['#frameset', '#pass']]
      );
    });
  });
});

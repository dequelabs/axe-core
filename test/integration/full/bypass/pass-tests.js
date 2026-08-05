describe(`bypass aria header test ${window.location.pathname}`, () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      axe.run({ runOnly: { type: 'rule', values: ['bypass'] } }, (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('incomplete', () => {
    it('should find none', () => {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('passes', () => {
    it('should find 1', () => {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find html', () => {
      assert.isTrue(results.passes[0].nodes[0].target[0].startsWith('html'));
    });
  });
});

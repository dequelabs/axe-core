describe('bypass iframe test pass', () => {
  let results;
  before(function (done) {
    this.timeout = 50000;
    axe.testUtils.awaitNestedLoad(() => {
      // Stop messing with my tests Mocha!
      const heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass pass test fail</b></div>';
      }

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

    it('should find #pass1', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
    });
  });
});

describe('bypass iframe test fail', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      // Stop messing with my tests Mocha!
      const heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<div><b>bypass iframe test fail</b></div>';
      }

      axe.run({ runOnly: { type: 'rule', values: ['bypass'] } }, (err, r) => {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('incomplete', () => {
    it('should find 1', () => {
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });

    it('should find #frame1', () => {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#fail1']);
    });
  });

  describe('passes', () => {
    it('should find none', () => {
      assert.lengthOf(results.passes, 0);
    });
  });
});

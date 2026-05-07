describe('page-has-heading-one test pass 8', () => {
  let results;
  before(done => {
    axe.testUtils.awaitNestedLoad(() => {
      // Stop messing with my tests Mocha!
      const heading = document.querySelector('#mocha h1');
      if (heading) {
        heading.outerHTML = '<h2>page-has-heading-one test</h2>';
      }

      axe.run(
        { runOnly: { type: 'rule', values: ['page-has-heading-one'] } },
        (err, r) => {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', () => {
    it('should find 0', () => {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', () => {
    it('should find 1', () => {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find #pass8', () => {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass8']);
    });
  });

  it('should find 0 inapplicable', () => {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', () => {
    assert.lengthOf(results.incomplete, 0);
  });
});

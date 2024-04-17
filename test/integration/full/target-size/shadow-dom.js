describe('target-size shadow dom test', () => {
  'use strict';
  let results;

  before(done => {
    axe.testUtils.awaitNestedLoad(async () => {
      const options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      const context = {
        // ignore the mocha links
        exclude: '#mocha'
      };
      results = await axe.run(context, options);
      done();
    });
  });

  describe('violations', function () {
    it('should find 0', function () {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', function () {
    it('should find 2', function () {
      assert.lengthOf(results.passes[0].nodes, 2);
    });
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});

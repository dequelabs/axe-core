describe('landmark-no-duplicate-banner test pass', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['landmark-no-duplicate-banner'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find 0', function () {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', function () {
    it('should find 1', function () {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find #frame1, #pass2', function () {
      assert.deepEqual(results.passes[0].nodes[0].target, [
        '#frame1',
        '#pass2'
      ]);
    });
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});

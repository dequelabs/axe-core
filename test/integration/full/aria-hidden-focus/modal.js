describe('aria-hidden-focus test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['aria-hidden-focus'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find 0 violations', function () {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', function () {
    it('should find 0 passes', function () {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete', function () {
    it('should find 1', function () {
      assert.lengthOf(results.incomplete[0].nodes, 1);
    });

    it('should find #incomplete1', function () {
      assert.deepEqual(results.incomplete[0].nodes[0].target, ['#incomplete1']);
    });
  });
});

describe('region pass test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run({ runOnly: ['region'] }, function (err, r) {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('passes', function () {
    it('should pass nodes', function () {
      // it seems CircleCI and localhost have different number of DOM nodes,
      // so as long as everything passes and nothing fails, the rule is working
      assert.isTrue(results.passes[0].nodes.length > 0);
    });
  });

  describe('violations', function () {
    it('should find none', function () {
      assert.lengthOf(results.violations, 0);
    });
  });
});

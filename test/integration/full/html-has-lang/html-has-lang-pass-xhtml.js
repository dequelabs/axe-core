/**
 * Note:
 * This rule does not include `iframe` uses matches "window-is-top.js"
 */
describe('html-has-lang pass test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['html-has-lang'] } },
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
    it('should find 1', function () {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find #pass1', function () {
      assert.deepEqual(results.passes[0].nodes[0].target, ['#pass1']);
    });
  });
});

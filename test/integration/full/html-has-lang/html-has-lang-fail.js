/**
 * Note:
 * This rule does not include `iframe` uses matches "window-is-top.js"
 */
describe('html-has-lang fail test', function () {
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
    it('should find 1 violations', function () {
      assert.lengthOf(results.violations, 1);
    });

    it('should find #fail1', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
    });
  });

  describe('passes', function () {
    it('should find 0 passes', function () {
      assert.lengthOf(results.passes, 0);
    });
  });
});

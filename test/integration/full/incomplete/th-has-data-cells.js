describe('th-has-data-cells cantTell test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        '#fixture',
        {
          runOnly: { type: 'rule', values: ['th-has-data-cells'] }
        },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('passes/violations', function () {
    it('should find 0 passes', function () {
      assert.lengthOf(results.passes, 0);
    });
    it('should find 0 violations', function () {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('incomplete data', function () {
    it('should be incomplete for missing or empty data cells', function () {
      var resultNodes = results.incomplete[0].nodes;
      assert.lengthOf(resultNodes, 2);
      resultNodes[0].any.forEach(function (check) {
        assert.match(check.message, 'Table data cells are missing or empty');
      });
    });
  });
});

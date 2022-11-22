describe('region fail test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['region'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find one', function () {
      assert.lengthOf(results.violations[0].nodes, 1);
    });

    it('should find wrapper', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        'iframe',
        'iframe',
        '#wrapper'
      ]);
    });
  });
});

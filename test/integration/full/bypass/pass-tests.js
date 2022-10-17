describe('bypass aria header test ' + window.location.pathname, function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['bypass'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('incomplete', function () {
    it('should find none', function () {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('passes', function () {
    it('should find 1', function () {
      assert.lengthOf(results.passes[0].nodes, 1);
    });

    it('should find html', function () {
      assert.deepEqual(results.passes[0].nodes[0].target, ['html']);
    });
  });
});

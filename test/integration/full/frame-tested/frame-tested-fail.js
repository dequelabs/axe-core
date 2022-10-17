describe('frame-tested-fail test', function () {
  'use strict';

  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        {
          runOnly: { type: 'rule', values: ['frame-tested'] },
          checks: {
            'frame-tested': { options: { isViolation: true } }
          }
        },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find 1', function () {
      assert.lengthOf(results.violations[0].nodes, 1);
    });
    it('should find the failing iframe', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        '#frame',
        '#fail'
      ]);
    });
  });

  describe('incomplete', function () {
    it('should find 0', function () {
      assert.lengthOf(results.incomplete, 0);
    });
  });

  describe('passes', function () {
    it('should find 2', function () {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 2);

      assert.deepEqual(results.passes[0].nodes[0].target, ['#frame']);
      assert.deepEqual(results.passes[0].nodes[1].target, ['#frame', '#pass']);
    });
  });
});

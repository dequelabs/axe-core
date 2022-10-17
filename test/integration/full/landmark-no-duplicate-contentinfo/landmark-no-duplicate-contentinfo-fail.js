describe('landmark-no-more-than-one-contentinfo test failure', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        {
          runOnly: {
            type: 'rule',
            values: ['landmark-no-duplicate-contentinfo']
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
    it('should find 3', function () {
      assert.lengthOf(results.violations[0].nodes, 3);
    });

    it('should find #fail1', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#fail1']);
    });

    it('should find #frame1, #fail2', function () {
      assert.deepEqual(results.violations[0].nodes[1].target, [
        '#frame1',
        '#fail2'
      ]);
    });

    it('should find #frame1, #frame2, #fail3', function () {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#frame1',
        '#frame2',
        '#fail3'
      ]);
    });
  });

  describe('passes', function () {
    it('should find 0', function () {
      assert.lengthOf(results.passes, 0);
    });
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});

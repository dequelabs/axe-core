describe('identical-links-same-purpose test', function () {
  'use strict';

  var config = {
    runOnly: {
      type: 'rule',
      values: ['identical-links-same-purpose']
    }
  };

  before(function (done) {
    axe.testUtils.awaitNestedLoad(done);
    axe._tree = undefined;
  });

  it('should find no violations given a selector array', function (done) {
    axe.run(config, function (err, results) {
      assert.isNull(err);

      /**
       * assert `passes`
       */
      assert.lengthOf(results.passes, 1, 'passes');
      assert.lengthOf(results.passes[0].nodes, 1);
      assert.deepEqual(results.passes[0].nodes[0].target, [
        '#pass-outside-frame'
      ]);
      assert.deepEqual(
        results.passes[0].nodes[0].all[0].relatedNodes[0].target,
        ['#myframe', '#pass-inside-frame']
      );

      /**
       * assert `incomplete`
       */
      assert.lengthOf(results.incomplete, 1, 'incomplete');
      assert.lengthOf(results.incomplete[0].nodes, 1);
      assert.deepEqual(results.incomplete[0].nodes[0].target, [
        '#myframe',
        '#incomplete-inside-frame'
      ]);
      assert.deepEqual(
        results.incomplete[0].nodes[0].all[0].relatedNodes[0].target,
        ['#incomplete-outside-frame']
      );

      done();
    });
  });
});

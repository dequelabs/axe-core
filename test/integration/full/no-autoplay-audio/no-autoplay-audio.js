describe('landmark-no-duplicate-main test failure', function () {
  'use strict';

  var results;

  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['no-autoplay-audio'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('passes', function () {
    it('should find 7', function () {
      assert.isDefined(results.passes);

      var passNodes = results.passes[0].nodes;
      assert.lengthOf(passNodes, 7);
      assert.deepEqual(passNodes[0].target, ['#pass1']);
      assert.deepEqual(passNodes[1].target, ['#pass2']);
      assert.deepEqual(passNodes[2].target, ['#pass3']);
      assert.deepEqual(passNodes[3].target, ['#pass4']);
      assert.deepEqual(passNodes[4].target, ['#pass5']);
      assert.deepEqual(passNodes[5].target, ['#pass6']);
      assert.deepEqual(passNodes[6].target, ['#pass7']);
    });
  });

  it('should find 0 violations', function () {
    assert.lengthOf(results.violations, 0);
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  describe('incomplete', function () {
    it('should find 6', function () {
      assert.isDefined(results.incomplete);

      var incompleteNodes = results.incomplete[0].nodes;
      assert.lengthOf(incompleteNodes, 6);
      assert.deepEqual(incompleteNodes[0].target, ['#incomplete1']);
      assert.deepEqual(incompleteNodes[1].target, ['#incomplete2']);
      assert.deepEqual(incompleteNodes[2].target, ['#incomplete3']);
      assert.deepEqual(incompleteNodes[3].target, ['#incomplete4']);
      assert.deepEqual(incompleteNodes[4].target, ['#incomplete5']);
      assert.deepEqual(incompleteNodes[5].target, ['#incomplete6']);
    });
  });
});

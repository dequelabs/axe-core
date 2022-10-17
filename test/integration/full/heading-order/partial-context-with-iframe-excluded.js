describe('heading-order-partial-context-with-iframe test', function () {
  'use strict';

  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { include: [['header'], ['footer']] },
        { runOnly: ['heading-order'] },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  it('should find 1 passes', function () {
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.passes[0].nodes, 1);
  });

  it('should find 1 violation', function () {
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.violations[0].nodes, 1);
  });

  it('should find 0 incompletes', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});

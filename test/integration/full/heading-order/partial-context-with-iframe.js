describe('heading-order-partial-context-with-iframe test', function () {
  'use strict';

  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { include: [['header'], ['footer'], ['iframe']] },
        { runOnly: ['heading-order'] },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  it('should find 4 passes', function () {
    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.passes[0].nodes, 4);
  });

  it('should find 0 violations', function () {
    assert.lengthOf(results.violations, 0);
  });

  it('should find 0 incomplete', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});


describe('focus test failure', function () {
  'use strict';
  var results;

  before(function (done) {
    axe.run({ runOnly: { type: 'rule', values: ['focus'] } }, function (err, r) {
      assert.isNull(err);
      results = r;
      done();
    });
  });

  describe('violations', function () {
    it('should find 7', function () {
      assert.lengthOf(results.violations[0].nodes, 7);
    });
  });

  describe('passes', function () {
    it('should find 1', function () {
      assert.lengthOf(results.passes[0].nodes, 1);
    });
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 1 incomplete', function () {
    assert.lengthOf(results.incomplete[0].nodes, 1);
  });
});

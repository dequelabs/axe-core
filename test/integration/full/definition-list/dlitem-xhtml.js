
describe('dlitem XHTML test', function () {
  'use strict';

  var results;

  before(function (done) {
    axe.run({ runOnly: { type: 'rule', values: ['dlitem'] } }, function (err, r) {
      assert.isNull(err);
      results = r;
      done();
    });
  });

  describe('violations', function() {

    it('should find 2', function () {
      assert.lengthOf(results.violations, 1);
      assert.lengthOf(results.violations[0].nodes, 2);
    });

    it('should find #uncontained and #also', function () {
      assert.equal(results.violations[0].nodes[0].any[0].id, 'dlitem');
      assert.deepEqual(results.violations[0].nodes[0].target, ['#uncontained']);
    });

    it('should find #alsouncontained', function () {
      assert.equal(results.violations[0].nodes[1].any[0].id, 'dlitem');
      assert.deepEqual(results.violations[0].nodes[1].target, ['#alsouncontained']);
    });

  });

  describe('passes', function() {

    it('should find 2', function () {
      assert.lengthOf(results.passes, 1);
      assert.lengthOf(results.passes[0].nodes, 2);
    });

    it('should find #uncontained and #also', function () {
      assert.equal(results.passes[0].nodes[0].any[0].id, 'dlitem');
      assert.deepEqual(results.passes[0].nodes[0].target, ['#contained']);
    });

    it('should find #alsouncontained', function () {
      assert.equal(results.passes[0].nodes[1].any[0].id, 'dlitem');
      assert.deepEqual(results.passes[0].nodes[1].target, ['#alsocontained']);
    });

  });
});

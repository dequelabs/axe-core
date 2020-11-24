describe('heading-order-partial-context test', function() {
  'use strict';

  var results;
  before(function(done) {
    axe.run(
      { include: [['header'], ['footer']] },
      { runOnly: ['heading-order'] },
      function(err, r) {
        assert.isNull(err);
        results = r;
        done();
      }
    );
  });

  describe('violations', function() {
    it('should find none', function() {
      assert.lengthOf(results.violations, 0);
    });
  });

  describe('passes', function() {
    it('should find 2', function() {
      assert.lengthOf(results.passes[0].nodes, 2);
    });
  });
});

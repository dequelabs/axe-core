describe('color-contrast shadow dom test', function() {
  'use strict';

  describe('violations', function() {
    it('should find issues in simple tree', function(done) {
      axe.run(
        '#fixture',
        { runOnly: { type: 'rule', values: ['color-contrast-enhanced'] } },
        function(err, results) {
          assert.isNull(err);
          assert.lengthOf(results.violations, 1);
          assert.lengthOf(results.violations[0].nodes, 3);
          assert.equal(
            results.violations[0].nodes[2].any[0].data.fgColor,
            '#888888'
          );
          assert.equal(
            results.violations[0].nodes[1].any[0].data.bgColor,
            '#000000'
          );
          assert.lengthOf(results.incomplete, 0);
          done();
        }
      );
    });
  });
  
});

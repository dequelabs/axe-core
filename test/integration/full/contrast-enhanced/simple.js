describe('color-contrast shadow dom test', function () {
  'use strict';

  describe('violations', function () {
    it('should find issues in simple tree', function (done) {
      axe.run(
        '#fixture',
        { runOnly: { type: 'rule', values: ['color-contrast-enhanced'] } },
        function (err, results) {
          assert.isNull(err);
          assert.lengthOf(results.passes, 1);
          assert.lengthOf(results.passes[0].nodes, 4);
          assert.lengthOf(results.incomplete, 0);
          assert.lengthOf(results.violations, 1);
          assert.lengthOf(results.violations[0].nodes, 7);
          assert.equal(
            results.violations[0].nodes[0].any[0].data.fgColor,
            '#556666'
          );
          assert.equal(
            results.violations[0].nodes[1].any[0].data.fgColor,
            '#556000'
          );
          assert.equal(
            results.violations[0].nodes[2].any[0].data.fgColor,
            '#118488'
          );
          assert.equal(
            results.violations[0].nodes[3].any[0].data.fgColor,
            '#048488'
          );
          assert.equal(
            results.violations[0].nodes[4].any[0].data.fgColor,
            '#118488'
          );
          assert.equal(
            results.violations[0].nodes[5].any[0].data.fgColor,
            '#048488'
          );
          assert.equal(
            results.violations[0].nodes[6].any[0].data.fgColor,
            '#048488'
          );
          assert.lengthOf(results.incomplete, 0);
          done();
        }
      );
    });
  });
});

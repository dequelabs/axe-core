describe('region fail test', function () {
  'use strict';
  var results;
  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['region'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find all violations', function () {
      assert.lengthOf(results.violations[0].nodes, 6);
    });

    it('should find wrapper', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, ['#wrapper']);
    });

    it('should find image without an alt tag', function () {
      assert.deepEqual(results.violations[0].nodes[1].target, ['#img-no-alt']);
    });

    it('should find focusable image', function () {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#img-focusable'
      ]);
    });

    it('should find image with global aria attr', function () {
      assert.deepEqual(results.violations[0].nodes[3].target, [
        '#img-aria-global'
      ]);
    });

    it('should find object with a label', function () {
      assert.deepEqual(results.violations[0].nodes[4].target, [
        '#labeled-object'
      ]);
    });

    it('should find div with an role of none', function () {
      assert.deepEqual(results.violations[0].nodes[5].target, [
        '#none-role-div'
      ]);
    });
  });
});

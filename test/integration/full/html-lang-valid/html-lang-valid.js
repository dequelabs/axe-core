describe('html-lang-valid test', function () {
  'use strict';

  var results;

  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run(
        { runOnly: { type: 'rule', values: ['html-lang-valid'] } },
        function (err, r) {
          assert.isNull(err);
          results = r;
          done();
        }
      );
    });
  });

  describe('violations', function () {
    it('should find 3', function () {
      assert.lengthOf(results.violations[0].nodes, 3);
    });

    it('should find first level iframe', function () {
      assert.deepEqual(results.violations[0].nodes[0].target, [
        '#frame1',
        '#violation1'
      ]);
    });

    it('should find second level iframe', function () {
      assert.deepEqual(results.violations[0].nodes[1].target, [
        '#frame1',
        '#frame2',
        '#violation2'
      ]);
    });

    it('should find #violation2c', function () {
      assert.deepEqual(results.violations[0].nodes[2].target, [
        '#frame1',
        '#frame5',
        '#violation2c'
      ]);
    });
  });

  describe('passes', function () {
    it('should find 2', function () {
      assert.lengthOf(results.passes[0].nodes, 2);
    });

    it('should find #pass1', function () {
      assert.deepEqual(results.passes[0].nodes[0].target, [
        '#frame1',
        '#frame3',
        '#pass1'
      ]);
    });

    it('should find #pass2b', function () {
      assert.deepEqual(results.passes[0].nodes[1].target, [
        '#frame1',
        '#frame4',
        '#pass2b'
      ]);
    });
  });
});

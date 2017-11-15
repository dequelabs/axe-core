describe('heading-one tests', function () {
  'use strict';
  var results;

  it('complete', function () {
    assert.isTrue(true);
  });

  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      axe.run({ runOnly: { type: 'rule', values: ['heading-one'] } }, function (err, r) {
        assert.isNull(err);
        results = r;
        axe.log(results);
        done();
      });
    });
  });

  describe('passes', function () {
    it('should find 2', function () {
      assert.lengthOf(results.passes[0].nodes, 2);
    });
    it('should find #pass1', function () {
      assert.deepEqual(results.passes[0].nodes[0].target,
        ['#pass1']);
    });
    it('should find #pass2', function () {
      assert.deepEqual(results.passes[0].nodes[1].target,
        ['#frame1', '#pass2']);
    });
  });

  describe('violations', function () {
    it('should find 2', function () {
      assert.lengthOf(results.violations[0].nodes, 2);
    });
    it('should find #fail1', function () {
      assert.deepEqual(results.violations[0].nodes[0].target,
        ['#frame1', '#frame1a', '#fail1']);
    });
    it('should find #fail2', function () {
      assert.deepEqual(results.violations[0].nodes[1].target,
        ['#frame2', '#fail2']);
    });
  });

  it('should find 0 inapplicable', function () {
    assert.lengthOf(results.inapplicable, 0);
  });

  it('should find 0 incomplete', function () {
    assert.lengthOf(results.incomplete, 0);
  });
});

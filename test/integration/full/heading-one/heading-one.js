describe('document-title test failure', function () {
  'use strict';
  var results;

  before(function (done) {
    window.addEventListener('load', function () {
      axe.run({ runOnly: { type: 'rule', values: ['heading-one'] } }, function (err, r) {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  describe('passes', function () {
    it('should find 2', function () {
      assert.lengthOf(results.passes[0].nodes, 2);
    });
    it('should find first level iframe', function () {
      assert.deepEqual(results.passes[0].nodes[0].target,
        ['#pass1']);
    });
    it('should find first level iframe', function () {
      assert.deepEqual(results.passes[0].nodes[1].target,
        ['#frame1', '#pass2']);
    });
  });

  describe('violations', function () {
    it('should find 2', function () {
      assert.lengthOf(results.violations[0].nodes, 2);
    });
    it('should find first level iframe', function () {
      assert.deepEqual(results.violations[0].nodes[0].target,
        ['#frame1', '#frame1a', '#fail1']);
    });
    it('should find first level iframe', function () {
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

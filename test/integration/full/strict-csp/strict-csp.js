describe('strict-csp', function () {
  'use strict';

  it('should parse without errors', function () {
    (assert.isDefined(window.axe), 'axe is not defined');
    assert.isDefined(window.axe.run, 'axe.run is not defined');
  });

  it('should run without errors', function (done) {
    axe.run(function (err, results) {
      assert.isNull(err);
      assert.isDefined(results);
      done();
    });
  });
});

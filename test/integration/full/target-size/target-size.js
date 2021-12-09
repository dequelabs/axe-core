describe('target-size test', function() {
  'use strict';
  var results;

  before(function(done) {
    axe.testUtils.awaitNestedLoad(function() {
      var options = {
        runOnly: ['target-size'],
        elementRef: true
      }
      axe.run('section', options, function(err, r) {
        assert.isNull(err);
        results = r;
        done();
      });
    });
  });

  it('finds all passing nodes', function () {
    var passResults = results.passes[0].nodes;
    var passedElms = document.querySelectorAll('.passed');
    passResults.forEach(function(result) {
      assert.include(passedElms, result.element);
    });
    assert.lengthOf(passResults, passedElms.length);
  });

  it('finds all failed nodes', function () {
    var failResults = results.violations[0].nodes;
    var failedElms = document.querySelectorAll('.failed');
    failResults.forEach(function(result) {
      assert.include(failedElms, result.element);
    });
    assert.lengthOf(failResults, failedElms.length);
  });
});

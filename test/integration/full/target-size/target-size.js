describe('target-size test', function () {
  'use strict';
  var results;

  before(function (done) {
    axe.testUtils.awaitNestedLoad(function () {
      // Add necessary markup for axe to recognize these as components:
      document.querySelectorAll('section span').forEach(function (link) {
        link.setAttribute('role', 'link');
        link.setAttribute('tabindex', '0');
      });

      var options = {
        runOnly: ['target-size'],
        elementRef: true
      };
      axe.run('section', options, function (err, r) {
        if (err) {
          done(err);
        }
        results = r;
        // Add some highlighting for visually identifying issues.
        // There are too many test cases to just do this by selector.
        results.violations[0] &&
          results.violations[0].nodes.forEach(function (node) {
            node.element.className += ' violations';
          });
        results.passes[0] &&
          results.passes[0].nodes.forEach(function (node) {
            node.element.className += ' passes';
          });
        console.log(results);
        done();
      });
    });
  });

  it('finds all passing nodes', function () {
    var passResults = results.passes[0] ? results.passes[0].nodes : [];
    var passedElms = document.querySelectorAll(
      'section:not([hidden]) div:not([hidden]) .passed'
    );
    passResults.forEach(function (result) {
      assert.include(passedElms, result.element);
    });
    assert.lengthOf(passResults, passedElms.length);
  });

  it('finds all failed nodes', function () {
    var failResults = results.violations[0] ? results.violations[0].nodes : [];
    var failedElms = document.querySelectorAll(
      'section:not([hidden]) div:not([hidden])  .failed'
    );
    failResults.forEach(function (result) {
      assert.include(failedElms, result.element);
    });
    assert.lengthOf(failResults, failedElms.length);
  });
});

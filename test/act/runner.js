(function() {
  // this line is replaced with the test object in preprocessor.js
  var actRules = {}; /*tests*/

  var actRuleIDs = Object.keys(actRules);
  document.head.removeChild(document.querySelector('title'));
  document.head.innerHTML = '';
  var bodyContent = document.body.innerHTML;

  function setupPage(html) {
    var parser = new DOMParser();
    html = html.replace(
      /\/test-assets\//g,
      '/test/act/act-rules-repo/test-assets/'
    );

    var newDoc = parser.parseFromString(html, 'text/html');
    document.head.innerHTML = newDoc.head.innerHTML;
    document.body.innerHTML += newDoc.body.innerHTML;
    var htmlAttrs = Array.from(newDoc.documentElement.attributes);
    htmlAttrs.forEach(function(attr) {
      document.documentElement.setAttribute(attr.name, attr.value);
    });
  }

  function resetPage() {
    document.body.innerHTML = bodyContent;
    document.head.innerHTML = '';
    var htmlAttrs = Array.from(document.documentElement.attributes);
    htmlAttrs.forEach(function(attr) {
      document.documentElement.removeAttribute(attr.name);
    });
  }

  function shouldSkip(testcase) {
    if (testcase.html.substr(0, 15) !== '<!DOCTYPE html>') {
      return true; // Can't test SVG / MathML
    }
    return false;
  }

  function runTestCases(axeOptions, testcases) {
    testcases.forEach(function(testcase) {
      var test = shouldSkip(testcase) ? xit : it;

      test(testcase.testcaseTitle, function(done) {
        setupPage(testcase.html);

        axe
          .run(axeOptions)
          .then(function(result) {
            if (testcase.expected === 'failed') {
              var issues = result.violations[0] || result.incomplete[0];
              if (!issues) {
                console.log(testcase.html);
              }
              assert.isDefined(issues);
              assert.isAtLeast(issues.nodes.length, 1);
            } else {
              assert.lengthOf(result.violations, 0);
            }
            done();
          })
          .catch(done);
      });
    });
  }

  describe('ACT rules', function() {
    actRuleIDs.forEach(function(ruleId) {
      var rule = actRules[ruleId];
      var axeOptions = {
        runOnly: rule.axeRules
      };
      describe(rule.title + ' (' + ruleId + ')', function() {
        afterEach(resetPage);
        runTestCases(axeOptions, rule.testcases);
      });
    });
  });
})();

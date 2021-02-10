(function() {
  // this line is replaced with the test object in preprocessor.js
  var actRule = {}; /*tests*/

  describe(actRule.title + ' (' + actRule.id + ')', function() {
    var bodyContent;
    before(function() {
      var title = document.querySelector('title');
      if (title) {
        document.head.removeChild(title);
      }
      document.head.innerHTML = '';
      bodyContent = document.body.innerHTML;
    });

    afterEach(function() {
      document.body.innerHTML = bodyContent;
      document.head.innerHTML = '';
      var htmlAttrs = Array.from(document.documentElement.attributes);
      htmlAttrs.forEach(function(attr) {
        document.documentElement.removeAttribute(attr.name);
      });
    });

    actRule.testcases.forEach(function(testcase) {
      runTestCase(testcase, {
        runOnly: actRule.axeRules
      });
    });
  });

  function runTestCase(testcase, axeOptions) {
    var test = shouldSkip(testcase) ? xit : it;
    test(testcase.testcaseTitle, function(done) {
      exampleSetup(testcase.html);
      axe
        .run(axeOptions)
        .then(function(result) {
          assertResultsCorrect(testcase, result);
          done();
        })
        .catch(done);
    });
  }

  function exampleSetup(html) {
    var parser = new DOMParser();
    var newDoc = parser.parseFromString(html, 'text/html');
    document.head.innerHTML = newDoc.head.innerHTML;
    document.body.innerHTML += newDoc.body.innerHTML;
    var htmlAttrs = Array.from(newDoc.documentElement.attributes);
    htmlAttrs.forEach(function(attr) {
      document.documentElement.setAttribute(attr.name, attr.value);
    });
  }

  function shouldSkip(testcase) {
    if (testcase.html.substr(0, 15) !== '<!DOCTYPE html>') {
      return true; // Can't test SVG / MathML
    }
    return false;
  }

  function assertResultsCorrect(testcase, result) {
    if (testcase.expected !== 'failed') {
      return assert.lengthOf(result.violations, 0);
    }
    var issues = result.violations[0] || result.incomplete[0];
    if (!issues) {
      console.log(testcase.html);
    }
    assert.isDefined(issues);
    assert.isAtLeast(issues.nodes.length, 1);
  }
})();

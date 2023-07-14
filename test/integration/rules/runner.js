(() => {
  // this line is replaced with the test object in preprocessor.js
  const testObj = {}; /*tests*/

  const ruleId = testObj.rule;
  const testName = testObj.description || ruleId + ' test';

  function flattenResult(results) {
    return {
      passes: results.passes[0],
      violations: results.violations[0],
      incomplete: results.incomplete[0]
    };
  }

  function waitForFrames(context, cb) {
    let loaded = 0;
    const frames = context.querySelectorAll('iframe');

    function loadListener() {
      loaded++;
      if (loaded === length) {
        cb();
      }
    }
    if (!frames.length) {
      return cb();
    }
    for (let index = 0, length = frames.length; index < length; index++) {
      frames[index].addEventListener('load', loadListener);
    }
  }

  const fixture = document.getElementById('fixture');
  const rule = axe.utils.getRule(ruleId);

  if (!rule) {
    return;
  }

  // don't run rules that are deprecated and disabled
  const deprecated = rule.tags.indexOf('deprecated') !== -1;
  (deprecated && !rule.enabled ? describe.skip : describe)(ruleId, () => {
    describe(testName, () => {
      function runTest(test, collection) {
        if (!test[collection]) {
          return;
        }

        describe(collection, () => {
          let nodes;
          before(() => {
            if (typeof results[collection] === 'object') {
              nodes = results[collection].nodes;
            }
          });

          test[collection].forEach(selector => {
            it('should find ' + JSON.stringify(selector), () => {
              if (!nodes) {
                assert(false, 'there are no ' + collection);
                return;
              }

              const matches = nodes.filter(node => {
                for (let i = 0; i < selector.length; i++) {
                  if (node.target[i] !== selector[i]) {
                    return false;
                  }
                }
                return node.target.length === selector.length;
              });
              matches.forEach(node => {
                // remove each node we find
                nodes.splice(nodes.indexOf(node), 1);
              });

              if (matches.length === 0) {
                assert(false, 'Element not found');
              } else if (matches.length === 1) {
                assert(true, 'Element found');
              } else {
                assert(
                  false,
                  'Found ' + matches.length + ' elements which match the target'
                );
              }
            });
          });

          it('should not return other results', () => {
            if (typeof nodes !== 'undefined') {
              const targets = nodes.map(node => {
                return node.target;
              });
              // check that all nodes are removed
              assert.equal(JSON.stringify(targets), '[]');
            } else {
              assert.lengthOf(
                test[collection],
                0,
                'there are no ' + collection
              );
            }
          });
        });
      }

      let results;
      before(done => {
        fixture.innerHTML = testObj.content;
        waitForFrames(fixture, () => {
          axe.run(
            fixture,
            {
              /**
               * The debug flag helps log errors in a fairly detailed fashion,
               * when tests fail in webdriver
               */
              debug: true,
              performanceTimer: false,
              runOnly: { type: 'rule', values: [ruleId] }
            },
            (err, r) => {
              // assert that there are no errors - if error exists a stack trace is logged.
              const errStack = err && err.stack ? err.stack : '';
              assert.isNull(err, 'Error should be null. ' + errStack);
              // assert that result is defined
              assert.isDefined(r, 'Results are defined.');
              // assert that result has certain keys
              assert.hasAnyKeys(r, ['incomplete', 'violations', 'passes']);
              // assert incomplete(s) does not have error
              r.incomplete.forEach(incomplete => {
                assert.isUndefined(incomplete.error);
              });
              // flatten results
              results = flattenResult(r);
              done();
            }
          );
        });
      });
      runTest(testObj, 'passes');
      runTest(testObj, 'violations');
      if (testObj.incomplete) {
        runTest(testObj, 'incomplete');
      }
    });
  });
})();

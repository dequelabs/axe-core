describe('reporters - v1', () => {
  let runResults;

  const _results = [
    {
      id: 'gimmeLabel',
      helpUrl: 'things',
      description: 'something nifty',
      tags: ['tag1'],
      result: 'passed',
      violations: [],
      passes: [
        {
          result: 'passed',
          any: [
            {
              result: true,
              data: 'minkey'
            }
          ],
          all: [],
          none: [],
          node: {
            selector: ['minkey'],
            frames: [],
            source: '<minkey>chimp</minky>'
          }
        }
      ]
    },
    {
      id: 'idkStuff',
      description: 'something more nifty',
      pageLevel: true,
      result: 'failed',
      impact: 'cats',
      tags: ['tag2'],
      passes: [],
      violations: [
        {
          result: 'failed',
          all: [
            {
              result: false,
              data: 'pillock',
              impact: 'cats'
            }
          ],
          any: [],
          none: [],
          node: {
            selector: ['q', 'r', 'pillock'],
            source: '<pillock>george bush</pillock>'
          },
          impact: 'cats'
        }
      ]
    },
    {
      id: 'bypass',
      description: 'something even more nifty',
      tags: ['tag3'],
      impact: 'monkeys',
      result: 'failed',
      passes: [],
      violations: [
        {
          result: 'failed',
          impact: 'monkeys',
          none: [
            {
              data: 'foon',
              impact: 'monkeys',
              result: true
            }
          ],
          any: [],
          all: [],
          node: {
            selector: ['foon'],
            source: '<foon>telephone</foon>'
          }
        }
      ]
    },
    {
      id: 'incomplete',
      description: 'something yet more nifty',
      tags: ['tag4'],
      impact: 'monkeys',
      result: 'failed',
      passes: [],
      violations: [],
      incomplete: [
        {
          result: 'failed',
          impact: 'monkeys',
          none: [
            {
              data: 'foon',
              impact: 'monkeys',
              result: true
            }
          ],
          any: [],
          all: [],
          node: {
            selector: ['foon'],
            source: '<foon>telephone</foon>'
          }
        }
      ]
    },
    {
      id: 'blinky',
      description: 'something awesome',
      tags: ['tag4'],
      violations: [],
      result: 'passed',
      passes: [
        {
          result: 'passed',
          none: [
            {
              data: 'clueso',
              result: true
            }
          ],
          node: {
            selector: ['a', 'b', 'clueso'],
            source: '<clueso>nincompoop</clueso>'
          }
        }
      ]
    }
  ];

  beforeEach(() => {
    runResults = JSON.parse(JSON.stringify(_results));
    axe._load({
      messages: {},
      rules: [],
      data: {
        failureSummaries: {
          none: {
            failureMessage: function anonymous(it) {
              let out = 'Fix any of the following: \n';
              const arr1 = it;
              if (arr1) {
                var value,
                  i1 = -1,
                  l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[(i1 += 1)];
                  out += ` ${value}
`;
                }
              }
              return out;
            }
          },
          all: {
            failureMessage: function anonymous() {
              throw new Error('shouldnt be executed');
            }
          },
          any: {
            failureMessage: function anonymous(it) {
              let out = 'Fix all of the following: \n';
              const arr1 = it;
              if (arr1) {
                var value,
                  i1 = -1,
                  l1 = arr1.length - 1;
                while (i1 < l1) {
                  value = arr1[(i1 += 1)];
                  out += ` ${value}
`;
                }
              }
              return out;
            }
          }
        }
      }
    });
  });

  afterEach(() => {
    axe._audit = null;
  });

  it('should merge the runRules results into violations and passes', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.isObject(results);
      assert.isArray(results.violations);
      assert.lengthOf(results.violations, 2);
      assert.isArray(results.passes);
      assert.lengthOf(results.passes, 2);
    });
  });
  it('should add the rule id to the rule result', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.equal(results.violations[0].id, 'idkStuff');
      assert.equal(results.violations[1].id, 'bypass');
      assert.equal(results.passes[0].id, 'gimmeLabel');
      assert.equal(results.passes[1].id, 'blinky');
    });
  });
  it('should add tags to the rule result', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.deepEqual(results.violations[0].tags, ['tag2']);
      assert.deepEqual(results.violations[1].tags, ['tag3']);
      assert.deepEqual(results.passes[0].tags, ['tag1']);
      assert.deepEqual(results.passes[1].tags, ['tag4']);
    });
  });
  it('should add the rule help to the rule result', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.isNotOk(results.violations[0].helpUrl);
      assert.isNotOk(results.violations[1].helpUrl);
      assert.equal(results.passes[0].helpUrl, 'things');
      assert.isNotOk(results.passes[1].helpUrl);
    });
  });
  it('should add the html to the node data', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.ok(results.violations[0].nodes);
      assert.equal(results.violations[0].nodes.length, 1);
      assert.equal(
        results.violations[0].nodes[0].html,
        '<pillock>george bush</pillock>'
      );
      assert.equal(
        results.violations[1].nodes[0].html,
        '<foon>telephone</foon>'
      );
      assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
      assert.equal(
        results.passes[1].nodes[0].html,
        '<clueso>nincompoop</clueso>'
      );
    });
  });
  it('should add the failure summary to the node data', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.ok(results.violations[0].nodes);
      assert.equal(results.violations[0].nodes.length, 1);
      assert.equal(
        typeof results.violations[0].nodes[0].failureSummary,
        'string'
      );
      assert.equal(
        typeof results.incomplete[0].nodes[0].failureSummary,
        'string'
      );
    });
  });
  it('should add the target selector array to the node data', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.ok(results.violations[0].nodes);
      assert.equal(results.violations[0].nodes.length, 1);
      assert.deepEqual(results.violations[0].nodes[0].target, [
        'q',
        'r',
        'pillock'
      ]);
    });
  });
  it('should add the description to the rule result', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.equal(results.violations[0].description, 'something more nifty');
      assert.equal(
        results.violations[1].description,
        'something even more nifty'
      );
      assert.equal(results.passes[0].description, 'something nifty');
      assert.equal(results.passes[1].description, 'something awesome');
    });
  });
  it('should add the impact to the rule result', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.equal(results.violations[0].impact, 'cats');
      assert.equal(results.violations[0].nodes[0].impact, 'cats');
      assert.equal(results.violations[1].impact, 'monkeys');
      assert.equal(results.violations[1].nodes[0].impact, 'monkeys');
    });
  });
  it('should add environment data', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.isDefined(results.url);
      assert.isDefined(results.timestamp);
      assert.isDefined(results.testEnvironment);
      assert.isDefined(results.testRunner);
    });
  });
  it('should add toolOptions property', () => {
    axe.getReporter('v1')(runResults, {}, results => {
      assert.isDefined(results.toolOptions);
    });
  });
  it('uses the environmentData option instead of environment data if specified', () => {
    const environmentData = {
      myReporter: 'hello world'
    };
    axe.getReporter('v1')(
      runResults,
      { environmentData: environmentData },
      results => {
        assert.equal(results.myReporter, 'hello world');
        assert.isUndefined(results.url);
        assert.isUndefined(results.timestamp);
        assert.isUndefined(results.testEnvironment);
        assert.isUndefined(results.testRunner);
      }
    );
  });
});

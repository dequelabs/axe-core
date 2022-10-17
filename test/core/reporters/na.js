describe('reporters - na', function () {
  'use strict';
  var runResults,
    _results = [
      {
        id: 'noMatch',
        helpUrl: 'somewhere',
        description: 'stuff',
        result: 'inapplicable',
        impact: null,
        tags: ['tag3'],
        violations: [],
        passes: []
      },
      {
        id: 'gimmeLabel',
        helpUrl: 'things',
        description: 'something nifty',
        result: 'passed',
        impact: null,
        tags: ['tag1'],
        violations: [],
        passes: [
          {
            result: 'passed',
            impact: null,
            any: [
              {
                result: true,
                relatedNodes: [
                  {
                    selector: 'bob',
                    source: 'fred'
                  }
                ],
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
                relatedNodes: [
                  {
                    selector: 'joe',
                    source: 'bob'
                  }
                ],
                result: false,
                data: 'pillock',
                impact: 'cats'
              },
              {
                relatedNodes: [],
                result: true
              }
            ],
            any: [
              {
                relatedNodes: [],
                result: true
              }
            ],
            none: [
              {
                relatedNodes: [],
                result: false
              }
            ],
            node: {
              selector: ['q', 'r', 'pillock'],
              source: '<pillock>george bush</pillock>'
            },
            impact: 'cats'
          }
        ]
      }
    ];

  beforeEach(function () {
    runResults = JSON.parse(JSON.stringify(_results));
    axe._load({
      messages: {},
      rules: [],
      data: {}
    });
  });

  afterEach(function () {
    axe._audit = null;
  });

  it('should merge the runRules results into violations, passes and inapplicable', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.isObject(results);
      assert.isArray(results.violations);
      assert.lengthOf(results.violations, 1);
      assert.isArray(results.passes);
      assert.lengthOf(results.passes, 1);
      assert.isArray(results.inapplicable);
      assert.lengthOf(results.inapplicable, 1);
    });
  });
  it('should add the rule id to the rule result', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.equal(results.violations[0].id, 'idkStuff');
      assert.equal(results.passes[0].id, 'gimmeLabel');
      assert.equal(results.inapplicable[0].id, 'noMatch');
    });
  });
  it('should add tags to the rule result', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.deepEqual(results.violations[0].tags, ['tag2']);
      assert.deepEqual(results.passes[0].tags, ['tag1']);
      assert.deepEqual(results.inapplicable[0].tags, ['tag3']);
    });
  });
  it('should add the rule help to the rule result', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.ok(!results.violations[0].helpUrl);
      assert.equal(results.passes[0].helpUrl, 'things');
      assert.equal(results.inapplicable[0].helpUrl, 'somewhere');
    });
  });
  it('should add the html to the node data', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.ok(results.violations[0].nodes);
      assert.equal(results.violations[0].nodes.length, 1);
      assert.equal(
        results.violations[0].nodes[0].html,
        '<pillock>george bush</pillock>'
      );
      assert.equal(results.passes[0].nodes[0].html, '<minkey>chimp</minky>');
    });
  });
  it('should add the target selector array to the node data', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.ok(results.violations[0].nodes);
      assert.equal(results.violations[0].nodes.length, 1);
      assert.deepEqual(results.violations[0].nodes[0].target, [
        'q',
        'r',
        'pillock'
      ]);
    });
  });
  it('should add the description to the rule result', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.equal(results.violations[0].description, 'something more nifty');
      assert.equal(results.passes[0].description, 'something nifty');
    });
  });
  it('should add the impact to the rule result', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.equal(results.violations[0].impact, 'cats');
      assert.equal(results.violations[0].nodes[0].impact, 'cats');
      assert.ok(!results.passes[0].impact);
      assert.ok(!results.passes[0].nodes[0].impact);
      assert.isNull(results.passes[0].impact);
      assert.isNull(results.passes[0].nodes[0].impact);
    });
  });
  it('should map relatedNodes', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.lengthOf(results.violations[0].nodes[0].all[0].relatedNodes, 1);
      assert.equal(
        results.violations[0].nodes[0].all[0].relatedNodes[0].target,
        'joe'
      );
      assert.equal(
        results.violations[0].nodes[0].all[0].relatedNodes[0].html,
        'bob'
      );

      assert.lengthOf(results.passes[0].nodes[0].any[0].relatedNodes, 1);
      assert.equal(
        results.passes[0].nodes[0].any[0].relatedNodes[0].target,
        'bob'
      );
      assert.equal(
        results.passes[0].nodes[0].any[0].relatedNodes[0].html,
        'fred'
      );
    });
  });
  it('should add environment data', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.isDefined(results.url);
      assert.isDefined(results.timestamp);
      assert.isDefined(results.testEnvironment);
      assert.isDefined(results.testRunner);
    });
  });
  it('should add toolOptions property', function () {
    axe.getReporter('na')(runResults, {}, function (results) {
      assert.isDefined(results.toolOptions);
    });
  });
  it('uses the environmentData option instead of environment data if specified', function () {
    var environmentData = {
      myReporter: 'hello world'
    };
    axe.getReporter('na')(
      runResults,
      { environmentData: environmentData },
      function (results) {
        assert.equal(results.myReporter, 'hello world');
        assert.isUndefined(results.url);
        assert.isUndefined(results.timestamp);
        assert.isUndefined(results.testEnvironment);
        assert.isUndefined(results.testRunner);
      }
    );
  });
});

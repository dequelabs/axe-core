
describe('helpers.processAggregate', function () {
  'use strict';
  var results, options;

  beforeEach(function () {
    results = [{
      id: 'passed-rule',
      passes: [{
        result: 'passed',
        node: {
          element: document.createElement('div'),
          selector: 'header > .thing',
          source: '<div class=\"thing\">Thing</div>',
          xpath: '/header/div[@class="thing"]'
        },
        any: [{
          id: 'passed-rule',
          relatedNodes: [{
            element: document.createElement('div'),
            selector: 'footer > .thing',
            source: '<div class=\"thing\">Thing</div>',
            xpath: '/footer/div[@class="thing"]',
          }]
        }],
        all: [],
        none: []
      }, {
        result: 'passed',
        node: {
          element: document.createElement('div'),
          selector: 'main > .thing',
          source: '<div class=\"thing\">Thing</div>',
          xpath: '/main/div[@class="thing"]'
        },
        any: [{
          id: 'passed-rule',
          relatedNodes: [{
            element: document.createElement('div'),
            selector: 'footer > .thing',
            source: '<div class=\"thing\">Thing</div>',
            xpath: '/footer/div[@class="thing"]',
          }]
        }],
        all: [],
        none: []
      }],
      inapplicable: [],
      incomplete: [],
      violations: []
    }, {
      id: 'failed-rule',
        violations: [{
        result: 'failed',
        node: {
          selector: '#dopel',
          source: '<input id=\"dopel\"/>',
          xpath: '/main/input[@id="dopel"]',
          fromFrame: true
        },
        any: [{
          id: 'failed-rule',
          relatedNodes: [{
            element: document.createElement('input'),
            selector: '#dopel',
            source: '<input id=\"dopel\"/>',
            xpath: '/main/input[@id="dopel"]',
            fromFrame: true
          }]
        }],
        all: [],
        none: []
      }, {
        result: 'failed',
        node: {
          selector: '#dopell',
          source: '<input id=\"dopell\"/>',
          xpath: '/header/input[@id="dopell"]',
          fromFrame: true
        },
        any: [{
          id: 'failed-rule',
          relatedNodes: [{
            element: document.createElement('input'),
            selector: '#dopell',
            source: '<input id=\"dopell\"/>',
            xpath: '/header/input[@id="dopell"]',
            fromFrame: true
          }]
        }],
        all: [],
        none: []
      }],
      inapplicable: [],
      passes: [],
      incomplete: []
    }];
  });

  it('should add a `timestamp` property to the `resultObject`', function () {
    var resultObject = helpers.processAggregate(results, {});
    assert.isDefined(resultObject.timestamp);
  });

  it('should add a `url` property to the `resultObject`', function () {
    var resultObject = helpers.processAggregate(results, {});
    assert.isDefined(resultObject.url);
  });

  it('should remove the `result` property from each node in each ruleResult', function () {
    assert.isDefined(results.find(function (r) {
      return r.id === 'passed-rule';
    }).passes[0].result);

    var resultObject = helpers.processAggregate(results, {});
    var ruleResult = resultObject.passes.find(function (r) {
      return r.id === 'passed-rule';
    });
    assert.isUndefined(ruleResult.nodes[0].result);
  });

  it('should remove the `node` property from each node in each ruleResult', function () {
    assert.isDefined(results.find(function (r) {
      return r.id === 'passed-rule';
    }).passes[0].node);

    var resultObject = helpers.processAggregate(results, {});
    var ruleResult = resultObject.passes.find(function (r) {
      return r.id === 'passed-rule';
    });
    assert.isUndefined(ruleResult.nodes[0].node);
  });

  describe('`options` argument', function () {

    describe('`resultTypes` option', function () {

      it('should reduce the unwanted result types to 1 in the `resultObject`', function () {
        var resultObject = helpers.processAggregate(results, { resultTypes: ['violations'] });
        assert.isDefined(resultObject.passes);
        assert.equal(resultObject.passes[0].nodes.length, 1);
        assert.isDefined(resultObject.violations);
        assert.equal(resultObject.violations[0].nodes.length, 2);
        resultObject = helpers.processAggregate(results, { resultTypes: ['passes'] });
        assert.equal(resultObject.passes[0].nodes.length, 2);
        assert.equal(resultObject.violations[0].nodes.length, 1);
        assert.isDefined(resultObject.incomplete);
        assert.isDefined(resultObject.inapplicable);
      });
    });

    describe('`elementRef` option', function () {

      describe('when set to true', function () {

        before(function () {
          options = { elementRef: true };
        });

        describe('when node\'s, or relatedNode\'s, `fromFrame` equals false', function () {
          it('should add an `element` property to the subResult nodes or relatedNodes', function () {
            var resultObject = helpers.processAggregate(results, options);
            assert.isDefined(resultObject.passes[0].nodes[0].element);
            assert.isDefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].element);
          });
        });

        describe('when node\'s, or relatedNode\'s, `fromFrame` equals true', function () {
          it('should NOT add an `element` property to the subResult nodes or relatedNodes', function () {
            var resultObject = helpers.processAggregate(results, options);
            assert.isUndefined(resultObject.violations[0].nodes[0].element);
            assert.isUndefined(resultObject.violations[0].nodes[0].any[0].relatedNodes[0].element);
          });
        });
      });

      describe('when set to false', function () {

        before(function () {
          options = { elementRef: false };
        });

        it('should NOT add an `element` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, options);
          assert.isUndefined(resultObject.passes[0].nodes[0].element);
          assert.isUndefined(resultObject.violations[0].nodes[0].element);
          assert.isUndefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].element);
          assert.isUndefined(resultObject.violations[0].nodes[0].any[0].relatedNodes[0].element);
        });
      });

      describe('when not set at all', function () {

        it('should NOT add an `element` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, {});
          assert.isUndefined(resultObject.passes[0].nodes[0].element);
          assert.isUndefined(resultObject.violations[0].nodes[0].element);
          assert.isUndefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].element);
          assert.isUndefined(resultObject.violations[0].nodes[0].any[0].relatedNodes[0].element);
        });
      });
    });

    describe('`selectors` option', function () {

      describe('when set to false', function () {

        before(function () {
          options = { selectors: false };
        });

        describe('when node\'s, or relatedNode\'s, `fromFrame` equals true', function () {
          it('should add a `target` property to the subResult nodes or relatedNodes', function () {
            var resultObject = helpers.processAggregate(results, options);
            assert.isDefined(resultObject.violations[0].nodes[0].target);
            assert.isDefined(resultObject.violations[0].nodes[0].any[0].relatedNodes[0].target);
          });
        });

        describe('when node\'s, or relatedNode\'s, `fromFrame` equals false', function () {
          it('should NOT add a `target` property to the subResult nodes or relatedNodes', function () {
            var resultObject = helpers.processAggregate(results, options);
            assert.isUndefined(resultObject.passes[0].nodes[0].target);
            assert.isUndefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].target);
          });
        });
      });

      describe('when set to true', function () {

        before(function () {
          options = { selectors: true };
        });

        it('should add a `target` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, options);
          assert.isDefined(resultObject.passes[0].nodes[0].target);
          assert.isDefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].target);
        });
      });

      describe('when not set at all', function () {

        it('should add a `target` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, {});
          assert.isDefined(resultObject.passes[0].nodes[0].target);
          assert.isDefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].target);
        });
      });
    });

    describe('`xpath` option', function () {

      describe('when set to true', function () {

        before(function () {
          options = { xpath: true };
        });

        it('should add an `xpath` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, options);
          assert.isDefined(resultObject.passes[0].nodes[0].xpath);
          assert.isDefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].xpath);
        });
      });

      describe('when set to false', function () {

        before(function () {
          options = { xpath: false };
        });

        it('should NOT add an `xpath` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, options);
          assert.isUndefined(resultObject.passes[0].nodes[0].xpath);
          assert.isUndefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].xpath);
        });
      });

      describe('when not set at all', function () {

        it('should NOT add an `xpath` property to the subResult nodes or relatedNodes', function () {
          var resultObject = helpers.processAggregate(results, {});
          assert.isUndefined(resultObject.passes[0].nodes[0].xpath);
          assert.isUndefined(resultObject.passes[0].nodes[0].any[0].relatedNodes[0].xpath);
        });
      });
    });
  });
});

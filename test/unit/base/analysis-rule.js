/*global AnalysisRule */
describe('AnalysisRule', function () {
  'use strict';

  var fixture = document.getElementById('fixture');

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should be a function', function () {
    assert.isFunction(AnalysisRule);
  });

  describe('prototype', function () {

    describe('run', function () {
      it('should be a function', function () {
        assert.isFunction(AnalysisRule.prototype.run);
      });

      it('should pull options from spec if not defined locally', function (done) {
        var div = document.createElement('div');
        fixture.appendChild(div);
        var analysisRule = new AnalysisRule({
          options: 'monkeys',
          evaluate: function (node, options) {
            assert.equal(options, 'monkeys');
          }
        });

        analysisRule.run(div, undefined, function () {
          done();
        });
      });

      it('should run #evaluate', function (done) {
        var div = document.createElement('div');
        fixture.appendChild(div);
        var success = false,
          analysisRule = new AnalysisRule({
            evaluate: function (node, options) {
              assert.equal(node, div);
              assert.equal(options, expectedOptions);
              success = true;
              return 'stuff';
            }
          });

        var expectedOptions = { foo: 'bar' };
        analysisRule.run(div, expectedOptions, function (result) {
          assert.instanceOf(result, window.AnalysisRuleResult);
          assert.equal(result.result, 'stuff');
        });
        assert.isTrue(success);
        done();

      });
    });
  });


  describe('spec object', function () {

    describe('.id', function () {
      it('should be set', function () {
        var spec = {
          id: 'monkeys'
        };
        assert.equal(new AnalysisRule(spec).id, spec.id);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new AnalysisRule(spec).id, spec.id);

      });

    });


    describe('.options', function () {
      it('should be set', function () {
        var spec = {
          options: ['monkeys', 'bananas']
        };
        assert.equal(new AnalysisRule(spec).options, spec.options);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new AnalysisRule(spec).options, spec.options);

      });

    });


    describe('.evaluate', function () {
      it('should be set', function () {
        var spec = {
          evaluate: ['monkeys', 'bananas']
        };
        assert.equal(new AnalysisRule(spec).evaluate, spec.evaluate);
      });

      it('should have no default', function () {
        var spec = {};
        assert.equal(new AnalysisRule(spec).evaluate, spec.evaluate);

      });

    });

  });
});

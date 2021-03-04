describe('aria-required-attr', function() {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();
  var options = undefined;

  afterEach(function() {
    checkContext.reset();
    axe.reset();
  });

  it('should detect missing attributes', function() {
    var vNode = queryFixture('<div id="target" role="switch" tabindex="1">');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-required-attr')
        .call(checkContext, vNode.actualNode, options, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-checked']);
  });

  it('should return true if there is no role', function() {
    var vNode = queryFixture('<div id="target">');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-attr')
        .call(checkContext, vNode.actualNode, options, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should pass aria-valuenow if element has value property', function() {
    var vNode = queryFixture('<input id="target" type="range" role="slider">');

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-required-attr')
        .call(checkContext, vNode.actualNode, options, vNode)
    );
  });

  it('should pass aria-checkbox if element has checked property', function() {
    var vNode = queryFixture(
      '<input id="target" type="checkbox" role="switch">'
    );

    assert.isTrue(
      checks['aria-required-attr'].evaluate.call(
        checkContext,
        vNode.actualNode,
        options,
        vNode
      )
    );
  });

  describe('options', function() {
    it('should require provided attribute names for a role', function() {
      axe.configure({
        standards: {
          ariaRoles: {
            mccheddarton: {
              requiredAttrs: ['aria-valuemax']
            }
          }
        }
      });

      var vNode = queryFixture('<div role="mccheddarton" id="target"></div>');
      var options = {
        mccheddarton: ['aria-snuggles']
      };
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
      assert.deepEqual(checkContext._data, ['aria-snuggles', 'aria-valuemax']);
    });
  });
});

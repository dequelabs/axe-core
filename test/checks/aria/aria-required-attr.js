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

  describe('combobox special case', function() {
    it('should pass comboboxes that have aria-expanded="false"', function() {
      var vNode = queryFixture(
        '<div id="target" role="combobox" aria-expanded="false"></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
    });

    it('should pass comboboxes that have aria-owns and aria-expanded', function() {
      var vNode = queryFixture(
        '<div id="target" role="combobox" aria-expanded="true" aria-owns="ownedchild"></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
    });

    it('should pass comboboxes that have aria-controls and aria-expanded', function() {
      var vNode = queryFixture(
        '<div id="target" role="combobox" aria-expanded="true" aria-controls="test"></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
    });

    it('should fail comboboxes that have no required attributes', function() {
      var vNode = queryFixture('<div id="target" role="combobox"></div>');

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
    });

    it('should fail comboboxes that have aria-expanded only', function() {
      var vNode = queryFixture(
        '<div id="target" role="combobox" aria-expanded="true"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
    });

    it('should report missing of multiple attributes correctly', function() {
      axe.configure({
        standards: {
          ariaRoles: {
            combobox: {
              requiredAttrs: ['aria-expanded', 'aria-label', 'aria-controls']
            }
          }
        }
      });

      var vNode = queryFixture(
        '<div id="target" role="combobox" aria-expanded="false"></div>'
      );
      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-required-attr')
          .call(checkContext, vNode.actualNode, options, vNode)
      );
      assert.deepEqual(checkContext._data, ['aria-label']);
    });
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

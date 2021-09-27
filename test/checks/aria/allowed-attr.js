describe('aria-allowed-attr', function() {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function() {
    checkContext.reset();
  });

  it('should detect incorrectly used attributes', function() {
    var vNode = queryFixture(
      '<div role="link" id="target" tabindex="1" aria-selected="true"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should not report on required attributes', function() {
    var vNode = queryFixture(
      '<div role="checkbox" id="target" tabindex="1" aria-checked="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should detect incorrectly used attributes - implicit role', function() {
    var vNode = queryFixture(
      '<a href="#" id="target" tabindex="1" aria-selected="true"></a>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should return true for global attributes if there is no role', function() {
    var vNode = queryFixture(
      '<div id="target" tabindex="1" aria-busy="true" aria-owns="foo"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return false for non-global attributes if there is no role', function() {
    var vNode = queryFixture(
      '<div id="target" tabindex="1" aria-selected="true" aria-owns="foo"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should not report on invalid attributes', function() {
    var vNode = queryFixture(
      '<div role="dialog" id="target" tabindex="1" aria-cats="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should not report on allowed attributes', function() {
    var vNode = queryFixture(
      '<div role="radio" id="target" tabindex="1" aria-required="true" aria-checked="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });
  describe('should return false if aria-attributes are invalid for table or a grid', function() {
    [
      'aria-posinset="1"',
      'aria-setsize="1"',
      'aria-expanded="true"',
      'aria-level="1"'
    ].forEach(function(attrName) {
      it(
        'should return false when ' +
          attrName +
          ' is used on role=row thats parent is a table',
        function() {
          var vNode = queryFixture(
            ' <div role="table">' +
              '<div  id="target" role="row" ' +
              attrName +
              '></div>' +
              '</div>'
          );
          assert.isFalse(
            axe.testUtils
              .getCheckEvaluate('aria-allowed-attr')
              .call(checkContext, null, null, vNode)
          );
          assert.isNotNull(checkContext._data);
        }
      );
    });

    [
      'aria-posinset="1"',
      'aria-setsize="1"',
      'aria-expanded="true"',
      'aria-level="1"'
    ].forEach(function(attrName) {
      it(
        'should return false when ' +
          attrName +
          ' is used on role=row thats parent is a grid',
        function() {
          var vNode = queryFixture(
            ' <div role="grid">' +
              '<div  id="target" role="row" ' +
              attrName +
              '></div>' +
              '</div>'
          );
          assert.isFalse(
            axe.testUtils
              .getCheckEvaluate('aria-allowed-attr')
              .call(checkContext, null, null, vNode)
          );
          assert.isNotNull(checkContext._data);
        }
      );
    });

    it('should return false when provided a single aria-attribute is provided ', function() {
      axe.configure({
        checks: [
          {
            id: 'aria-allowed-attr',
            options: {
              ariaAttr: ['aria-posinset']
            }
          }
        ]
      });

      var options = {
        ariaAttr: ['aria-posinset']
      };
      var vNode = queryFixture(
        ' <div role="table">' +
          '<div id="target" role="row" aria-posinset="2"><div role="cell"></div></div>' +
          '<div id="row23" role="row" aria-setsize="8"><div role="cell"></div></div>' +
          '<div id="row24" role="row" aria-level="3"><div role="cell"></div></div>' +
          '</div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, options, vNode)
      );
    });
  });

  describe('options', function() {
    it('should allow provided attribute names for a role', function() {
      axe.configure({
        standards: {
          ariaRoles: {
            mccheddarton: {
              allowedAttrs: ['aria-checked']
            }
          }
        }
      });

      var vNode = queryFixture(
        '<div role="mccheddarton" id="target" aria-checked="true" aria-selected="true"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );

      assert.isTrue(
        axe.testUtils.getCheckEvaluate('aria-allowed-attr').call(
          checkContext,
          null,
          {
            mccheddarton: ['aria-checked', 'aria-selected']
          },
          vNode
        )
      );
    });

    it('should handle multiple roles provided in options', function() {
      axe.configure({
        standards: {
          ariaRoles: {
            mcheddarton: {
              allowedAttrs: ['aria-checked']
            },
            bagley: {
              allowedAttrs: ['aria-checked']
            }
          }
        }
      });

      var vNode = queryFixture(
        '<div role="bagley" id="target" aria-selected="true"></div>'
      );
      var options = {
        mccheddarton: ['aria-selected'],
        bagley: ['aria-selected']
      };

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, options, vNode)
      );
    });
  });
});

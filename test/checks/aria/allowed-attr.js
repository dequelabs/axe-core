describe('aria-allowed-attr', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should detect incorrectly used attributes', function () {
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

  it('should not report on required attributes', function () {
    var vNode = queryFixture(
      '<div role="checkbox" id="target" tabindex="1" aria-checked="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should detect incorrectly used attributes - implicit role', function () {
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

  it('should return true for global attributes if there is no role', function () {
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

  it('should return false for non-global attributes if there is no role', function () {
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

  it('should not report on invalid attributes', function () {
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

  it('should not report on allowed attributes', function () {
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

  it('should return undefined for custom element that has no role and is not focusable', function () {
    var vNode = queryFixture(
      '<my-custom-element id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  it("should return false for custom element that has a role which doesn't allow the attribute", function () {
    var vNode = queryFixture(
      '<my-custom-element role="insertion" id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  it('should return false for custom element that is focusable', function () {
    var vNode = queryFixture(
      '<my-custom-element tabindex="1" id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  describe('invalid aria-attributes when used on role=row as a descendant of a table or a grid', function () {
    [
      'aria-posinset="1"',
      'aria-setsize="1"',
      'aria-expanded="true"',
      'aria-level="1"'
    ].forEach(function (attrName) {
      it(
        'should return false when ' +
          attrName +
          ' is used on role=row thats parent is a table',
        function () {
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
    ].forEach(function (attrName) {
      it(
        'should return false when ' +
          attrName +
          ' is used on role=row thats parent is a grid',
        function () {
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
  });

  describe('options.invalidRowAttrs on role=row when a descendant of a table or a grid', function () {
    it('should return false when provided a single aria-attribute is provided for a table', function () {
      axe.configure({
        checks: [
          {
            id: 'aria-allowed-attr',
            options: {
              validTreeRowAttrs: ['aria-posinset']
            }
          }
        ]
      });

      var options = {
        validTreeRowAttrs: ['aria-posinset']
      };
      var vNode = queryFixture(
        ' <div role="table">' +
          '<div id="target" role="row" aria-posinset="2"><div role="cell"></div></div>' +
          '</div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, options, vNode)
      );
      assert.isNotNull(checkContext._data);
    });

    it('should return false when provided a single aria-attribute is provided for a grid', function () {
      axe.configure({
        checks: [
          {
            id: 'aria-allowed-attr',
            options: {
              validTreeRowAttrs: ['aria-level']
            }
          }
        ]
      });

      var options = {
        validTreeRowAttrs: ['aria-level']
      };
      var vNode = queryFixture(
        ' <div role="grid">' +
          '<div id="target" role="row" aria-level="2"><div role="gridcell"></div></div>' +
          '</div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, options, vNode)
      );
      assert.isNotNull(checkContext._data);
    });
  });

  describe('options', function () {
    it('should allow provided attribute names for a role', function () {
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

    it('should handle multiple roles provided in options', function () {
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

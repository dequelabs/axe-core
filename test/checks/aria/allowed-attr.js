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
  // 4 tests for loop
  // it.only('should return false when aria-expanded, aria-posinset, aria-setsize and aria-level are used on role=row that descends from a table', function() {
  //   var vNode = queryFixture(
  //     ' <div role="table">' +
  //       '<div  id="target" role="row" aria-expanded="false"></div>' +
  //       '<div id="row12" role="row" aria-posinset="1"><div role="cell"></div></div>' +
  //       '<div id="row13" role="row" aria-setsize="10"><div role="cell"></div></div>' +
  //       '<div id="row14" role="row" aria-level="1"><div role="cell"></div></div>' +
  //       '</div>'
  //   );

  //   assert.isFalse(
  //     axe.testUtils
  //       .getCheckEvaluate('aria-allowed-attr')
  //       .call(checkContext, null, null, vNode)
  //   );
  // console.log(checkContext._data);

  //   assert.deepEqual(checkContext._data, {
  //     messageKey: 'table',
  //     values: ['aria-expanded="false"'],
  //     roleTable: 'table'
  //   });
  // });

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

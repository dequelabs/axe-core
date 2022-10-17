describe('aria-valid-attr', function () {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should return false if any invalid ARIA attributes are found', function () {
    var vNode = queryFixture(
      '<div id="target" tabindex="1" aria-cats="true" aria-dogs="true"></div>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-cats', 'aria-dogs']);
  });

  it('should return true if no invalid ARIA attributes are found', function () {
    var vNode = queryFixture(
      '<div id="target" tabindex="1" aria-selected="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return true for unsupported ARIA attributes', function () {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-mccheddarton': {
            unsupported: true
          }
        }
      }
    });

    var vNode = queryFixture(
      '<div id="target" tabindex="1" aria-mccheddarton="true"></div>'
    );
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-valid-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  describe('options', function () {
    it('should exclude provided attribute names', function () {
      var vNode = queryFixture(
        '<div id="target" aria-bats="cat" aria-puppies="2"></div>'
      );
      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-valid-attr')
          .call(checkContext, null, ['aria-bats', 'aria-puppies'], vNode)
      );
    });
  });
});

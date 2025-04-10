describe('aria-allowed-attr', () => {
  'use strict';

  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    checkContext.reset();
  });

  it('should detect incorrectly used attributes', () => {
    const vNode = queryFixture(
      '<div role="link" id="target" tabindex="1" aria-selected="true"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should not report on required attributes', () => {
    const vNode = queryFixture(
      '<div role="checkbox" id="target" tabindex="1" aria-checked="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
  });

  it('should detect incorrectly used attributes - implicit role', () => {
    const vNode = queryFixture(
      '<a href="#" id="target" tabindex="1" aria-selected="true"></a>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should return true for global attributes if there is no role', () => {
    const vNode = queryFixture(
      '<div id="target" tabindex="1" aria-busy="true" aria-owns="foo"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return false for non-global attributes if there is no role', () => {
    const vNode = queryFixture(
      '<div id="target" tabindex="1" aria-selected="true" aria-owns="foo"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-selected="true"']);
  });

  it('should not report on invalid attributes', () => {
    const vNode = queryFixture(
      '<div role="dialog" id="target" tabindex="1" aria-cats="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should not report on allowed attributes', () => {
    const vNode = queryFixture(
      '<div role="radio" id="target" tabindex="1" aria-required="true" aria-checked="true"></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should not report on aria-required=false', () => {
    const vNode = queryFixture(
      '<button id="target" aria-required="false"></button>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return false for unallowed aria-required=true', () => {
    const vNode = queryFixture(
      '<button id="target" aria-required="true"></button>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-required="true"']);
  });

  it('should not report on aria-multiline=false with contenteditable', () => {
    const vNode = queryFixture(
      '<div id="target" role="combobox" aria-multiline="false" contenteditable></div>'
    );

    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNull(checkContext._data);
  });

  it('should return false for unallowed aria-multiline=true and contenteditable', () => {
    const vNode = queryFixture(
      '<div id="target" role="combobox" aria-multiline="true" contenteditable></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-multiline="true"']);
  });

  it('should return false for unallowed aria-multiline=false', () => {
    const vNode = queryFixture(
      '<div id="target" role="combobox" aria-multiline="false"></div>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-multiline="false"']);
  });

  it('should return false for unallowed aria-multiline=true', () => {
    const vNode = queryFixture('<div id="target" aria-multiline="true"></div>');

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, ['aria-multiline="true"']);
  });

  it('should return undefined for custom element that has no role and is not focusable', () => {
    const vNode = queryFixture(
      '<my-custom-element id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isUndefined(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  it("should return false for custom element that has a role which doesn't allow the attribute", () => {
    const vNode = queryFixture(
      '<my-custom-element role="insertion" id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  it('should return false for custom element that is focusable', () => {
    const vNode = queryFixture(
      '<my-custom-element tabindex="1" id="target" aria-expanded="true"></my-custom-element>'
    );

    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-attr')
        .call(checkContext, null, null, vNode)
    );
    assert.isNotNull(checkContext._data);
  });

  describe('options', () => {
    it('should allow provided attribute names for a role', () => {
      axe.configure({
        standards: {
          ariaRoles: {
            mccheddarton: {
              allowedAttrs: ['aria-checked']
            }
          }
        }
      });

      const vNode = queryFixture(
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

    it('should handle multiple roles provided in options', () => {
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

      const vNode = queryFixture(
        '<div role="bagley" id="target" aria-selected="true"></div>'
      );
      const options = {
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

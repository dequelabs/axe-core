describe('aria-allowed-attr', () => {
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
    assert.deepEqual(checkContext._data, {
      values: ['aria-expanded="true"']
    });
    assert.equal(
      axe.utils.getCheckMessage(
        'aria-allowed-attr',
        'incomplete',
        checkContext._data
      ),
      'Check that there is no problem if the ARIA attribute is ignored on this element: aria-expanded="true"'
    );
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

    it('should fail on aria-checked="FALSE" and report only non-default values', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="FALSE" aria-busy="FALSE"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-checked="FALSE"']
      });
    });

    it('should review case-sensitive aria-busy when set to its default value', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-busy="FALSE"></div>'
      );

      assert.isUndefined(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-busy="FALSE"']
      });
    });

    it('should not report on case-insensitive aria attributes with non-lowercase values', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-expanded="TRUE" aria-haspopup="TRUE" aria-invalid="TRUE"></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.isNull(checkContext._data);
    });

    it('should fail on case-sensitive aria-pressed="FALSE"', () => {
      const vNode = queryFixture(
        '<div role="button" id="target" aria-pressed="FALSE"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-pressed="FALSE"']
      });
    });

    it('should fail on aria-checked="FALSE" even for a checkbox', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="FALSE"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-checked="FALSE"']
      });
    });

    it('should fail on aria-current="FALSE" despite its missing-attribute default', () => {
      const vNode = queryFixture(
        '<a href="#" id="target" aria-current="FALSE">Current page</a>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-current="FALSE"']
      });
    });

    it('should report only non-default case-sensitive values when both occur', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="TRUE" aria-busy="FALSE"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-checked="TRUE"']
      });
    });

    it('should fail on case-sensitive aria attribute values that are not the default', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="TRUE"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'caseSensitive',
        values: ['aria-checked="TRUE"']
      });
    });

    it('should not report on lowercase case-sensitive aria attribute values', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="true" aria-busy="true"></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.isNull(checkContext._data);
    });

    it('should not report on case-sensitive aria attributes with empty values', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="" aria-busy=""></div>'
      );

      assert.isTrue(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.isNull(checkContext._data);
    });

    it('should report case-sensitive aria attributes when other unallowed attributes are present', () => {
      const vNode = queryFixture(
        '<div role="checkbox" id="target" aria-checked="TRUE" aria-selected="true"></div>'
      );

      assert.isFalse(
        axe.testUtils
          .getCheckEvaluate('aria-allowed-attr')
          .call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, ['aria-selected="true"']);
    });
  });
});

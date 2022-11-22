describe('aria-required-attr', () => {
  const { queryFixture, checkSetup } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const requiredAttrCheck =
    axe.testUtils.getCheckEvaluate('aria-required-attr');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns true for valid attributes', () => {
    const params = checkSetup(
      '<div id="target" role="switch" tabindex="1" aria-checked="false">'
    );
    assert.isTrue(requiredAttrCheck.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('returns false for missing attributes', () => {
    const params = checkSetup('<div id="target" role="switch" tabindex="1">');
    assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-checked']);
  });

  it('returns false for null attributes', () => {
    const params = checkSetup(
      '<div id="target" role="switch" tabindex="1" aria-checked>'
    );
    assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-checked']);
  });

  it('returns false for empty attributes', () => {
    const params = checkSetup(
      '<div id="target" role="switch" tabindex="1" aria-checked="">'
    );
    assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-checked']);
  });

  it('returns true if there is no role', () => {
    const params = checkSetup('<div id="target"></div>');
    assert.isTrue(requiredAttrCheck.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('passes aria-valuenow if element has value property', () => {
    const params = checkSetup('<input id="target" type="range" role="slider">');
    assert.isTrue(requiredAttrCheck.apply(checkContext, params));
  });

  it('passes aria-checkbox if element has checked property', () => {
    const params = checkSetup(
      '<input id="target" type="checkbox" role="switch">'
    );
    assert.isTrue(requiredAttrCheck.apply(checkContext, params));
  });

  describe('separator', () => {
    it('fails a focusable separator', () => {
      const params = checkSetup(
        '<div id="target" role="separator" tabindex="0"></div>'
      );
      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    });

    it('passes a non-focusable separator', () => {
      const params = checkSetup('<div id="target" role="separator"></div>');
      assert.isTrue(requiredAttrCheck.apply(checkContext, params));
    });
  });

  describe('combobox', () => {
    it('passes comboboxes that have aria-expanded="false"', () => {
      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="false"></div>'
      );
      assert.isTrue(requiredAttrCheck.apply(checkContext, params));
    });

    it('fails comboboxes without aria-controls and with an invalid aria-expanded', () => {
      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="invalid-value"></div>'
      );
      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    });

    it('fails comboboxes that has aria-owns without aria-controls', () => {
      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="true" aria-owns="ownedchild"></div>'
      );
      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    });

    it('passes comboboxes that have aria-controls and aria-expanded', () => {
      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="true" aria-controls="test"></div>'
      );

      assert.isTrue(requiredAttrCheck.apply(checkContext, params));
    });

    it('fails comboboxes that have no required attributes', () => {
      const params = checkSetup('<div id="target" role="combobox"></div>');

      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    });

    it('fails comboboxes that have aria-expanded only', () => {
      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="true"></div>'
      );

      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
    });

    it('reports missing of multiple attributes correctly', () => {
      axe.configure({
        standards: {
          ariaRoles: {
            combobox: {
              requiredAttrs: ['aria-expanded', 'aria-label', 'aria-controls']
            }
          }
        }
      });

      const params = checkSetup(
        '<div id="target" role="combobox" aria-expanded="true"></div>'
      );
      assert.isFalse(requiredAttrCheck.apply(checkContext, params));
      assert.deepEqual(checkContext._data, ['aria-label', 'aria-controls']);
    });
  });

  describe('options', () => {
    it('requires provided attribute names for a role', () => {
      axe.configure({
        standards: {
          ariaRoles: {
            mccheddarton: {
              requiredAttrs: ['aria-valuemax']
            }
          }
        }
      });

      const vNode = queryFixture('<div role="mccheddarton" id="target"></div>');
      const options = {
        mccheddarton: ['aria-snuggles']
      };
      assert.isFalse(
        requiredAttrCheck.call(checkContext, vNode.actualNode, options, vNode)
      );
      assert.deepEqual(checkContext._data, ['aria-snuggles', 'aria-valuemax']);
    });
  });
});

describe('aria-valid-attr-value', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const shadowCheckSetup = axe.testUtils.shadowCheckSetup;
  const validAttrValueCheck = axe.testUtils.getCheckEvaluate(
    'aria-valid-attr-value'
  );

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should not check the validity of attribute names', () => {
    const vNode = queryFixture(
      '<div id="target" aria-cats="true" aria-selected="true"></div>'
    );

    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
    assert.isNull(checkContext._data);
  });

  it('should return true if all values are valid', () => {
    const vNode = queryFixture(
      '<div id="target" aria-selected="true" aria-checked="true" aria-relevant="additions removals"></div>'
    );

    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
    assert.isNull(checkContext._data);
  });

  it('should return true if idref(s) values are valid', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        aria-owns="test_tgt1 test_tgt2"
        aria-activedescendant="test_tgt1"
      ></div>
      <div id="test_tgt1"></div>
      <div id="test_tgt2"></div>
    `);

    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
    assert.isNull(checkContext._data);
  });

  it('should return false if any values are invalid', () => {
    const vNode = queryFixture(
      '<div id="target" aria-live="polite" aria-selected="0"></div>'
    );

    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
    assert.deepEqual(checkContext._data, ['aria-selected="0"']);
  });

  it('should allow empty strings rather than idref', () => {
    const tree = fixtureSetup(html`
      <button aria-controls="">Button</button>
      <div aria-activedescendant=""></div>
    `);
    const passing1 = tree.children[0];
    const passing2 = tree.children[1];
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, passing1));
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, passing2));
  });

  it('should allow empty strings rather than idrefs', () => {
    const tree = fixtureSetup(html`
      <button aria-labelledby="">Button</button>
      <div aria-owns=""></div>
    `);
    const passing1 = tree.children[0];
    const passing2 = tree.children[1];
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, passing1));
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, passing2));
  });

  it('should pass on aria-controls and aria-expanded=false when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-expanded="false">Button</button>'
    );
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should pass on aria-controls and aria-selected=false when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-selected="false">Button</button>'
    );
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-controls and aria-expanded=true when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-expanded="true">Button</button>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-controls and aria-selected=true when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-selected="true">Button</button>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-controls when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test">Button</button>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should return undefined on aria-controls with aria-haspopup as we cannot determine if it is in the DOM later', () => {
    const vNode = queryFixture(
      '<button id="target" aria-controls="test" aria-haspopup="true">Button</button>'
    );
    assert.isUndefined(
      validAttrValueCheck.call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'controlsWithinPopup',
      needsReview: 'aria-controls="test"'
    });
  });

  it('should pass on aria-owns and aria-expanded=false when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-owns="test" aria-expanded="false">Button</button>'
    );
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-owns and aria-expanded=true when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-owns="test" aria-expanded="true">Button</button>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-owns when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-owns="test">Button</button>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should fail on aria-level when the value is less than 1', () => {
    const vNode = queryFixture(
      '<div id="target" role="heading" aria-level="0">Heading</div>'
    );
    assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should return undefined on aria-describedby when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-describedby="test">Button</button>'
    );
    assert.isUndefined(
      validAttrValueCheck.call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'noId',
      needsReview: 'aria-describedby="test"'
    });
  });

  it('should return undefined on aria-describedby when the element is in a different shadow tree', () => {
    const params = shadowCheckSetup(
      '<div></div>',
      '<button id="target" aria-describedby="test">Button</button>'
    );
    assert.isUndefined(validAttrValueCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      messageKey: 'noIdShadow',
      needsReview: 'aria-describedby="test"'
    });
  });

  it('should return undefined on aria-labelledby when the element is not in the DOM', () => {
    const vNode = queryFixture(
      '<button id="target" aria-labelledby="test">Button</button>'
    );
    assert.isUndefined(
      validAttrValueCheck.call(checkContext, null, null, vNode)
    );
    assert.deepEqual(checkContext._data, {
      messageKey: 'noId',
      needsReview: 'aria-labelledby="test"'
    });
  });

  it('should return undefined on aria-labelledby when the element is in a different shadow tree', () => {
    const params = shadowCheckSetup(
      '<div></div>',
      '<button id="target" aria-labelledby="test">Button</button>'
    );
    assert.isUndefined(validAttrValueCheck.apply(checkContext, params));
    assert.deepEqual(checkContext._data, {
      messageKey: 'noIdShadow',
      needsReview: 'aria-labelledby="test"'
    });
  });

  it('should return undefined on aria-current with invalid value', () => {
    const vNode = queryFixture(
      '<button id="target" aria-current="test">Button</button>'
    );
    assert.isUndefined(
      validAttrValueCheck.call(checkContext, null, null, vNode)
    );
  });

  it('should return true on valid aria-labelledby value within img elm', () => {
    const vNode = queryFixture(html`
      <div id="foo">hello world</div>
      <img id="target" role="button" aria-labelledby="foo" />
    `);
    assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
  });

  it('should return undefined on invalid aria-labelledby value within img elm', () => {
    const vNode = queryFixture(html`
      <div id="foo">hello world</div>
      <img id="target" role="button" aria-labelledby="hazaar" />
    `);
    assert.isUndefined(
      validAttrValueCheck.call(checkContext, null, null, vNode)
    );
  });

  describe('null values', () => {
    afterEach(() => {
      axe.reset();
    });

    it('returns undefined when a boolean attribute is null', () => {
      const vNode = queryFixture(
        '<div id="target" role="checkbox" aria-checked></div>'
      );
      assert.isUndefined(
        validAttrValueCheck.call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'empty',
        needsReview: 'aria-checked'
      });
    });

    it('returns undefined when a boolean attribute is empty', () => {
      const vNode = queryFixture(
        '<div id="target" role="checkbox" aria-checked=""></div>'
      );
      assert.isUndefined(
        validAttrValueCheck.call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'empty',
        needsReview: 'aria-checked'
      });
    });

    it('returns false for empty string values that are not allowed to be empty', () => {
      axe.configure({
        standards: {
          ariaAttrs: {
            'aria-valuetext': {
              allowEmpty: false
            }
          }
        }
      });
      const vNode = queryFixture(
        '<div id="target" aria-valuetext="" role="range"></div>'
      );
      assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
    });

    it('returns false if there are other issues', () => {
      const vNode = queryFixture(
        '<div id="target" role="checkbox" aria-checked aria-invalid="none"></div>'
      );
      assert.isFalse(validAttrValueCheck.call(checkContext, null, null, vNode));
      assert.deepEqual(checkContext._data, ['aria-invalid="none"']);
    });
  });

  describe('options', () => {
    it('should exclude supplied attributes', () => {
      const vNode = queryFixture(
        '<div id="target" aria-live="nope" aria-describedby="no exist k thx"></div>'
      );
      assert.isTrue(
        validAttrValueCheck.call(
          checkContext,
          null,
          ['aria-live', 'aria-describedby'],
          vNode
        )
      );
    });
  });

  describe('SerialVirtualNode', () => {
    it('should return undefined for idref attribute', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          'aria-owns': 'test'
        }
      });

      assert.isUndefined(
        validAttrValueCheck.call(checkContext, null, null, vNode)
      );
      assert.deepEqual(checkContext._data, {
        messageKey: 'idrefs',
        needsReview: 'aria-owns="test"'
      });
    });

    it('should return true for empty idref attribute', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'button',
        attributes: {
          'aria-owns': ''
        }
      });
      assert.isTrue(validAttrValueCheck.call(checkContext, null, null, vNode));
    });
  });
});

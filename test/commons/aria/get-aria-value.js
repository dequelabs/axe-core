describe('aria.getAriaValue', () => {
  const { queryFixture, fixture, html } = axe.testUtils;
  const getAriaValue = axe.commons.aria.getAriaValue;
  const SerialVirtualNode = axe.SerialVirtualNode;

  it('returns the aria attribute value', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    const result = getAriaValue(vNode, 'aria-label');
    assert.deepEqual(result, {
      value: 'hello',
      source: 'attribute'
    });
  });

  it('returns the aria elementInternals value', () => {
    const vNode = queryFixture(
      html`<testutils-element id="target"></testutils-element>`
    );
    const node = vNode.actualNode;
    node._internals.ariaLabel = 'hello';

    const result = getAriaValue(vNode, 'aria-label');
    assert.deepEqual(result, {
      value: 'hello',
      source: 'internals'
    });
  });

  it('returns null for a non-existent value', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    assert.isNull(getAriaValue(vNode, 'aria-modal'));
  });

  it('returns null for non-aria value', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    assert.isNull(getAriaValue(vNode, 'id'));
  });

  it('trims non-string values', () => {
    const vNode = queryFixture(
      html`<div
        id="target"
        aria-level="   2   "
        aria-valuemax="    2.5    "
        aria-modal="    true   "
        aria-expanded="    false    "
        aria-relevant="    additions removals     "
        aria-activedescendant="   child   "
        aria-labelledby="   foo bar   "
      ></div>`
    );

    let result = getAriaValue(vNode, 'aria-level');
    assert.equal(result.value, '2');

    result = getAriaValue(vNode, 'aria-valuemax');
    assert.equal(result.value, '2.5');

    result = getAriaValue(vNode, 'aria-modal');
    assert.equal(result.value, 'true');

    result = getAriaValue(vNode, 'aria-expanded');
    assert.equal(result.value, 'false');

    result = getAriaValue(vNode, 'aria-relevant');
    assert.equal(result.value, 'additions removals');

    result = getAriaValue(vNode, 'aria-activedescendant');
    assert.equal(result.value, 'child');

    result = getAriaValue(vNode, 'aria-labelledby');
    assert.equal(result.value, 'foo bar');
  });

  it('does not trim string values', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="   hello   "></div>`
    );

    const { value } = getAriaValue(vNode, 'aria-label');
    assert.equal(value, '   hello   ');
  });

  it('does not lowercase values', () => {
    const vNode = queryFixture(
      html`<div
        id="target"
        aria-modal="TRUE"
        aria-expanded="FalSE"
        aria-relevant="additions REMOVALS"
        aria-label="FoO"
        aria-activedescendant="childNode"
        aria-labelledby="fooBar"
      ></div>`
    );

    let result = getAriaValue(vNode, 'aria-modal');
    assert.equal(result.value, 'TRUE');

    result = getAriaValue(vNode, 'aria-expanded');
    assert.equal(result.value, 'FalSE');

    result = getAriaValue(vNode, 'aria-relevant');
    assert.equal(result.value, 'additions REMOVALS');

    result = getAriaValue(vNode, 'aria-activedescendant');
    assert.equal(result.value, 'childNode');

    result = getAriaValue(vNode, 'aria-labelledby');
    assert.equal(result.value, 'fooBar');
  });

  it('accepts DOM nodes', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-label="hello"></div>`
    );

    const { value } = getAriaValue(vNode.actualNode, 'aria-label');
    assert.equal(value, 'hello');
  });

  it('works with attributes that have no AOM property equivalent', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-dropeffect="copy"></div>`
    );

    const result = getAriaValue(vNode, 'aria-dropeffect');
    assert.deepEqual(result, {
      value: 'copy',
      source: 'attribute'
    });
  });

  it('works with empty attributes that have no AOM property equivalent', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-dropeffect=""></div>`
    );

    const result = getAriaValue(vNode, 'aria-dropeffect');
    assert.deepEqual(result, {
      value: '',
      source: 'attribute'
    });
  });

  it('returns null for missing elementInternals property when set via external api', () => {
    const vNode = queryFixture(html`<div id="target"></div>`);
    vNode.elementInternals = {
      role: 'button'
    };

    assert.isNull(getAriaValue(vNode, 'aria-label'));
  });

  describe('idref', () => {
    it('returns the attribute value over the property value', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-activedescendant="child">
          <div id="child"></div>
        </div>`
      );

      const result = getAriaValue(vNode, 'aria-activedescendant');
      assert.deepEqual(result, {
        value: 'child',
        source: 'attribute'
      });
    });

    it('returns a stringified value if only the property is set', () => {
      const vNode = queryFixture(
        html`<div id="target">
          <div id="child"></div>
        </div>`
      );
      const node = vNode.actualNode;
      const child = fixture.querySelector('#child');
      node.ariaActiveDescendantElement = child;

      const result = getAriaValue(vNode, 'aria-activedescendant');
      assert.deepEqual(result, {
        value: 'DIV',
        source: 'property'
      });
    });

    it('returns empty string if value is empty', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-activedescendant=""></div>`
      );

      const result = getAriaValue(vNode, 'aria-activedescendant');
      assert.deepEqual(result, {
        value: '',
        source: 'attribute'
      });
    });
  });

  describe('idrefs', () => {
    it('returns the idrefs attribute value over the property value', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-labelledby="label"></div>
          <div id="label"></div>`
      );

      const result = getAriaValue(vNode, 'aria-labelledby');
      assert.deepEqual(result, {
        value: 'label',
        source: 'attribute'
      });
    });

    it('returns a stringified value if only the property is set', () => {
      const vNode = queryFixture(
        html`<div id="target"></div>
          <div id="label1"></div>
          <div id="label2"></div>`
      );
      const node = vNode.actualNode;
      const label1 = fixture.querySelector('#label1');
      const label2 = fixture.querySelector('#label2');
      node.ariaLabelledByElements = [label1, label2];

      const result = getAriaValue(vNode, 'aria-labelledby');
      assert.deepEqual(result, {
        value: '[DIV,DIV]',
        source: 'property'
      });
    });

    it('returns empty string if value is empty', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-labelledby=""></div>`
      );

      const result = getAriaValue(vNode, 'aria-labelledby');
      assert.deepEqual(result, {
        value: '',
        source: 'attribute'
      });
    });
  });

  describe('options', () => {
    describe('lowercase', () => {
      it('lower cases the value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-expanded="TRUE"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-expanded', {
          lowercase: true
        });
        assert.equal(value, 'true');
      });

      it('does not throw for missing elementInternals property when set via external api', () => {
        const vNode = queryFixture(html`<div id="target"></div>`);
        vNode.elementInternals = {
          role: 'button'
        };

        assert.doesNotThrow(() => {
          getAriaValue(vNode, 'aria-label', { lowercase: true });
        });
        assert.isNull(getAriaValue(vNode, 'aria-label', { lowercase: true }));
      });
    });
  });

  describe('SerialVirtualNode', () => {
    it('returns the aria attribute value', () => {
      // SerialVirtualNode will not support `props` or `elementInternals` so everything must be part of the `attributes` property
      const vNode = new SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-label': 'hello'
        }
      });

      const result = getAriaValue(vNode, 'aria-label');
      assert.deepEqual(result, {
        value: 'hello',
        source: 'attribute'
      });
    });

    describe('idref', () => {
      it('works with idref', () => {
        const vNode = new SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            'aria-activedescendant': 'child'
          }
        });

        const result = getAriaValue(vNode, 'aria-activedescendant');
        assert.deepEqual(result, {
          value: 'child',
          source: 'attribute'
        });
      });

      it('returns empty string if value is empty', () => {
        const vNode = new SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            'aria-activedescendant': ''
          }
        });

        const result = getAriaValue(vNode, 'aria-activedescendant');
        assert.deepEqual(result, {
          value: '',
          source: 'attribute'
        });
      });
    });

    describe('idrefs', () => {
      it('works with idrefs', () => {
        const vNode = new SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            'aria-labelledby': 'label'
          }
        });

        const result = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(result, {
          value: 'label',
          source: 'attribute'
        });
      });

      it('returns empty string if value is empty', () => {
        const vNode = new SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            'aria-labelledby': ''
          }
        });

        const result = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(result, {
          value: '',
          source: 'attribute'
        });
      });
    });
  });
});

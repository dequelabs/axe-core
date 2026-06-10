describe('aria.getAriaIdrefs', () => {
  const { queryFixture, queryShadowFixture, fixture, html } = axe.testUtils;
  const getAriaIdrefs = axe.commons.aria.getAriaIdrefs;
  const getNodeFromTree = axe.utils.getNodeFromTree;

  function ids(vNodes) {
    return vNodes.map(vNode => vNode.attr('id'));
  }

  it('resolves an idrefs attribute to virtual nodes', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-labelledby="label1 label2"></div>
        <div id="label1"></div>
        <div id="label2"></div>`
    );

    const result = getAriaIdrefs(vNode, 'aria-labelledby');
    assert.deepEqual(ids(result), ['label1', 'label2']);
  });

  it('resolves a single idref attribute to virtual nodes', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-activedescendant="child">
        <div id="child"></div>
      </div>`
    );

    const result = getAriaIdrefs(vNode, 'aria-activedescendant');
    assert.deepEqual(ids(result), ['child']);
  });

  it('resolves multiple refs for an idref-typed attribute with an element-array property', () => {
    // aria-errormessage is type `idref` but reflects to a *plural* property
    // (ariaErrorMessageElements), so the resolver must stay value-shape driven
    const vNode = queryFixture(
      html`<div id="target" aria-errormessage="err1 err2"></div>
        <div id="err1"></div>
        <div id="err2"></div>`
    );

    const result = getAriaIdrefs(vNode, 'aria-errormessage');
    assert.deepEqual(ids(result), ['err1', 'err2']);
  });

  it('filters out ids that do not resolve to an element', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-labelledby="label1 missing label2"></div>
        <div id="label1"></div>
        <div id="label2"></div>`
    );

    const result = getAriaIdrefs(vNode, 'aria-labelledby');
    assert.deepEqual(ids(result), ['label1', 'label2']);
  });

  it('returns an empty array when the attribute is missing', () => {
    const vNode = queryFixture(html`<div id="target"></div>`);
    assert.deepEqual(getAriaIdrefs(vNode, 'aria-labelledby'), []);
  });

  it('returns an empty array when the attribute is empty', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-labelledby=""></div>`
    );
    assert.deepEqual(getAriaIdrefs(vNode, 'aria-labelledby'), []);
  });

  it('resolves references across a shadow boundary', () => {
    const vNode = queryShadowFixture(
      html`<div id="shadow"></div>`,
      html`<div id="target" aria-labelledby="label"></div>
        <div id="label"></div>`
    );

    const result = getAriaIdrefs(vNode, 'aria-labelledby');
    assert.deepEqual(ids(result), ['label']);
  });

  it('throws for a non-reference ARIA attribute', () => {
    const vNode = queryFixture(html`<div id="target" aria-label="x"></div>`);
    assert.throws(() => getAriaIdrefs(vNode, 'aria-label'), TypeError);
  });

  it('throws for a non-ARIA attribute', () => {
    const vNode = queryFixture(html`<div id="target"></div>`);
    assert.throws(() => getAriaIdrefs(vNode, 'id'), TypeError);
  });

  describe('property', () => {
    it('resolves a reflected element-array property when the attribute is empty', () => {
      const vNode = queryFixture(
        html`<div id="target"></div>
          <div id="label1"></div>
          <div id="label2"></div>`
      );
      vNode.actualNode.ariaLabelledByElements = [
        fixture.querySelector('#label1'),
        fixture.querySelector('#label2')
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label1', 'label2']);
    });

    it('filters out disconnected referenced elements', () => {
      const vNode = queryFixture(
        html`<div id="target"></div>
          <div id="label1"></div>`
      );
      const detached = document.createElement('div');
      vNode.actualNode.ariaLabelledByElements = [
        fixture.querySelector('#label1'),
        detached
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label1']);
    });
  });

  describe('elementInternals', () => {
    it('resolves an element-array internals property', () => {
      const vNode = queryFixture(
        html`<testutils-element id="target"></testutils-element>
          <div id="label1"></div>
          <div id="label2"></div>`
      );
      vNode.actualNode._internals.ariaLabelledByElements = [
        fixture.querySelector('#label1'),
        fixture.querySelector('#label2')
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label1', 'label2']);
    });

    it('prefers the attribute over the internals value', () => {
      const vNode = queryFixture(
        html`<testutils-element
            id="target"
            aria-labelledby="label1"
          ></testutils-element>
          <div id="label1"></div>
          <div id="label2"></div>`
      );
      vNode.actualNode._internals.ariaLabelledByElements = [
        fixture.querySelector('#label2')
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label1']);
    });

    it('filters out disconnected referenced elements', () => {
      const vNode = queryFixture(
        html`<testutils-element id="target"></testutils-element>
          <div id="label1"></div>`
      );
      const detached = document.createElement('div');
      vNode.actualNode._internals.ariaLabelledByElements = [
        fixture.querySelector('#label1'),
        detached
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label1']);
    });

    it('resolves an internals reference across a shadow boundary', () => {
      // internals element references may point at nodes in another tree scope
      const vNode = queryShadowFixture(
        html`<div id="shadow"></div>
          <div id="label"></div>`,
        html`<testutils-element id="target"></testutils-element>`
      );
      vNode.actualNode._internals.ariaLabelledByElements = [
        fixture.querySelector('#label')
      ];

      const result = getAriaIdrefs(vNode, 'aria-labelledby');
      assert.deepEqual(ids(result), ['label']);
    });

    describe('global internals map', () => {
      afterEach(() => {
        delete globalThis._elementInternals;
      });

      it('resolves an element-array value from the global map', () => {
        const vNode = queryFixture(
          html`<testutils-element id="target"></testutils-element>
            <div id="label1"></div>
            <div id="label2"></div>`
        );
        const node = vNode.actualNode;
        node._internals.ariaLabelledByElements = [
          fixture.querySelector('#label1'),
          fixture.querySelector('#label2')
        ];
        globalThis._elementInternals = new WeakMap();
        globalThis._elementInternals.set(node, node._internals);

        const result = getAriaIdrefs(vNode, 'aria-labelledby');
        assert.deepEqual(ids(result), ['label1', 'label2']);
      });

      it('uses the global map internals over the _internals property', () => {
        const vNode = queryFixture(
          html`<testutils-element id="target"></testutils-element>
            <div id="label1"></div>
            <div id="label2"></div>`
        );
        const node = vNode.actualNode;
        node._internals.ariaLabelledByElements = [
          fixture.querySelector('#label1')
        ];
        // can't attach internals twice, so fake an ElementInternals object
        const mapInternals = {
          ariaLabelledByElements: [fixture.querySelector('#label2')]
        };
        Object.setPrototypeOf(mapInternals, window.ElementInternals.prototype);
        globalThis._elementInternals = new WeakMap();
        globalThis._elementInternals.set(node, mapInternals);

        const result = getAriaIdrefs(vNode, 'aria-labelledby');
        assert.deepEqual(ids(result), ['label2']);
      });
    });
  });

  describe('SerialVirtualNode', () => {
    it('returns an empty array for an empty attribute', () => {
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-labelledby': ''
        }
      });

      assert.deepEqual(getAriaIdrefs(vNode, 'aria-labelledby'), []);
    });

    it('returns an empty array for a non-empty attribute without throwing', () => {
      // no real DOM node to resolve the ids against
      const vNode = new axe.SerialVirtualNode({
        nodeName: 'div',
        attributes: {
          'aria-labelledby': 'label'
        }
      });

      assert.deepEqual(getAriaIdrefs(vNode, 'aria-labelledby'), []);
    });
  });

  it('accepts a DOM node', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-labelledby="label"></div>
        <div id="label"></div>`
    );

    const result = getAriaIdrefs(vNode.actualNode, 'aria-labelledby');
    assert.deepEqual(ids(result), ['label']);
    assert.strictEqual(
      result[0],
      getNodeFromTree(fixture.querySelector('#label'))
    );
  });
});

describe('aria.getAriaValue', () => {
  const html = axe.testUtils.html;

  const { queryFixture, fixture, flatTreeSetup } = axe.testUtils;
  const getNodeFromTree = axe.utils.getNodeFromTree;
  const getAriaValue = axe.commons.aria.getAriaValue;

  describe('normalization', () => {
    describe('string', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-description="hello"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-description');
        assert.equal(value, 'hello');
      });

      it('does not trim', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-description="  hello  "></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-description');
        assert.equal(value, '  hello  ');
      });

      it('returns "" for empty value', () => {
        const vNode = queryFixture(html`<div id="target" aria-label=""></div>`);

        const { value } = getAriaValue(vNode, 'aria-label');
        assert.equal(value, '');
      });
    });

    describe('int', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-colspan="2"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-colspan');
        assert.equal(value, 2);
      });

      it('normalizes as int', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-colspan="2.5"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-colspan');
        assert.equal(value, 2);
      });

      it('returns NaN for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-colspan=""></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-colspan');
        assert.isNaN(value);
      });
    });

    describe('decimal', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-valuemax="2"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-valuemax');
        assert.equal(value, 2);
      });

      it('normalizes as decimal', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-valuemax="2.5"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-valuemax');
        assert.equal(value, 2.5);
      });

      it('returns NaN for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-valuemax=""></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-valuemax');
        assert.isNaN(value);
      });
    });

    describe('boolean', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-modal="true"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-modal');
        assert.equal(value, true);
      });

      it('normalizes as boolean', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-modal="false"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-modal');
        assert.equal(value, false);
      });

      it('treats anything not "true" as false', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-modal="not-valid"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-modal');
        assert.equal(value, false);
      });

      it('trims', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-modal="  true  "></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-modal');
        assert.equal(value, true);
      });

      it('returns false for empty value', () => {
        const vNode = queryFixture(html`<div id="target" aria-modal=""></div>`);

        const { value } = getAriaValue(vNode, 'aria-modal');
        assert.equal(value, false);
      });
    });

    describe('nmtoken', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-expanded="true"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-expanded');
        assert.equal(value, 'true');
      });

      it('trims', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-expanded="  false  "></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-expanded');
        assert.equal(value, 'false');
      });

      it('lowercases', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-expanded="uNdEfiNed"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-expanded');
        assert.equal(value, 'undefined');
      });

      it('returns "" for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-expanded=""></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-expanded');
        assert.equal(value, '');
      });
    });

    describe('nmtokens', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-relevant="additions removals"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-relevant');
        assert.deepEqual(value, ['additions', 'removals']);
      });

      it('trims', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-relevant="   additions removals   "></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-relevant');
        assert.deepEqual(value, ['additions', 'removals']);
      });

      it('lowercases', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-relevant="AlL"></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-relevant');
        assert.deepEqual(value, ['all']);
      });

      it('return [""] for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-relevant=""></div>`
        );

        const { value } = getAriaValue(vNode, 'aria-relevant');
        assert.deepEqual(value, ['']);
      });
    });

    describe('idref', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-activedescendant="child">
            <div id="child"></div>
          </div>`
        );
        const child = fixture.querySelector('#child');
        const childVNode = getNodeFromTree(child);

        const { value } = getAriaValue(vNode, 'aria-activedescendant');
        assert.equal(value, childVNode);
      });

      it('returns an already resolved value', () => {
        const vNode = queryFixture(
          html`<div id="target">
            <div id="child"></div>
          </div>`
        );
        const child = fixture.querySelector('#child');
        const childVNode = getNodeFromTree(child);
        vNode.actualNode.ariaActiveDescendantElement = child;

        const { value } = getAriaValue(vNode, 'aria-activedescendant');
        assert.equal(value, childVNode);
      });

      it.skip('throws if element is not in tree', () => {
        const child = new axe.SerialVirtualNode({
          nodeName: 'div',
          attributes: {
            id: 'child'
          }
        });
        const node = new axe.SerialVirtualNode({
          nodeName: 'div',
          props: {
            ariaActiveDescendantElement: child
          }
        });
        node.children = [child];
        child.parent = node;

        assert.throws(() => {
          getAriaValue(node, 'aria-activedescendant');
        }, 'Cannot resolve id references for partial DOM');
      });

      it('returns null for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-activedescendant="">
            <div id="child"></div>
          </div>`
        );

        const { value } = getAriaValue(vNode, 'aria-activedescendant');
        assert.isNull(value);
      });
    });

    describe('idrefs', () => {
      it('returns value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-labelledby="label"></div>
            <div id="label">Hello</div>`
        );
        const label = fixture.querySelector('#label');
        const labelVNode = getNodeFromTree(label);

        const { value } = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(value, [labelVNode]);
      });

      it('returns an already resolved value', () => {
        const vNode = queryFixture(
          html`<div id="target"></div>
            <div id="label"></div>`
        );
        const label = fixture.querySelector('#label');
        const labelVNode = getNodeFromTree(label);
        vNode.actualNode.ariaLabelledByElements = [label];

        const { value } = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(value, [labelVNode]);
      });

      it('ignores unconnected nodes', () => {
        const vNode = queryFixture(
          html`<div id="target"></div>
            <div id="label"></div>`
        );
        const div = document.createElement('div');
        const label = fixture.querySelector('#label');
        const labelVNode = getNodeFromTree(label);
        vNode.actualNode.ariaLabelledByElements = [div, label];

        const { value } = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(value, [labelVNode]);
      });

      it('returns [] for empty value', () => {
        const vNode = queryFixture(
          html`<div id="target" aria-labelledby=""></div>
            <div id="label">Hello</div>`
        );

        const { value } = getAriaValue(vNode, 'aria-labelledby');
        assert.deepEqual(value, []);
      });
    });
  });

  describe('resolves', () => {
    it('the aria property value', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-label="hello"></div>`
      );

      assert.deepEqual(getAriaValue(vNode, 'aria-label'), {
        value: 'hello',
        source: 'property'
      });
    });

    // since the property reflects the attribute value the property will almost always get resolved over the attribute value
    it("the aria attribute value for attrs that don't have an AOM name", () => {
      const vNode = queryFixture(
        html`<div id="target" aria-dropeffect="copy"></div>`
      );

      assert.deepEqual(getAriaValue(vNode, 'aria-dropeffect'), {
        value: ['copy'],
        source: 'attribute'
      });
    });

    it('the aria elementInternals value', () => {
      fixture.innerHTML = html`<testutils-element
        id="target"
      ></testutils-element>`;
      const node = fixture.querySelector('#target');
      node._internals.ariaLabel = 'hello';
      flatTreeSetup(fixture);

      assert.deepEqual(getAriaValue(node, 'aria-label'), {
        value: 'hello',
        source: 'internals'
      });
    });

    it('to null for a non-existent value', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-label="hello"></div>`
      );

      assert.isNull(getAriaValue(vNode, 'aria-modal'));
    });

    it('to null for non-aria value', () => {
      const vNode = queryFixture(
        html`<div id="target" aria-label="hello"></div>`
      );

      assert.isNull(getAriaValue(vNode, 'id'));
    });
  });
});

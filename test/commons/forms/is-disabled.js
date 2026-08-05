describe('forms.isDisabled', () => {
  const { html, queryFixture, queryShadowFixture } = axe.testUtils;
  const isDisabled = axe.commons.forms.isDisabled;

  describe('with disabled attr', () => {
    it('returns false when not set', () => {
      const vNode = queryFixture(html`<input id="target" type="text" />`);

      assert.isFalse(isDisabled(vNode));
    });

    it('returns true for an element that can be disabled', () => {
      const vNode = queryFixture(
        html`<input id="target" type="text" disabled />`
      );

      assert.isTrue(isDisabled(vNode));
    });

    it('returns false for an element that can not be disabled', () => {
      const vNode = queryFixture(html`<span id="target" disabled>Hello</span>`);

      assert.isFalse(isDisabled(vNode));
    });

    it('returns true when disabled has a value', () => {
      const vNode = queryFixture(
        html`<input id="target" type="text" disabled="yes" />`
      );

      assert.isTrue(isDisabled(vNode));
    });

    it('returns true when in a disabled fieldset', () => {
      const vNode = queryFixture(html`
        <fieldset disabled>
          <span id="target">Hello world</span>
        </fieldset>
      `);

      assert.isTrue(isDisabled(vNode));
    });

    it('returns true when in a disabled button', () => {
      const vNode = queryFixture(html`
        <button disabled>
          <span id="target">Hello world</span>
        </button>
      `);

      assert.isTrue(isDisabled(vNode));
    });

    it('returns true for an ancestor in the flat tree that can be disabled', () => {
      const vNode = queryShadowFixture(
        html`<fieldset disabled><section id="shadow"></section></fieldset>`,
        html`<input id="target" type="text" />`
      );

      assert.isTrue(isDisabled(vNode));
    });
  });

  describe('with aria-disabled attr', () => {
    it('returns true for an element with aria-disabled=true', () => {
      const vNode = queryFixture(
        html`<span id="target" aria-disabled="true">hello</span>`
      );

      assert.isTrue(isDisabled(vNode));
    });

    it('returns false for an element when aria-disabled is not true', () => {
      const vNode = queryFixture(
        html`<span id="target" aria-disabled="not true">hello</span>`
      );

      assert.isFalse(isDisabled(vNode));
    });

    it('returns true if the closest ancestor with aria-disabled is set to true', () => {
      const vNode = queryFixture(html`
        <section aria-disabled="false">
          <div aria-disabled="true"><span id="target">hello</span></div>
        </section>
      `);

      assert.isTrue(isDisabled(vNode));
    });

    it('returns false if the closest ancestor with aria-disabled is set to false', () => {
      const vNode = queryFixture(html`
        <section aria-disabled="true">
          <div aria-disabled="false"><span id="target">hello</span></div>
        </section>
      `);

      assert.isFalse(isDisabled(vNode));
    });

    it('returns true for an element with elementInternals aria-disabled=true', () => {
      const vNode = queryFixture(
        html`<testutils-element id="target" with-aria-disabled="true"
          >hello</testutils-element
        >`
      );

      assert.isTrue(isDisabled(vNode));
    });
  });

  describe('with both disabled and aria-disabled', () => {
    it('returns true when aria-disabled=false and disabled=disabled', () => {
      const vNode = queryFixture(html`
        <fieldset aria-disabled="false" disabled>
          <span id="target">hello</span>
        </fieldset>
      `);

      assert.isTrue(isDisabled(vNode));
    });
  });
});

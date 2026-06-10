describe('aria.getAriaIdref', () => {
  const { queryFixture, fixture, html } = axe.testUtils;
  const getAriaIdref = axe.commons.aria.getAriaIdref;

  it('resolves a single idref attribute to a virtual node', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-activedescendant="child">
        <div id="child"></div>
      </div>`
    );

    const result = getAriaIdref(vNode, 'aria-activedescendant');
    assert.equal(result.attr('id'), 'child');
  });

  it('returns the first reference for an idrefs attribute', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-labelledby="label1 label2"></div>
        <div id="label1"></div>
        <div id="label2"></div>`
    );

    const result = getAriaIdref(vNode, 'aria-labelledby');
    assert.equal(result.attr('id'), 'label1');
  });

  it('returns null when the attribute is missing', () => {
    const vNode = queryFixture(html`<div id="target"></div>`);
    assert.isNull(getAriaIdref(vNode, 'aria-activedescendant'));
  });

  it('returns null when the reference does not resolve', () => {
    const vNode = queryFixture(
      html`<div id="target" aria-activedescendant="missing"></div>`
    );
    assert.isNull(getAriaIdref(vNode, 'aria-activedescendant'));
  });

  describe('property', () => {
    it('resolves a reflected element property when the attribute is empty', () => {
      const vNode = queryFixture(
        html`<div id="target"></div>
          <div id="child"></div>`
      );
      vNode.actualNode.ariaActiveDescendantElement =
        fixture.querySelector('#child');

      const result = getAriaIdref(vNode, 'aria-activedescendant');
      assert.equal(result.attr('id'), 'child');
    });

    it('returns null when the referenced element is disconnected', () => {
      const vNode = queryFixture(html`<div id="target"></div>`);
      vNode.actualNode.ariaActiveDescendantElement =
        document.createElement('div');

      assert.isNull(getAriaIdref(vNode, 'aria-activedescendant'));
    });
  });

  describe('elementInternals', () => {
    it('resolves an element internals property', () => {
      const vNode = queryFixture(
        html`<testutils-element id="target"></testutils-element>
          <div id="child"></div>`
      );
      vNode.actualNode._internals.ariaActiveDescendantElement =
        fixture.querySelector('#child');

      const result = getAriaIdref(vNode, 'aria-activedescendant');
      assert.equal(result.attr('id'), 'child');
    });
  });
});

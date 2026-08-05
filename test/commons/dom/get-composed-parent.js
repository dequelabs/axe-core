/* global xit */
describe('dom.getComposedParent', () => {
  const html = axe.testUtils.html;
  const getComposedParent = axe.commons.dom.getComposedParent;
  const fixture = document.getElementById('fixture');
  const shadowSupport = axe.testUtils.shadowSupport.v1;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns the parentNode normally', () => {
    fixture.innerHTML = '<div id="parent"><div id="target"></div></div>';

    const actual = getComposedParent(document.getElementById('target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, document.getElementById('parent'));
  });

  it('returns null from the documentElement', () => {
    assert.isNull(getComposedParent(document.documentElement));
  });

  (shadowSupport ? it : xit)('skip the slot node for slotted content', () => {
    fixture.innerHTML = '<div id="shadow"><div id="target"></div></div>';
    const shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div id="grand-parent">
        <slot id="parent"></slot>
      </div>
    `;

    const actual = getComposedParent(fixture.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#grand-parent'));
  });

  (shadowSupport ? it : xit)('understands explicitly slotted nodes', () => {
    fixture.innerHTML =
      '<div id="shadow"><div id="target" slot="bar"></div></div>';
    const shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div id="grand-parent">
        <slot name="foo"></slot>
        <div id="parent"><slot name="bar"></slot></div>
      </div>
    `;

    const actual = getComposedParent(fixture.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#parent'));
  });

  (shadowSupport ? it : xit)('returns elements within a shadow tree', () => {
    fixture.innerHTML = '<div id="shadow"> content </div>';
    const shadowRoot = document
      .getElementById('shadow')
      .attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = html`
      <div id="parent">
        <slot id="target"></slot>
      </div>
    `;

    const actual = getComposedParent(shadowRoot.querySelector('#target'));
    assert.instanceOf(actual, Node);
    assert.equal(actual, shadowRoot.querySelector('#parent'));
  });

  (shadowSupport ? it : xit)(
    'returns the host when it reaches the shadow root',
    () => {
      fixture.innerHTML = '<div id="parent"> content </div>';
      const shadowRoot = document
        .getElementById('parent')
        .attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '<div id="target"> <slot></slot> </div>';

      const actual = getComposedParent(shadowRoot.querySelector('#target'));
      assert.instanceOf(actual, Node);
      assert.equal(actual, fixture.querySelector('#parent'));
    }
  );
});

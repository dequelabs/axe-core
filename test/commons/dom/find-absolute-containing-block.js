describe('dom.findAbsoluteContainingBlock', () => {
  const { html, queryFixture } = axe.testUtils;
  const findAbsoluteContainingBlock =
    axe.commons.dom.findAbsoluteContainingBlock;
  const getVNode = id => axe.utils.getNodeFromTree(document.getElementById(id));

  it('returns the closest positioned ancestor', () => {
    const vNode = queryFixture(html`
      <div style="position: relative">
        <div id="cb" style="position: relative">
          <div><span id="target" style="position: absolute">x</span></div>
        </div>
      </div>
    `);
    assert.equal(findAbsoluteContainingBlock(vNode), getVNode('cb'));
  });

  it('returns an ancestor that is a containing block without being positioned', () => {
    const vNode = queryFixture(html`
      <div style="position: relative">
        <div id="cb" style="transform: translateX(0)">
          <span id="target" style="position: absolute">x</span>
        </div>
      </div>
    `);
    assert.equal(findAbsoluteContainingBlock(vNode), getVNode('cb'));
  });

  it('returns null when no ancestor is a containing block', () => {
    const vNode = queryFixture(html`
      <div><span id="target" style="position: absolute">x</span></div>
    `);
    assert.isNull(findAbsoluteContainingBlock(vNode));
  });

  it('walks the flat tree from slotted content into the shadow tree', () => {
    axe.testUtils.fixtureSetup(
      html`
        <div id="host">
          <template shadowrootmode="open">
            <div id="cb" style="position: relative"><slot></slot></div>
          </template>
          <span id="target" style="position: absolute">x</span>
        </div>
      `,
      { shadow: true }
    );
    const vCb = axe.utils.getNodeFromTree(
      document.querySelector('#host').shadowRoot.querySelector('#cb')
    );
    assert.equal(findAbsoluteContainingBlock(getVNode('target')), vCb);
  });
});

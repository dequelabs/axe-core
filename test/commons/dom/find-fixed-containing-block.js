describe('dom.findFixedContainingBlock', () => {
  const { html, queryFixture } = axe.testUtils;
  const findFixedContainingBlock = axe.commons.dom.findFixedContainingBlock;
  const getVNode = id => axe.utils.getNodeFromTree(document.getElementById(id));

  it('returns null when no ancestor traps fixed elements', () => {
    const vNode = queryFixture(html`
      <div style="position: relative">
        <div style="position: absolute">
          <span id="target" style="position: fixed">x</span>
        </div>
      </div>
    `);
    assert.isNull(findFixedContainingBlock(vNode));
  });

  [
    'transform: translateX(0)',
    'translate: 1px',
    'rotate: 1deg',
    'scale: 1.01',
    'filter: blur(0)',
    'backdrop-filter: blur(1px)',
    'perspective: 100px',
    'content-visibility: auto',
    'contain: paint',
    'contain: layout',
    'will-change: transform',
    'will-change: filter'
  ].forEach(style => {
    it(`returns the closest ancestor with ${style}`, () => {
      const vNode = queryFixture(html`
        <div style="transform: translateX(0)">
          <div id="cb" style="${style}">
            <div style="position: relative">
              <span id="target" style="position: fixed">x</span>
            </div>
          </div>
        </div>
      `);
      assert.equal(findFixedContainingBlock(vNode), getVNode('cb'));
    });
  });

  it('ignores display: contents ancestors', () => {
    const vNode = queryFixture(html`
      <div style="display: contents; transform: translateX(0)">
        <span id="target" style="position: fixed">x</span>
      </div>
    `);
    assert.isNull(findFixedContainingBlock(vNode));
  });
});

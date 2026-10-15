describe('dom.isClippedByAncestor', () => {
  const { html, fixtureSetup } = axe.testUtils;
  const isClippedByAncestor = axe.commons.dom.isClippedByAncestor;
  const getVNode = id => axe.utils.getNodeFromTree(document.getElementById(id));

  it('returns true for every ancestor of an in-flow element', () => {
    fixtureSetup(html`
      <div id="outer">
        <div id="inner"><span id="target">x</span></div>
      </div>
    `);
    assert.isTrue(isClippedByAncestor(getVNode('target'), getVNode('inner')));
    assert.isTrue(isClippedByAncestor(getVNode('target'), getVNode('outer')));
  });

  it('returns false for ancestors between an absolute element and its containing block', () => {
    fixtureSetup(html`
      <div id="above">
        <div id="cb" style="position: relative">
          <div id="between">
            <span id="target" style="position: absolute">x</span>
          </div>
        </div>
      </div>
    `);
    const vTarget = getVNode('target');
    assert.isFalse(isClippedByAncestor(vTarget, getVNode('between')));
    assert.isTrue(isClippedByAncestor(vTarget, getVNode('cb')));
    assert.isTrue(isClippedByAncestor(vTarget, getVNode('above')));
  });

  it('returns false for every ancestor of an absolute element without a containing block', () => {
    fixtureSetup(html`
      <div id="outer">
        <div id="inner">
          <span id="target" style="position: absolute">x</span>
        </div>
      </div>
    `);
    assert.isFalse(isClippedByAncestor(getVNode('target'), getVNode('inner')));
    assert.isFalse(isClippedByAncestor(getVNode('target'), getVNode('outer')));
  });

  it('applies to the in-flow content of an absolute element', () => {
    fixtureSetup(html`
      <div id="cb" style="position: relative">
        <div id="between">
          <div style="position: absolute">
            <span id="target">x</span>
          </div>
        </div>
      </div>
    `);
    assert.isFalse(
      isClippedByAncestor(getVNode('target'), getVNode('between'))
    );
    assert.isTrue(isClippedByAncestor(getVNode('target'), getVNode('cb')));
  });

  it('combines nested absolute elements', () => {
    fixtureSetup(html`
      <div id="cb-outer" style="position: relative">
        <div id="between-outer">
          <div id="cb-inner" style="position: absolute">
            <div id="between-inner">
              <span id="target" style="position: absolute">x</span>
            </div>
          </div>
        </div>
      </div>
    `);
    const vTarget = getVNode('target');
    assert.isFalse(isClippedByAncestor(vTarget, getVNode('between-inner')));
    assert.isFalse(isClippedByAncestor(vTarget, getVNode('between-outer')));
    assert.isTrue(isClippedByAncestor(vTarget, getVNode('cb-outer')));
  });

  it('returns true for an ancestor that is the containing block through a transform', () => {
    fixtureSetup(html`
      <div id="cb" style="transform: translateX(0)">
        <span id="target" style="position: absolute">x</span>
      </div>
    `);
    assert.isTrue(isClippedByAncestor(getVNode('target'), getVNode('cb')));
  });

  it('returns false for ancestors below the containing block of a fixed element', () => {
    fixtureSetup(html`
      <div id="trap" style="transform: translateX(0)">
        <div id="positioned" style="position: relative">
          <span id="target" style="position: fixed">x</span>
        </div>
      </div>
    `);
    const vTarget = getVNode('target');
    assert.isFalse(isClippedByAncestor(vTarget, getVNode('positioned')));
    assert.isTrue(isClippedByAncestor(vTarget, getVNode('trap')));
  });

  it('returns false for every ancestor of an untrapped fixed element and its content', () => {
    fixtureSetup(html`
      <div id="outer" style="position: relative">
        <div style="position: fixed"><span id="target">x</span></div>
      </div>
    `);
    assert.isFalse(isClippedByAncestor(getVNode('target'), getVNode('outer')));
  });

  it('combines absolute elements inside fixed elements', () => {
    fixtureSetup(html`
      <div id="outer" style="position: relative">
        <div style="position: fixed">
          <div id="cb" style="position: relative">
            <span id="target" style="position: absolute">x</span>
          </div>
        </div>
      </div>
    `);
    const vTarget = getVNode('target');
    assert.isTrue(isClippedByAncestor(vTarget, getVNode('cb')));
    assert.isFalse(isClippedByAncestor(vTarget, getVNode('outer')));
  });
});

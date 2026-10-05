describe('dom.isSeparateTarget', () => {
  const { fixtureSetup, html } = axe.testUtils;
  const isSeparateTarget = axe.commons.dom.isSeparateTarget;

  function getNodes(markup) {
    fixtureSetup(markup);
    return [
      axe.utils.getNodeFromTree(document.querySelector('#target')),
      axe.utils.getNodeFromTree(document.querySelector('#other'))
    ];
  }

  it('returns true for a focusable widget', () => {
    const [target, other] = getNodes(html`
      <a id="target" href="/x">a</a>
      <button id="other">b</button>
    `);
    assert.isTrue(isSeparateTarget(target, other));
  });

  it('returns true for an anchor to a different destination', () => {
    const [target, other] = getNodes(html`
      <a id="target" href="/x">a</a>
      <a id="other" href="/y">b</a>
    `);
    assert.isTrue(isSeparateTarget(target, other));
  });

  it('returns false for a non-widget', () => {
    const [target, other] = getNodes(html`
      <a id="target" href="/x">a</a>
      <span id="other" tabindex="0">b</span>
    `);
    assert.isFalse(isSeparateTarget(target, other));
  });

  it('returns false for a non-focusable widget', () => {
    const [target, other] = getNodes(html`
      <a id="target" href="/x">a</a>
      <button id="other" disabled>b</button>
    `);
    assert.isFalse(isSeparateTarget(target, other));
  });

  it('returns false for an anchor to the same destination', () => {
    const [target, other] = getNodes(html`
      <a id="target" href="/x">a</a>
      <a id="other" href="/x">b</a>
    `);
    assert.isFalse(isSeparateTarget(target, other));
  });
});

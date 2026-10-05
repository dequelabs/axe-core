describe('dom.hasSameDestination', () => {
  const { fixtureSetup, html } = axe.testUtils;
  const hasSameDestination = axe.commons.dom.hasSameDestination;

  function getNodes(markup) {
    fixtureSetup(markup);
    return [
      axe.utils.getNodeFromTree(document.querySelector('#a')),
      axe.utils.getNodeFromTree(document.querySelector('#b'))
    ];
  }

  function getAnchors(hrefA, hrefB = hrefA) {
    return getNodes(html`
      <a id="a" href="${hrefA}">a</a>
      <a id="b" href="${hrefB}">b</a>
    `);
  }

  it('returns true for two anchors with the same href', () => {
    const [a, b] = getAnchors('/x');
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for a relative and an absolute href to the same URL', () => {
    const [a, b] = getAnchors('/x', `${location.origin}/x`);
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for hrefs that resolve to the same URL', () => {
    const [a, b] = getAnchors('/dest', '/other/../dest');
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for an in-page fragment and the full URL with the same fragment', () => {
    const [a, b] = getAnchors(
      '#dest',
      `${location.pathname}${location.search}#dest`
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns false for different in-page fragments', () => {
    const [a, b] = getAnchors('#x', '#y');
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for different hrefs', () => {
    const [a, b] = getAnchors('/x', '/y');
    assert.isFalse(hasSameDestination(a, b));
  });

  [
    '',
    '  ',
    '#',
    '/#',
    'javascript:void(0)',
    'JAVASCRIPT:void(0)',
    'java&#9;script:void(0)'
  ].forEach(href => {
    it(`returns false when both anchors use href="${href}"`, () => {
      const [a, b] = getAnchors(href);
      assert.isFalse(hasSameDestination(a, b));
    });
  });

  it('returns true for an area and an anchor with the same href', () => {
    const [a, b] = getNodes(html`
      <map name="m">
        <area id="a" href="/x" alt="x" shape="rect" coords="0,0,10,10" />
      </map>
      <a id="b" href="/x">b</a>
    `);
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true when only the target attribute differs', () => {
    const [a, b] = getNodes(html`
      <a id="a" href="/x" target="_blank">a</a>
      <a id="b" href="/x">b</a>
    `);
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns false for anchors without an href', () => {
    const [a, b] = getNodes(html`
      <a id="a">a</a>
      <a id="b">b</a>
    `);
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for elements that are not anchors or areas', () => {
    const [a, b] = getNodes(html`
      <button id="a">a</button>
      <span id="b" role="link" tabindex="0">b</span>
    `);
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for `link` elements with an href', () => {
    const [a, b] = getNodes(html`
      <link id="a" href="/x" />
      <link id="b" href="/x" />
    `);
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns true for SVG anchors with the same href', () => {
    const [a, b] = getNodes(html`
      <svg>
        <a id="a" href="/x"><text>a</text></a>
        <a id="b" href="/x"><text>b</text></a>
      </svg>
    `);
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for virtual nodes without an actual node', () => {
    const a = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: { href: '/x' }
    });
    const b = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: { href: '/x' }
    });
    assert.isTrue(hasSameDestination(a, b));
  });
});

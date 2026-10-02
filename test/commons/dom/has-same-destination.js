describe('dom.hasSameDestination', () => {
  const { fixtureSetup } = axe.testUtils;
  const hasSameDestination = axe.commons.dom.hasSameDestination;

  function getPair(html) {
    fixtureSetup(html);
    return [
      axe.utils.getNodeFromTree(document.querySelector('#a')),
      axe.utils.getNodeFromTree(document.querySelector('#b'))
    ];
  }

  it('returns true for two links with the same href', () => {
    const [a, b] = getPair(
      '<a id="a" href="/x">a</a><a id="b" href="/x">b</a>'
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for a relative and an absolute href to the same URL', () => {
    const [a, b] = getPair(
      `<a id="a" href="/x">a</a><a id="b" href="${location.origin}/x">b</a>`
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for hrefs that resolve to the same URL', () => {
    const [a, b] = getPair(
      '<a id="a" href="/dest">a</a><a id="b" href="/other/../dest">b</a>'
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true for an area and a link with the same href', () => {
    const [a, b] = getPair(
      '<map name="m"><area id="a" href="/x" alt="x" shape="rect" coords="0,0,10,10"></map>' +
        '<a id="b" href="/x">b</a>'
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns true when only the target attribute differs', () => {
    const [a, b] = getPair(
      '<a id="a" href="/x" target="_blank">a</a><a id="b" href="/x">b</a>'
    );
    assert.isTrue(hasSameDestination(a, b));
  });

  it('returns false for different hrefs', () => {
    const [a, b] = getPair(
      '<a id="a" href="/x">a</a><a id="b" href="/y">b</a>'
    );
    assert.isFalse(hasSameDestination(a, b));
  });

  [
    '',
    '  ',
    '#',
    '#foo',
    ' #foo',
    '/#',
    'javascript:void(0)',
    'JAVASCRIPT:void(0)',
    'java&#9;script:void(0)'
  ].forEach(href => {
    it(`returns false when both links use href="${href}"`, () => {
      const [a, b] = getPair(
        `<a id="a" href="${href}">a</a><a id="b" href="${href}">b</a>`
      );
      assert.isFalse(hasSameDestination(a, b));
    });
  });

  it('returns false when either link has a download attribute', () => {
    const [a, b] = getPair(
      '<a id="a" href="/x" download>a</a><a id="b" href="/x">b</a>'
    );
    assert.isFalse(hasSameDestination(a, b));
    assert.isFalse(hasSameDestination(b, a));
  });

  it('returns false for links without an href', () => {
    const [a, b] = getPair('<a id="a">a</a><a id="b">b</a>');
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for non-link elements', () => {
    const [a, b] = getPair(
      '<button id="a">a</button><span id="b" role="link" tabindex="0">b</span>'
    );
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for non-link elements with an href', () => {
    const [a, b] = getPair(
      '<link id="a" href="/x" /><link id="b" href="/x" />'
    );
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for SVG links', () => {
    const [a, b] = getPair(
      '<svg><a id="a" href="/x"><text>a</text></a><a id="b" href="/x"><text>b</text></a></svg>'
    );
    assert.isFalse(hasSameDestination(a, b));
  });

  it('returns false for virtual nodes without an actual node', () => {
    const a = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: { href: '/x' }
    });
    const b = new axe.SerialVirtualNode({
      nodeName: 'a',
      attributes: { href: '/x' }
    });
    assert.isFalse(hasSameDestination(a, b));
  });
});

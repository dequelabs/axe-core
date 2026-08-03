describe('dom.getElementByReference', () => {
  const { html, fixtureSetup } = axe.testUtils;

  it('should return null if the attribute is not found', () => {
    fixtureSetup('<a id="link" href="#target">Hi</a>');
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'usemap');

    assert.isNull(result);
  });

  it('should return null if the attribute does not start with "#"', () => {
    fixtureSetup('<a id="link" usemap="target">Hi</a>');
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.isNull(result);
  });

  it('should return null if no targets are found', () => {
    fixtureSetup('<a id="link" href="#target">Hi</a>');
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.isNull(result);
  });

  it('should return node if target is found (href)', () => {
    fixtureSetup(html`
      <a id="link" href="#target">Hi</a>
      <a id="target"></a>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should return node if target is found (usemap)', () => {
    fixtureSetup(html`
      <img id="link" usemap="#target">Hi</a>
      <map id="target"></map>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'usemap');

    assert.equal(result, expected);
  });

  it('should prioritize ID', () => {
    fixtureSetup(html`
      <a id="link" href="#target">Hi</a>
      <a id="target"></a>
      <a name="target"></a>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should fallback to name', () => {
    fixtureSetup(html`
      <a id="link" href="#target">Hi</a>
      <a name="target" id="target0"></a>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should return the first matching element with name', () => {
    fixtureSetup(html`
      <a id="link" href="#target">Hi</a>
      <a name="target" id="target0"></a>
      <a name="target"></a>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('returns the first matching element using Angular skiplinks', () => {
    fixtureSetup(html`
      <a id="link" href="/#target">Hi</a>
      <a name="target" id="target0"></a>
      <a name="target"></a>
    `);

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should work with absolute links', () => {
    const currentPage = window.location.origin + window.location.pathname;

    fixtureSetup(
      html`<a id="link" href="${currentPage}#target">Hi</a>
        <a id="target"></a>
        <a name="target"></a> `
    );

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });
});

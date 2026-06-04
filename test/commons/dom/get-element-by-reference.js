describe('dom.getElementByReference', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return null if the attribute is not found', () => {
    fixture.innerHTML = '<a id="link" href="#target">Hi</a>';
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'usemap');

    assert.isNull(result);
  });

  it('should return null if the attribute does not start with "#"', () => {
    fixture.innerHTML = '<a id="link" usemap="target">Hi</a>';
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.isNull(result);
  });

  it('should return null if no targets are found', () => {
    fixture.innerHTML = '<a id="link" href="#target">Hi</a>';
    const node = document.getElementById('link'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.isNull(result);
  });

  it('should return node if target is found (href)', () => {
    fixture.innerHTML = html`
      <a id="link" href="#target">Hi</a>
      <a id="target"></a>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should return node if target is found (usemap)', () => {
    fixture.innerHTML = html`
      <img id="link" usemap="#target">Hi</a>
      <map id="target"></map>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'usemap');

    assert.equal(result, expected);
  });

  it('should prioritize ID', () => {
    fixture.innerHTML = html`
      <a id="link" href="#target">Hi</a>
      <a id="target"></a>
      <a name="target"></a>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should fallback to name', () => {
    fixture.innerHTML = html`
      <a id="link" href="#target">Hi</a>
      <a name="target" id="target0"></a>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should return the first matching element with name', () => {
    fixture.innerHTML = html`
      <a id="link" href="#target">Hi</a>
      <a name="target" id="target0"></a>
      <a name="target"></a>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('returns the first matching element using Angular skiplinks', () => {
    fixture.innerHTML = html`
      <a id="link" href="/#target">Hi</a>
      <a name="target" id="target0"></a>
      <a name="target"></a>
    `;

    const node = document.getElementById('link'),
      expected = document.getElementById('target0'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });

  it('should work with absolute links', () => {
    const currentPage = window.location.origin + window.location.pathname;

    fixture.innerHTML = html`<a id="link" href="${currentPage}#target">Hi</a>
      <a id="target"></a>
      <a name="target"></a>`;

    const node = document.getElementById('link'),
      expected = document.getElementById('target'),
      result = axe.commons.dom.getElementByReference(node, 'href');

    assert.equal(result, expected);
  });
});

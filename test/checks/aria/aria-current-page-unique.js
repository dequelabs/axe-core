describe('aria-current-page-unique', () => {
  const { html, checkSetup, MockCheckContext, getCheckEvaluate } =
    axe.testUtils;
  const checkContext = new MockCheckContext();
  const checkEvaluate = getCheckEvaluate('aria-current-page-unique');
  let base;

  afterEach(() => {
    checkContext.reset();
    base?.remove();
    base = null;
  });

  it('returns false when no other link is marked aria-current="page"', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="/b">B</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, []);
  });

  it('returns true when another link marked aria-current="page" leads to a different URL', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a id="other" href="/b" aria-current="page">B</a>
    `);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._relatedNodes, [
      document.querySelector('#other')
    ]);
  });

  it('returns true for links that differ only in a query value', () => {
    const params = checkSetup(html`
      <a id="target" href="/x?edit=1" aria-current="page">1</a>
      <a href="/x?edit=2" aria-current="page">2</a>
    `);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns false when several links to the same URL are marked', () => {
    const params = checkSetup(html`
      <header><a id="target" href="/a" aria-current="page">A</a></header>
      <footer><a href="/a" aria-current="page">A</a></footer>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('ignores the order of query parameters', () => {
    const params = checkSetup(html`
      <a id="target" href="/a?x=1&amp;y=2" aria-current="page">A</a>
      <a href="/a?y=2&amp;x=1" aria-current="page">A</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('ignores a trailing slash and index.html', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="/a/" aria-current="page">A</a>
      <a href="/a/index.html" aria-current="page">A</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns false for the same hash route', () => {
    const params = checkSetup(html`
      <a id="target" href="#/users" aria-current="page">Users</a>
      <a href="#!/users/" aria-current="page">Users</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns true for different hash routes', () => {
    const params = checkSetup(html`
      <a id="target" href="#/users" aria-current="page">Users</a>
      <a href="#/settings" aria-current="page">Settings</a>
    `);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('ignores fragment-only links that are not hash routes', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="#main" aria-current="page">Skip</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('ignores links with other aria-current values', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="/a#step-2" aria-current="step">Step 2</a>
      <a href="/b" aria-current="true">B</a>
      <a href="/c" aria-current="location">C</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('matches aria-current="page" case-insensitively', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="/b" aria-current="PAGE">B</a>
    `);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('includes area elements', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <map name="m">
        <area href="/b" aria-current="page" alt="B" shape="rect" />
      </map>
      <img usemap="#m" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" />
    `);
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('ignores links hidden from screen readers', () => {
    const params = checkSetup(html`
      <a id="target" href="/a" aria-current="page">A</a>
      <a href="/b" aria-current="page" style="display:none">B</a>
      <div aria-hidden="true">
        <a href="/c" aria-current="page" tabindex="-1">C</a>
      </div>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('resolves hrefs against the base URL', () => {
    base = document.createElement('base');
    base.href = `${location.origin}/sub/`;
    document.head.appendChild(base);
    const params = checkSetup(html`
      <a id="target" href="a" aria-current="page">A</a>
      <a href="/sub/a" aria-current="page">A</a>
    `);
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  describe('Shadow DOM', () => {
    it('returns true for a link to a different URL inside shadow DOM', () => {
      const params = checkSetup(html`
        <a id="target" href="/a" aria-current="page">A</a>
        <div>
          <template shadowrootmode="open">
            <a href="/b" aria-current="page">B</a>
          </template>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
      assert.lengthOf(checkContext._relatedNodes, 1);
    });

    it('returns false for a link to the same URL inside shadow DOM', () => {
      const params = checkSetup(html`
        <a id="target" href="/a" aria-current="page">A</a>
        <div>
          <template shadowrootmode="open">
            <a href="/a" aria-current="page">A</a>
          </template>
        </div>
      `);
      assert.isFalse(checkEvaluate.apply(checkContext, params));
    });

    it('returns true for a target inside shadow DOM and a different URL outside it', () => {
      const params = checkSetup(html`
        <a href="/b" aria-current="page">B</a>
        <div>
          <template shadowrootmode="open">
            <a id="target" href="/a" aria-current="page">A</a>
          </template>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });

    it('returns true for links in different shadow roots', () => {
      const params = checkSetup(html`
        <div>
          <template shadowrootmode="open">
            <a id="target" href="/a" aria-current="page">A</a>
          </template>
        </div>
        <div>
          <template shadowrootmode="open">
            <a href="/b" aria-current="page">B</a>
          </template>
        </div>
      `);
      assert.isTrue(checkEvaluate.apply(checkContext, params));
    });
  });
});

describe('dom.getPageUrl', () => {
  const getPageUrl = axe.commons.dom.getPageUrl;
  const origin = location.origin;
  let base;

  afterEach(() => {
    base?.remove();
    base = null;
  });

  it('resolves a relative href against the document', () => {
    assert.deepEqual(getPageUrl('/x'), { page: `${origin}/x`, route: null });
  });

  it('resolves an href against the base URL', () => {
    base = document.createElement('base');
    base.href = `${origin}/sub/`;
    document.head.appendChild(base);
    assert.deepEqual(getPageUrl('x'), {
      page: `${origin}/sub/x`,
      route: null
    });
  });

  it('trims the href', () => {
    assert.deepEqual(getPageUrl('  /x  '), {
      page: `${origin}/x`,
      route: null
    });
  });

  it('removes a trailing slash', () => {
    assert.equal(getPageUrl('/x/').page, `${origin}/x`);
  });

  it('removes a final index.html', () => {
    assert.equal(getPageUrl('/x/index.html').page, `${origin}/x`);
    assert.equal(getPageUrl('/index.html').page, origin);
  });

  it('keeps other file names', () => {
    assert.equal(getPageUrl('/x/about.html').page, `${origin}/x/about.html`);
  });

  it('sorts query parameters', () => {
    assert.equal(getPageUrl('/x?b=2&a=1').page, `${origin}/x?a=1&b=2`);
  });

  it('removes an empty query', () => {
    assert.equal(getPageUrl('/x?').page, `${origin}/x`);
  });

  it('drops a fragment that is not a hash route', () => {
    assert.deepEqual(getPageUrl('/x#section'), {
      page: `${origin}/x`,
      route: null
    });
  });

  it('returns a #/ hash route as the route', () => {
    assert.deepEqual(getPageUrl('/x#/users/?b=2&a=1'), {
      page: `${origin}/x`,
      route: '/users?a=1&b=2'
    });
  });

  it('returns a #!/ hash route as the route', () => {
    assert.equal(getPageUrl('/x#!/users').route, '/users');
  });

  it('returns a fragment-only hash route', () => {
    assert.equal(getPageUrl('#/users').route, '/users');
  });

  it('returns null for a fragment-only href that is not a hash route', () => {
    assert.isNull(getPageUrl('#section'));
    assert.isNull(getPageUrl('#'));
    assert.isNull(getPageUrl('#!'));
  });

  it('returns null for a javascript: URL', () => {
    assert.isNull(getPageUrl('javascript:void(0)'));
  });

  it('returns null for an invalid URL', () => {
    assert.isNull(getPageUrl('http://['));
  });
});

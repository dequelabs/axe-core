describe('is-current-page-link', () => {
  const isCurrentPageLink = axe.commons.dom.isCurrentPageLink;
  const currentPage = window.location.origin + window.location.pathname;
  let base;

  afterEach(() => {
    if (base) {
      document.head.removeChild(base);
    }
  });

  it('should return true for hash links', () => {
    const anchor = document.createElement('a');
    anchor.href = '#main';
    document.body.appendChild(anchor);
    assert.isTrue(isCurrentPageLink(anchor));
  });

  it('should return true for relative links to the same page', () => {
    const anchor = document.createElement('a');
    anchor.href = window.location.pathname;
    assert.isTrue(isCurrentPageLink(anchor));
  });

  it('should return true for absolute links to the same page', () => {
    const anchor = document.createElement('a');
    anchor.href = currentPage;
    assert.isTrue(isCurrentPageLink(anchor));
  });

  it('should return true for angular skip links', () => {
    const anchor = document.createElement('a');
    anchor.href = '/#main';
    assert.isTrue(isCurrentPageLink(anchor));
  });

  it('should return false for just "#"', () => {
    const anchor = document.createElement('a');
    anchor.href = '#';
    assert.isFalse(isCurrentPageLink(anchor));
  });

  it('should return false for relative links to a different page', () => {
    const anchor = document.createElement('a');
    anchor.href = '/foo/bar/index.html';
    assert.isFalse(isCurrentPageLink(anchor));
  });

  it('should return false for absolute links to a different page', () => {
    const anchor = document.createElement('a');
    anchor.href = 'https://my-page.com/foo/bar/index.html';
    assert.isFalse(isCurrentPageLink(anchor));
  });

  it('should return false for angular router links (#!)', () => {
    const anchor = document.createElement('a');
    anchor.href = '#!main';
    assert.isFalse(isCurrentPageLink(anchor));
  });

  it('should return false for angular router links (#/)', () => {
    const anchor = document.createElement('a');
    anchor.href = '#/main';
    assert.isFalse(isCurrentPageLink(anchor));
  });
});

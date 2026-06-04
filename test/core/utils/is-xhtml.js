describe('axe.utils.isXHTML', () => {
  it('should be a function', () => {
    assert.isFunction(axe.utils.isXHTML);
  });

  it('should return true on any document that is XHTML', () => {
    const doc = document.implementation.createDocument(
      'http://www.w3.org/1999/xhtml',
      'html',
      null
    );
    assert.isTrue(axe.utils.isXHTML(doc));
  });

  it('should return false on any document that is HTML', () => {
    const doc = document.implementation.createHTMLDocument('Monkeys');
    assert.isFalse(axe.utils.isXHTML(doc));
  });

  it('should return false on any document that is HTML - fixture', () => {
    assert.isFalse(axe.utils.isXHTML(document));
  });
});

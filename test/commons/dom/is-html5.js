describe('dom.isHTML5', () => {
  it('should return false on any document that is not HTML5', () => {
    const doc = document.implementation.createDocument(
      'http://www.w3.org/1999/xhtml',
      'html',
      null
    );
    assert.isFalse(axe.commons.dom.isHTML5(doc));
  });

  it('should return true on any document that is HTML5', () => {
    const doc = document.implementation.createHTMLDocument('Monkeys');
    assert.isTrue(axe.commons.dom.isHTML5(doc));
  });

  it('should return true on any document that is HTML5 - fixture', () => {
    assert.isTrue(axe.commons.dom.isHTML5(document));
  });
});

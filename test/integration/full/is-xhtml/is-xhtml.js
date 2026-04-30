describe('axe.utils.isXHTML', () => {
  it('should return true on any document that is XHTML', () => {
    assert.isTrue(axe.utils.isXHTML(document));
  });
});

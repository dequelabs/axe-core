describe('doc-has-title', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return false if title is empty', () => {
    const orig = document.title;
    document.title = '';
    assert.isFalse(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });

  it('should return false if title contains only whitespace', () => {
    const orig = document.title;
    document.title = ' \t\r\n \n   \r \n\t';
    assert.isFalse(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });

  it('should return true if title is non-empty', () => {
    const orig = document.title;
    document.title = 'Bananas';

    assert.isTrue(axe.testUtils.getCheckEvaluate('doc-has-title')(fixture));
    document.title = orig;
  });
});

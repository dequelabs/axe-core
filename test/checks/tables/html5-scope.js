describe('html5-scope', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true on THs', () => {
    fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
    const node = fixture.querySelector('th');

    assert.isTrue(axe.testUtils.getCheckEvaluate('html5-scope')(node));
  });

  it('should return false on TDs', () => {
    fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
    const node = fixture.querySelector('td');

    assert.isFalse(axe.testUtils.getCheckEvaluate('html5-scope')(node));
  });

  it('should return true on non-HTML5 documents', () => {
    const origPublicId = document.publicId;
    fixture.innerHTML = '<table><tr><th scope="col"></th></tr></table>';
    const node = fixture.querySelector('th');

    assert.isTrue(axe.testUtils.getCheckEvaluate('html5-scope')(node));
    document.publicId = origPublicId;
  });
});

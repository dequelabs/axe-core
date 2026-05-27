describe('aria-label', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if an aria-label is present', () => {
    const checkArgs = checkSetup('<div id="target" aria-label="woohoo"></div>');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('aria-label').apply(null, checkArgs)
    );
  });

  it('should return false if an aria-label is not present', () => {
    const checkArgs = checkSetup('<div id="target"></div>');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('aria-label').apply(null, checkArgs)
    );
  });

  it('should return false if an aria-label is present, but empty', () => {
    const checkArgs = checkSetup('<div id="target" aria-label=" "></div>');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('aria-label').apply(null, checkArgs)
    );
  });

  it('should collapse whitespace', () => {
    const checkArgs = checkSetup(
      '<div id="target" aria-label=" \t \n \r \t  \t\r\n "></div>'
    );
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('aria-label').apply(null, checkArgs)
    );
  });
});

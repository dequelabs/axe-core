describe('non-empty-placeholder', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-placeholder');
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if a placeholder is present', () => {
    const params = checkSetup('<input id="target" placeholder="woohoo" />');

    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if a placeholder is not present', () => {
    const params = checkSetup('<input id="target" />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if a placeholder is present, but empty', () => {
    const params = checkSetup('<input id="target" placeholder=" " />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', () => {
    const params = checkSetup(
      '<input id="target" placeholder=" \t \n \r \t  \t\r\n " />'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

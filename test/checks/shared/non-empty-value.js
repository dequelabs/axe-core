describe('non-empty-value', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-value');
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if an value is present', () => {
    const params = checkSetup('<input id="target" value="woohoo" />');

    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if an value is not present', () => {
    const params = checkSetup('<input id="target" />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if an value is present, but empty', () => {
    const params = checkSetup('<input id="target" value=" " />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', () => {
    const params = checkSetup(
      '<input id="target" value=" \t \n \r \t  \t\r\n " />'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

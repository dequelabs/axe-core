describe('autocomplete-valid', () => {
  const fixture = document.getElementById('fixture');
  const checkSetup = axe.testUtils.checkSetup;
  const checkContext = axe.testUtils.MockCheckContext();
  const evaluate = axe.testUtils.getCheckEvaluate('autocomplete-valid');

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if autocomplete is valid', () => {
    const params = checkSetup('<input autocomplete="on" id="target" />');
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if autocomplete is not valid', () => {
    const params = checkSetup('<input autocomplete="foo" id="target" />');
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('returns undefined (incomplete) if autocomplete is ignored', () => {
    const params = checkSetup('<input autocomplete="text" id="target" />');
    assert.isUndefined(evaluate.apply(checkContext, params));
  });

  it('uses options to change what is valid autocomplete', () => {
    const options = { stateTerms: ['foo'] };
    const params = checkSetup(
      '<input autocomplete="foo" id="target" />',
      options
    );
    assert.isTrue(evaluate.apply(checkContext, params));
  });
});

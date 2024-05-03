describe('autocomplete-valid', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let checkContext = axe.testUtils.MockCheckContext();
  let evaluate = axe.testUtils.getCheckEvaluate('autocomplete-valid');

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if autocomplete is valid', function () {
    let params = checkSetup('<input autocomplete="on" id="target" />');
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if autocomplete is not valid', function () {
    let params = checkSetup('<input autocomplete="foo" id="target" />');
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('uses options to change what is valid autocomplete', function () {
    let options = { stateTerms: ['foo'] };
    let params = checkSetup(
      '<input autocomplete="foo" id="target" />',
      options
    );
    assert.isTrue(evaluate.apply(checkContext, params));
  });
});

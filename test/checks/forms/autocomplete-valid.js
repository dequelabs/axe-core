describe('autocomplete-valid', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var evaluate = axe.testUtils.getCheckEvaluate('autocomplete-valid');

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if autocomplete is valid', function () {
    var params = checkSetup('<input autocomplete="on" id="target" />');
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('returns false if autocomplete is not valid', function () {
    var params = checkSetup('<input autocomplete="foo" id="target" />');
    assert.isFalse(evaluate.apply(checkContext, params));
  });

  it('uses options to change what is valid autocomplete', function () {
    var options = { stateTerms: ['foo'] };
    var params = checkSetup(
      '<input autocomplete="foo" id="target" />',
      options
    );
    assert.isTrue(evaluate.apply(checkContext, params));
  });
});

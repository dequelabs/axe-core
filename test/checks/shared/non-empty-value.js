describe('non-empty-value', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-value');
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if an value is present', function () {
    let params = checkSetup('<input id="target" value="woohoo" />');

    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if an value is not present', function () {
    let params = checkSetup('<input id="target" />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if an value is present, but empty', function () {
    let params = checkSetup('<input id="target" value=" " />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', function () {
    let params = checkSetup(
      '<input id="target" value=" \t \n \r \t  \t\r\n " />'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

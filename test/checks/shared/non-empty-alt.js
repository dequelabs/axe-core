describe('non-empty-alt', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-alt');
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if an alt is present', function () {
    let params = checkSetup('<img id="target" alt="woohoo" />');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if an alt is not present', function () {
    let params = checkSetup('<img id="target" />');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if an alt is present, but empty', function () {
    let params = checkSetup('<img id="target" alt=" " />');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', function () {
    let params = checkSetup('<img id="target" alt=" \t \n \r \t  \t\r\n " />');
    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

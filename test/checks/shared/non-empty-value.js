describe('non-empty-value', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('non-empty-value');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if an value is present', function () {
    var params = checkSetup('<input id="target" value="woohoo" />');

    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('should return false if an value is not present', function () {
    var params = checkSetup('<input id="target" />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'noAttr');
  });

  it('should return false if an value is present, but empty', function () {
    var params = checkSetup('<input id="target" value=" " />');

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });

  it('should collapse whitespace', function () {
    var params = checkSetup(
      '<input id="target" value=" \t \n \r \t  \t\r\n " />'
    );

    assert.isFalse(checkEvaluate.apply(checkContext, params));
    assert.equal(checkContext._data.messageKey, 'emptyAttr');
  });
});

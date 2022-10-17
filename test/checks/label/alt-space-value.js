describe('alt-space-value', function () {
  'use strict';

  var checkSetup = axe.testUtils.checkSetup;
  var checkContext = axe.testUtils.MockCheckContext();
  var check = checks['alt-space-value'];

  afterEach(function () {
    checkContext.reset();
  });

  it('should return true if alt contains a space character', function () {
    var params = checkSetup('<img id="target" alt=" " />');
    assert.isTrue(check.evaluate.apply(checkContext, params));
  });

  it('should return true if alt contains a non-breaking space character', function () {
    var params = checkSetup('<img id="target" alt="&nbsp;" />');
    assert.isTrue(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt attribute is empty', function () {
    var params = checkSetup('<img id="target" alt="" />');
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt attribute has a proper text value', function () {
    var params = checkSetup('<img id="target" alt="text content" />');
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });
});

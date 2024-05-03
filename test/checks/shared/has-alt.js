describe('has-alt', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkSetup = axe.testUtils.checkSetup;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if an alt is present', function () {
    let checkArgs = checkSetup('<img id="target" alt="woohoo" />');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('has-alt').apply(null, checkArgs)
    );
  });

  it('should return true if an empty alt is present', function () {
    let checkArgs = checkSetup('<img id="target" alt="" />');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('has-alt').apply(null, checkArgs)
    );
  });

  it('should return true if a null alt is present', function () {
    let checkArgs = checkSetup('<img id="target" alt />');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('has-alt').apply(null, checkArgs)
    );
  });

  it('should return false if an alt is not present', function () {
    let checkArgs = checkSetup('<img id="target" />');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('has-alt').apply(null, checkArgs)
    );
  });
});

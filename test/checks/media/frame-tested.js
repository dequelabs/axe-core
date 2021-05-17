describe('frame-tested', function() {
  'use strict';

  var checkEvaluate = axe.testUtils.getCheckEvaluate('frame-tested');

  it('returns undefined', function() {
    assert.isUndefined(checkEvaluate());
  });

  it('returns false if passed isViolation:true', function() {
    assert.isFalse(checkEvaluate(null, { isViolation: true }));
  });
});

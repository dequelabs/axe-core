describe('frame-focusable-content-matches', function () {
  'use strict';
  var rule;

  beforeEach(function () {
    rule = axe.utils.getRule('frame-focusable-content');
  });

  it('returns false for the top-level context', function () {
    var result = rule.matches(null, null, {
      initiator: true,
      focusable: false,
      size: {
        width: 100,
        height: 100
      }
    });
    assert.isFalse(result);
  });

  it('returns false for focusable iframes', function () {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: true,
      size: {
        width: 100,
        height: 100
      }
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (1x1)', function () {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      size: {
        width: 1,
        height: 1
      }
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (0x0)', function () {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      size: {
        width: 0,
        height: 0
      }
    });
    assert.isFalse(result);
  });

  it('returns true for non-focusable iframes', function () {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      size: {
        width: 2,
        height: 1
      }
    });
    assert.isTrue(result);
  });
});

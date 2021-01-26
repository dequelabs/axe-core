describe('frame-focusable-matches', function() {
  'use strict';
  var rule;

  beforeEach(function() {
    rule = axe.utils.getRule('frame-focusable');
  });

  it('returns false for the top-level context', function() {
    var result = rule.matches(null, null, { initiator: true });
    assert.isFalse(result);
  });

  it('returns false for focusable iframes', function() {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: true
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (1x1)', function() {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      boundingClientRect: {
        width: 1,
        height: 1
      }
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (0x0)', function() {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      boundingClientRect: {
        width: 0,
        height: 0
      }
    });
    assert.isFalse(result);
  });

  it('returns true for non-focusable iframes', function() {
    var result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      boundingClientRect: {
        width: 2,
        height: 1
      }
    });
    assert.isTrue(result);
  });
});

describe('frame-focusable-content-matches', () => {
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('frame-focusable-content');
  });

  it('returns false for the top-level context', () => {
    const result = rule.matches(null, null, {
      initiator: true,
      focusable: false,
      size: {
        width: 100,
        height: 100
      }
    });
    assert.isFalse(result);
  });

  it('returns false for focusable iframes', () => {
    const result = rule.matches(null, null, {
      initiator: false,
      focusable: true,
      size: {
        width: 100,
        height: 100
      }
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (1x1)', () => {
    const result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      size: {
        width: 1,
        height: 1
      }
    });
    assert.isFalse(result);
  });

  it('returns false for non-focusable iframes that are too small (0x0)', () => {
    const result = rule.matches(null, null, {
      initiator: false,
      focusable: false,
      size: {
        width: 0,
        height: 0
      }
    });
    assert.isFalse(result);
  });

  it('returns true for non-focusable iframes', () => {
    const result = rule.matches(null, null, {
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

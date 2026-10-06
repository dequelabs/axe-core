describe('dom.isSamePage', () => {
  const isSamePage = axe.commons.dom.isSamePage;

  it('returns true for the same href', () => {
    assert.isTrue(isSamePage('/x', '/x'));
  });

  it('returns true for a relative and an absolute href to the same page', () => {
    assert.isTrue(isSamePage('/x', `${location.origin}/x`));
  });

  it('returns true when only the query order differs', () => {
    assert.isTrue(isSamePage('/x?a=1&b=2', '/x?b=2&a=1'));
  });

  it('returns true when only a trailing slash or index.html differs', () => {
    assert.isTrue(isSamePage('/x', '/x/'));
    assert.isTrue(isSamePage('/x', '/x/index.html'));
  });

  it('returns true when only a non-route fragment differs', () => {
    assert.isTrue(isSamePage('/x#a', '/x#b'));
  });

  it('returns false for different paths', () => {
    assert.isFalse(isSamePage('/x', '/y'));
  });

  it('returns false for different query values', () => {
    assert.isFalse(isSamePage('/x?edit=1', '/x?edit=2'));
  });

  it('returns true for the same hash route', () => {
    assert.isTrue(isSamePage('/app#/users', '/app#!/users/'));
  });

  it('returns false for different hash routes', () => {
    assert.isFalse(isSamePage('/app#/users', '/app#/settings'));
  });

  it('ignores the hash route when only one href has one', () => {
    assert.isTrue(isSamePage('/app#/users', '/app'));
    assert.isTrue(isSamePage('/app#section', '/app#/users'));
  });

  it('returns false when either href does not lead to a page', () => {
    assert.isFalse(isSamePage('#section', '#section'));
    assert.isFalse(isSamePage('/x', 'javascript:void(0)'));
  });
});

describe('axe.utils.getStandards', function () {
  it('returns the standards object', function () {
    let standards = axe.utils.getStandards();
    assert.hasAnyKeys(standards, [
      'ariaAttrs',
      'ariaRoles',
      'htmlElms',
      'cssColors'
    ]);
  });
});

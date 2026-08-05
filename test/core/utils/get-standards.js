describe('axe.utils.getStandards', () => {
  it('returns the standards object', () => {
    const standards = axe.utils.getStandards();
    assert.hasAnyKeys(standards, [
      'ariaAttrs',
      'ariaRoles',
      'htmlElms',
      'cssColors'
    ]);
  });
});

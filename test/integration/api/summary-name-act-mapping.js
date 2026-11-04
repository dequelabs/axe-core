describe('summary-name ACT mapping', () => {
  it('exposes ACT 2t702h through the public rule metadata', () => {
    const rule = axe.getRules().find(({ ruleId }) => ruleId === 'summary-name');

    assert.exists(rule);
    assert.include(rule.actIds, '2t702h');
  });
});

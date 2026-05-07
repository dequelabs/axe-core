describe('axe.utils.getRule', () => {
  beforeEach(() => {
    axe._load({
      rules: [
        {
          id: 'rule1'
        },
        {
          id: 'rule2'
        }
      ]
    });
  });

  it('should return the rule by the id', () => {
    const rule = axe.utils.getRule('rule1');
    assert.isTrue(rule.id === 'rule1');
  });

  it("should throw error if the rule doesn't exist", () => {
    assert.throws(() => {
      axe.utils.getRule('no-id');
    });
  });
});

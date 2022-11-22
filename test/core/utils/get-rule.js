describe('axe.utils.getRule', function () {
  beforeEach(function () {
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

  it('should return the rule by the id', function () {
    var rule = axe.utils.getRule('rule1');
    assert.isTrue(rule.id === 'rule1');
  });

  it("should throw error if the rule doesn't exist", function () {
    assert.throws(function () {
      axe.utils.getRule('no-id');
    });
  });
});

describe('link-in-text-block-matches', () => {
  const rule = axe.utils.getRule('definition-list');
  const { queryFixture } = axe.testUtils;

  it('should return true if element does not have a role attribute', () => {
    const vNode = queryFixture('<div id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return true if element has an empty role attribute', () => {
    const vNode = queryFixture('<div role="" id="target"></div>');
    assert.isTrue(rule.matches(null, vNode));
  });

  it('should return false if element has a role attribute', () => {
    const vNode = queryFixture('<div role="button" id="target"></div>');
    assert.isFalse(rule.matches(null, vNode));
  });
});

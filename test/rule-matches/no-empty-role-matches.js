describe('no-role-empty-matches', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-roles');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns false when element does not have `role` attribute', () => {
    const vNode = queryFixture('<div id="target">Some Content</div>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute has no value', () => {
    const vNode = queryFixture('<div role id="target">Some Content</div>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has empty role attribute', () => {
    const vNode = queryFixture('<div role="" id="target">Some Content</div>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false when element has role attribute consisting of only whitespace', () => {
    const vNode = queryFixture('<div role=" " id="target">Some Content</div>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when element has role attribute', () => {
    const vNode = queryFixture(
      '<div role="button" id="target">Some Content</div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has multiple roles', () => {
    const vNode = queryFixture(
      '<div role="button link" id="target">Some Content</div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has invalid role', () => {
    const vNode = queryFixture(
      '<div role="xyz" id="target">Some Content</div>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });
});

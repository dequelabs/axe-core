describe('button-name-matches', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('button-name');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns true for a normal button', () => {
    const vNode = queryFixture('<button id="target"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false for a select button', () => {
    const vNode = queryFixture(
      '<select><button id="target"><selectedcontent></selectedcontent></button><option>a</option></select>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns true when element has an explicit role that requires an accessible name', () => {
    const vNode = queryFixture('<button id="target" role="button"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false when element has a role that does not require an accessible name and is not focusable', () => {
    const vNode = queryFixture(
      '<button id="target" role="separator" disabled></button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });
});

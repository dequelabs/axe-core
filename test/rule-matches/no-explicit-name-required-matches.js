describe('no-explicit-name-matches', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('button-name');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('returns true when element does not have `role` attribute', () => {
    const vNode = queryFixture('<button id="target"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of presentation', () => {
    const vNode = queryFixture(
      '<button id="target" role="presentation"></button>'
    );
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role of none', () => {
    const vNode = queryFixture('<button id="target" role="none"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an invalid explicit role', () => {
    const vNode = queryFixture('<button id="target" role="foo"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns true when element has an explicit role that requires an accessible name', () => {
    const vNode = queryFixture('<button id="target" role="button"></button>');
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  describe('with a role that does not require an accessible name', () => {
    it('returns true when element is focusable', () => {
      const vNode = queryFixture(
        '<button id="target" role="separator"></button>'
      );
      const actual = rule.matches(vNode.actualNode, vNode);
      assert.isTrue(actual);
    });

    it('returns false when element is not focusable', () => {
      const vNode = queryFixture(
        '<button id="target" role="separator" disabled></button>'
      );
      const actual = rule.matches(vNode.actualNode, vNode);
      assert.isFalse(actual);
    });
  });
});

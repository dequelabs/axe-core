describe('avoid-inline-spacing-matches', () => {
  const html = axe.testUtils.html;
  const queryFixture = axe.testUtils.queryFixture;
  const queryShadowFixture = axe.testUtils.queryShadowFixture;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('avoid-inline-spacing');
  });

  it('returns true for a visible element with text', () => {
    const vNode = queryFixture(
      '<p id="target" style="letter-spacing: 0.1em !important">Hello</p>'
    );
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false for an empty element', () => {
    const vNode = queryFixture(
      '<div id="target" style="letter-spacing: 0.1em !important"></div>'
    );
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false for an element whose text is only in its descendants', () => {
    const vNode = queryFixture(html`
      <div id="target" style="letter-spacing: 0.1em !important">
        <p style="letter-spacing: 0.2em !important">Hello</p>
      </div>
    `);
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false for a hidden element with text', () => {
    const vNode = queryFixture(
      '<p id="target" style="display: none; letter-spacing: 0.1em !important">Hello</p>'
    );
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true for an element with text in shadow DOM', () => {
    const vNode = queryShadowFixture(
      '<div id="shadow"></div>',
      '<p id="target" style="letter-spacing: 0.1em !important">Hello</p>'
    );
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });
});

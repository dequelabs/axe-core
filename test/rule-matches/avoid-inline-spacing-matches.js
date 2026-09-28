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

  it('returns false when every descendant with text overrides its spacing', () => {
    const vNode = queryFixture(html`
      <div id="target" style="letter-spacing: 0.1em !important">
        <p style="letter-spacing: 0.2em !important">Hello</p>
      </div>
    `);
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true for an element whose descendants inherit its spacing', () => {
    const vNode = queryFixture(html`
      <div id="target" style="word-spacing: 0.1em !important">
        <p>Hello</p>
      </div>
    `);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true when a descendant overrides only some of its properties', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        style="letter-spacing: 0.1em !important; word-spacing: 0.1em !important"
      >
        <p style="letter-spacing: 0.2em !important">Hello</p>
      </div>
    `);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true when one descendant overrides its spacing and another does not', () => {
    const vNode = queryFixture(html`
      <div id="target" style="letter-spacing: 0.1em !important">
        <p style="letter-spacing: 0.2em !important">Hello</p>
        <p>World</p>
      </div>
    `);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true when the spacing is overridden by different descendants', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        style="letter-spacing: 0.1em !important; word-spacing: 0.1em !important"
      >
        <p style="letter-spacing: 0.2em !important">
          <span>Hello</span>
        </p>
      </div>
    `);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false when descendants together override all its properties', () => {
    const vNode = queryFixture(html`
      <div
        id="target"
        style="letter-spacing: 0.1em !important; word-spacing: 0.1em !important"
      >
        <p style="letter-spacing: 0.2em !important">
          <span style="word-spacing: 0.2em !important">Hello</span>
        </p>
      </div>
    `);
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true for an element without spacing whose descendants have text', () => {
    const vNode = queryFixture(html`
      <div id="target" style="color: red">
        <p style="color: blue">Hello</p>
      </div>
    `);
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false when the text is in a hidden descendant', () => {
    const vNode = queryFixture(html`
      <div id="target" style="letter-spacing: 0.1em !important">
        <p style="display: none">Hello</p>
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

  it('returns true for an element with text in the shadow DOM of a descendant', () => {
    const vNode = queryShadowFixture(
      '<div id="target" style="letter-spacing: 0.1em !important"><div id="shadow"></div></div>',
      '<p>Hello</p>'
    );
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true for an element with text in shadow DOM', () => {
    const vNode = queryShadowFixture(
      '<div id="shadow"></div>',
      '<p id="target" style="letter-spacing: 0.1em !important">Hello</p>'
    );
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });
});

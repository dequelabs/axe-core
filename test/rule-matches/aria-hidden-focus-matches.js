describe('aria-hidden-focus-matches', () => {
  const html = axe.testUtils.html;

  let rule;
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(() => {
    rule = axe.utils.getRule('aria-hidden-focus');
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('returns true if no parent has aria-hidden', () => {
    const vNode = queryFixture(html` <div id="target"></div> `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isTrue(actual);
  });

  it('returns false if a parent has aria-hidden', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div id="target" aria-hidden="true"></div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if an ancestor has aria-hidden', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div>
          <div id="target" aria-hidden="true"></div>
        </div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if an ancestor has aria-hidden but the node itself does not', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div aria-hidden="true">
          <button id="target">btn</button>
        </div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });

  it('returns false if a custom element ancestor has internals aria-hidden', () => {
    const vNode = queryFixture(html`
      <testutils-element with-aria-hidden="true">
        <div aria-hidden="true">
          <button id="target">btn</button>
        </div>
      </testutils-element>
    `);
    const actual = rule.matches(vNode.actualNode, vNode);
    assert.isFalse(actual);
  });
});

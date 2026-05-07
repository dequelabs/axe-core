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

  it('return true when there is no parent with aria-hidden', () => {
    const vNode = queryFixture(html` <div id="target"></div> `);
    const actual = rule.matches(vNode.actualNode);
    assert.isTrue(actual);
  });

  it('return false when has a parent element with aria-hidden', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div id="target" aria-hidden="true"></div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div>
          <div id="target" aria-hidden="true"></div>
        </div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });

  it('return false when has any parent element with aria-hidden', () => {
    const vNode = queryFixture(html`
      <div aria-hidden="true">
        <div aria-hidden="true">
          <button id="target">btn</button>
        </div>
      </div>
    `);
    const actual = rule.matches(vNode.actualNode);
    assert.isFalse(actual);
  });
});

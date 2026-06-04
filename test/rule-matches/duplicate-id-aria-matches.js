describe('duplicate-id-aria matches', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const fixtureSetup = axe.testUtils.fixtureSetup;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('duplicate-id-aria');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('is a function', () => {
    assert.isFunction(rule.matches);
  });

  it('returns false if the ID is of an inactive non-referenced element', () => {
    fixtureSetup('<div id="foo"></div>');
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false if the ID is of an inactive non-referenced element with a duplicate', () => {
    fixtureSetup('<div id="foo"></div><span id="foo"></span>');
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false if the ID is of an active non-referenced element', () => {
    fixtureSetup('<button id="foo"></button>');
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'button[id=foo]')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns false if the ID is a duplicate of an active non-referenced element', () => {
    fixtureSetup(html`
      <div id="foo"></div>
      <button id="foo"></button>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
    assert.isFalse(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true if the ID is of an inactive ARIA referenced element', () => {
    fixtureSetup(html`
      <div id="foo"></div>
      <div aria-labelledby="foo"></div>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'div[id=foo]')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true if the ID is a duplicate of an inactive ARIA referenced element', () => {
    fixtureSetup(html`
      <div id="foo"></div>
      <div aria-labelledby="foo"></div>
      <span id="foo"></span>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true if the ID is of an active ARIA referenced element', () => {
    fixtureSetup(html`
      <button id="foo"></button>
      <div aria-labelledby="foo"></div>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'button[id=foo]')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });

  it('returns true if the ID is a duplicate of of an active ARIA referenced element', () => {
    fixtureSetup(html`
      <button id="foo"></button>
      <div aria-labelledby="foo"></div>
      <span id="foo"></span>
    `);
    const vNode = axe.utils.querySelectorAll(axe._tree[0], 'span[id=foo]')[0];
    assert.isTrue(rule.matches(vNode.actualNode, vNode));
  });
});

describe('dom.getTabbableElements', () => {
  const html = axe.testUtils.html;

  const queryFixture = axe.testUtils.queryFixture;
  const injectIntoFixture = axe.testUtils.injectIntoFixture;
  const getTabbableElementsFn = axe.commons.dom.getTabbableElements;

  it('returns tabbable elms when node contains tabbable element', () => {
    const virtualNode = queryFixture(html`
      <div id="target">
        <label
          >Enter description:
          <textarea></textarea>
        </label>
      </div>
    `);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 1);
    assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'TEXTAREA');
  });

  it('returns empty [] when element does not contains tabbable element (using tabindex to take element out of tab-order)', () => {
    const virtualNode = queryFixture(html`
      <div id="target">
        <input tabindex="-1" />
      </div>
    `);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns empty [] when element contains disabled (tabbable) element', () => {
    const virtualNode = queryFixture(html`
      <div id="target">
        <button disabled>Submit Me</button>
      </div>
    `);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns empty [] when element does not contain tabbable element', () => {
    const virtualNode = queryFixture(html`
      <div id="target">
        <p>Some text</p>
      </div>
    `);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns tabbable elms when element contains tabbable element inside shadowDOM', () => {
    const fixture = injectIntoFixture('<div id="target"></div>`');
    const node = fixture.querySelector('#target');
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button>btn</button>';
    // re build tree after shadowDOM is constructed
    axe.setup(fixture);
    const virtualNode = axe.utils.getNodeFromTree(node);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 1);
    assert.equal(actual[0].actualNode.nodeName.toUpperCase(), 'BUTTON');
  });

  it('returns empty [] when element contains disabled (tabbable) element inside shadowDOM', () => {
    const fixture = injectIntoFixture('<div id="target"></div>`');
    const node = fixture.querySelector('#target');
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<button disabled>btn</button>';
    // re build tree after shadowDOM is constructed
    axe.setup(fixture);
    const virtualNode = axe.utils.getNodeFromTree(node);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });

  it('returns empty [] when element does not contain tabbable element inside shadowDOM', () => {
    const fixture = injectIntoFixture('<div id="target"></div>`');
    const node = fixture.querySelector('#target');
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<p>I am not tabbable</p>';
    // re build tree after shadowDOM is constructed
    axe.setup(fixture);
    const virtualNode = axe.utils.getNodeFromTree(node);
    const actual = getTabbableElementsFn(virtualNode);
    assert.lengthOf(actual, 0);
  });
});

describe('aria.arialabelledbyText', () => {
  const html = axe.testUtils.html;
  const aria = axe.commons.aria;
  const queryFixture = axe.testUtils.queryFixture;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const fixture = axe.testUtils.fixture;

  it('returns the accessible name of the aria-labelledby references', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  it('works with virtual nodes', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  it('returns references in order', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="bar baz foo"></div>
      <div id="foo">Foo</div>
      <div id="bar">Bar</div>
      <div id="baz">Baz</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Bar Baz Foo');
  });

  it('returns "" if the node is not an element', () => {
    const target = queryFixture('<div id="target">foo</div>');
    const accName = aria.arialabelledbyText(target.actualNode.firstChild);
    assert.equal(accName, '');
  });

  it('returns "" with context.inLabelledByContext: true', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target, {
      inLabelledByContext: true
    });
    assert.equal(accName, '');
  });

  it('returns "" with context.inControlContext: true', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target, {
      inControlContext: true
    });
    assert.equal(accName, '');
  });

  it('returns content of a aria-hidden reference', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo" aria-hidden="true">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  it('returns content of a `display:none` reference', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo" style="display:none">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  it('returns does not return hidden content of a visible reference', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo"><div style="display:none">Foo text</div></div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, '');
  });

  it('does not follow more than one aria-labelledy reference', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo"><div aria-labelledby="bar" role="heading"></div></div>
      <div id="bar">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target, {
      inControlContext: true
    });
    assert.equal(accName, '');
  });

  it('preserves spacing', () => {
    const spaced = ' \t Foo \n text \t ';
    const target = queryFixture(
      html`<div role="heading" id="target" aria-labelledby="foo"></div>
        <div id="foo">${spaced}</div>`
    );
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, spaced);
  });

  it('returns the accessible name via elementInternals aria-labelledby', () => {
    const target = queryFixture(html`
      <span id="foo-label">Foo text</span>
      <testutils-element
        id="target"
        with-aria-labelledby="foo-label"
      ></testutils-element>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  // ariaLabelledByElements (reflected AOM property) coverage adapted from
  // @jcfranco's work in #5187 (issue #4943)
  it('returns the accessible name from ariaLabelledByElements when aria-labelledby is unset', () => {
    const target = queryFixture(html`
      <div role="heading" id="target"></div>
      <div id="foo">Foo text</div>
    `);
    target.actualNode.ariaLabelledByElements = [
      target.actualNode.nextElementSibling
    ];
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Foo text');
  });

  it('prefers ariaLabelledByElements over aria-labelledby', () => {
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
      <div id="bar">Bar text</div>
    `);
    target.actualNode.ariaLabelledByElements = [
      target.actualNode.nextElementSibling.nextElementSibling
    ];
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Bar text');
  });

  it('prefers ariaLabelledByElements over aria-labelledby and aria-label', () => {
    const target = queryFixture(html`
      <div
        role="heading"
        id="target"
        aria-labelledby="foo"
        aria-label="Baz text"
      ></div>
      <div id="foo">Foo text</div>
      <div id="bar">Bar text</div>
    `);
    target.actualNode.ariaLabelledByElements = [
      target.actualNode.nextElementSibling.nextElementSibling
    ];
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, 'Bar text');
  });

  it('does not throw when aria-labelledby references a slot in shadow DOM', () => {
    // The slot is not tracked in the virtual tree; resolving the reference
    // previously threw "Cannot read properties of undefined (reading 'props')".
    const target = axe.testUtils.queryShadowFixture(
      '<div id="shadow"></div>',
      '<section id="target" aria-labelledby="foo"></section><slot id="foo"></slot>'
    );
    assert.equal(aria.arialabelledbyText(target), '');
  });

  it('returns "" when ElementInternals references a node in a closed shadow root', () => {
    // A custom element labels itself, via ElementInternals, with an element in
    // its own closed shadow root. The referenced node is outside the virtual
    // tree, so it resolves to nothing.
    const target = document.createElement('testutils-element');
    target.id = 'target';
    const shadowRoot = target.attachShadow({ mode: 'closed' });
    shadowRoot.innerHTML = '<span>Foo text</span>';

    fixtureSetup(target);
    target._internals.ariaLabelledByElements = [shadowRoot.firstElementChild];

    const vNode = axe.utils.getNodeFromTree(target);
    assert.equal(aria.arialabelledbyText(vNode), '');
  });

  it('returns "" when ariaLabelledByElements references a node outside the virtual tree', () => {
    const target = queryFixture('<div role="heading" id="target"></div>');
    const outOfTree = document.createElement('div');
    outOfTree.textContent = 'Foo text';
    // Appended after axe.setup, so the node is never part of the virtual tree.
    fixture.appendChild(outOfTree);
    target.actualNode.ariaLabelledByElements = [outOfTree];

    assert.equal(aria.arialabelledbyText(target), '');
  });
});

describe('aria.getOwnedVirtual', () => {
  const html = axe.testUtils.html;
  const aria = axe.commons.aria;
  const fixtureSetup = axe.testUtils.fixtureSetup;

  it('returns a list of children in order', () => {
    fixtureSetup(html`
      <div id="target">
        <h1>heading 1</h1>
        <h2>heading 2</h2>
        <h3>heading 3</h3>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('adds aria-owned reffed elements to the children', () => {
    fixtureSetup(html`
      <div id="target" aria-owns="hdr3 hdr4">
        <h1>heading 1</h1>
        <h2>heading 2</h2>
      </div>
      <h4 id="hdr4">heading 4</h4>
      <h3 id="hdr3">heading 3</h3>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 4);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
    assert.equal(owned[3].actualNode.nodeName.toUpperCase(), 'H4');
  });

  it('does not return duplicate when child is also aria-owned', () => {
    fixtureSetup(html`
      <div role="tablist" id="target" aria-owns="foo">
        <div id="foo" role="menuitem">foo</div>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 1);
    assert.equal(owned[0].actualNode.id, 'foo');
  });

  it('does not return duplicate when same ID appears multiple times in aria-owns', () => {
    fixtureSetup(html`
      <div role="list" id="target" aria-owns="a b a"></div>
      <div role="listitem" id="a">A</div>
      <div role="listitem" id="b">B</div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 2);
    assert.equal(owned[0].actualNode.id, 'a');
    assert.equal(owned[1].actualNode.id, 'b');
  });

  it('moves aria-owned child to the end', () => {
    fixtureSetup(html`
      <div role="list" id="target" aria-owns="a">
        <div role="listitem" id="a">A</div>
        <div role="listitem" id="b">B</div>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 2);
    assert.equal(owned[0].actualNode.id, 'b');
    assert.equal(owned[1].actualNode.id, 'a');
  });

  it('moves multiple aria-owned children to the end in aria-owns order', () => {
    fixtureSetup(html`
      <div role="list" id="target" aria-owns="c a">
        <div role="listitem" id="a">A</div>
        <div role="listitem" id="b">B</div>
        <div role="listitem" id="c">C</div>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.id, 'b');
    assert.equal(owned[1].actualNode.id, 'c');
    assert.equal(owned[2].actualNode.id, 'a');
  });

  it('ignores whitespace-only aria-owned', () => {
    fixtureSetup(html`
      <div id="target" aria-owns="  ">
        <h1>heading 1</h1>
        <h2>heading 2</h2>
        <h3>heading 3</h3>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('ignores broken aria-owned refs', () => {
    fixtureSetup(html`
      <div id="target" aria-owns="nonexisting reference">
        <h1>heading 1</h1>
        <h2>heading 2</h2>
        <h3>heading 3</h3>
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria
      .getOwnedVirtual(target)
      .filter(({ props }) => props.nodeType === 1);
    assert.lengthOf(owned, 3);
    assert.equal(owned[0].actualNode.nodeName.toUpperCase(), 'H1');
    assert.equal(owned[1].actualNode.nodeName.toUpperCase(), 'H2');
    assert.equal(owned[2].actualNode.nodeName.toUpperCase(), 'H3');
  });

  it('includes text nodes', () => {
    fixtureSetup(html`
      <div id="target" aria-owns="nonexisting reference">
        text 1
        <h1>heading 1</h1>
        text 2
        <h2>heading 2</h2>
        ${' \t\n'}
      </div>
    `);
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria.getOwnedVirtual(target);

    assert.lengthOf(owned, 5);
    assert.include(owned[0].actualNode.textContent, 'text 1');
    assert.include(owned[1].actualNode.textContent, 'heading 1');
    assert.include(owned[2].actualNode.textContent, 'text 2');
    assert.include(owned[3].actualNode.textContent, 'heading 2');
    assert.include(owned[4].actualNode.textContent, ' \t\n');
  });

  it('returns an empty array if there are no owned elements', () => {
    fixtureSetup('<div id="target" aria-owns="nonexisting reference"></div>');
    const target = axe.utils.querySelectorAll(axe._tree[0], '#target')[0];
    const owned = aria.getOwnedVirtual(target);
    assert.lengthOf(owned, 0);
  });
});

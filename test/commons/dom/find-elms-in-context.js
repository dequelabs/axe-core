describe('dom.findElmsInContext', () => {
  const html = axe.testUtils.html;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const findElmsInContext = axe.commons.dom.findElmsInContext;

  it('returns an array or elements in the same context', () => {
    const rootNode = fixtureSetup(html`
      <b name="foo">1</b>
      <b name="foo">2</b>
      <b name="bar">3</b>
      <i name="foo">4</i>
    `);

    assert.deepEqual(
      findElmsInContext({
        elm: 'b',
        attr: 'name',
        value: 'foo',
        context: rootNode.actualNode
      }),
      Array.from(document.querySelectorAll('b[name=foo]'))
    );
  });

  it('ignores elements inside shadow tree', () => {
    const node = document.createElement('div');
    node.innerHTML = '<b name="foo">1</b>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<b name="foo">2</b> <slot></slot>';
    const rootNode = fixtureSetup(node);

    const result = findElmsInContext({
      elm: 'b',
      attr: 'name',
      value: 'foo',
      context: rootNode.actualNode
    });
    assert.lengthOf(result, 1);
    assert.equal(result[0].innerText, '1');
  });

  it('can search elements limited to the shadow tree', () => {
    const node = document.createElement('div');
    node.innerHTML = '<b name="foo">1</b>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<b name="foo">2</b><slot></slot>';
    fixtureSetup(node);

    const result = findElmsInContext({
      elm: 'b',
      attr: 'name',
      value: 'foo',
      context: shadow
    });

    assert.lengthOf(result, 1);
    assert.equal(result[0].innerText, '2');
  });
});

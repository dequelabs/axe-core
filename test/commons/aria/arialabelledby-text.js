describe('aria.arialabelledbyText', () => {
  const html = axe.testUtils.html;
  const aria = axe.commons.aria;
  const queryFixture = axe.testUtils.queryFixture;

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
    const target = queryFixture(html`
      <div role="heading" id="target" aria-labelledby="foo"></div>
      <div id="foo">Foo text</div>
    `);
    const accName = aria.arialabelledbyText(target);
    assert.equal(accName, ' \t Foo \n text \t ');
  });
});

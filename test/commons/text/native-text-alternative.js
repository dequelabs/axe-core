describe('text.nativeTextAlternative', () => {
  const text = axe.commons.text;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const queryFixture = axe.testUtils.queryFixture;
  const nativeTextAlternative = text.nativeTextAlternative;

  it('runs accessible text methods specified for the native element', () => {
    const vNode = queryFixture('<button id="target">foo</button>');
    assert.equal(nativeTextAlternative(vNode), 'foo');
  });

  it('returns the accessible text of the first method that returns something', () => {
    const vNode = queryFixture(
      '<input id="target" type="image" alt="foo" value="bar" title="baz">'
    );
    assert.equal(nativeTextAlternative(vNode), 'foo');
  });

  it('returns `` when no method matches', () => {
    const vNode = queryFixture('<div id="target">baz</div>');
    assert.equal(nativeTextAlternative(vNode), '');
  });

  it('returns `` when no accessible text method returned something', () => {
    const div = queryFixture('<div id="target">baz</div>');
    assert.equal(nativeTextAlternative(div), '');
  });

  it('returns `` when the node is not an element', () => {
    fixtureSetup('foo bar baz');
    const fixture = axe.utils.querySelectorAll(axe._tree[0], '#fixture')[0];
    assert.equal(fixture.children[0].actualNode.nodeType, 3);
    assert.equal(nativeTextAlternative(fixture.children[0]), '');
  });

  it('returns `` when the element has role=presentation', () => {
    const vNode = queryFixture(
      '<img id="target" alt="foo" role="presentation" />'
    );
    assert.equal(nativeTextAlternative(vNode), '');
  });

  it('returns `` when the element has role=none', () => {
    const vNode = queryFixture('<img id="target" alt="foo" role="none" />');
    assert.equal(nativeTextAlternative(vNode), '');
  });
});

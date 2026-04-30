describe('fallbackrole', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if fallback role is used', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="button foobar">Foo</div>'
    );
    assert.isTrue(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if fallback role is not used', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="button">Foo</div>'
    );
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if applied to an invalid role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="foobar">Foo</div>'
    );
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if applied to an invalid role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="foobar">Foo</div>'
    );
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return undefined/needs review if an element with no implicit role uses both none and presentation', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="none presentation">Foo</div>'
    );
    assert.isUndefined(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return undefined/needs review if an element with no implicit role uses both presentation and none', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="presentation none">Foo</div>'
    );
    assert.isUndefined(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return true if an element with an implicit role uses both presentation and none', () => {
    const virtualNode = queryFixture(
      '<input type="text" id="target" role="presentation none"/>'
    );
    assert.isTrue(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });
});

describe('invalidrole', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const checkContext = axe.testUtils.MockCheckContext();

  afterEach(() => {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if applied to an empty role', () => {
    const virtualNode = queryFixture('<div id="target" role="">Contents</div>');
    assert.isTrue(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['']);
  });

  it('should return true if applied to a nonsensical role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="foo">Contents</div>'
    );
    assert.isTrue(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['foo']);
  });

  it('should return false if applied to a concrete role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="alert">Contents</div>'
    );
    assert.isFalse(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return false if applied to an abstract role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="widget">Contents</div>'
    );
    assert.isFalse(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return false if applied to multiple valid roles', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="alert button">Contents</div>'
    );
    assert.isFalse(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return false if atleast one role is valid', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="alert button foo bar">Contents</div>'
    );
    assert.isFalse(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
  });

  it('should return true if all roles are invalid', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="foo bar">Contents</div>'
    );
    assert.isTrue(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['foo', 'bar']);
  });

  it('should return true if applied to an uppercase nonsensical role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="FOO">Contents</div>'
    );
    assert.isTrue(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['FOO']);
  });

  it('should return false if applied to an uppercase valid role', () => {
    const virtualNode = queryFixture(
      '<div id="target" role="BUTTON">Contents</div>'
    );
    assert.isFalse(
      checks.invalidrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        null,
        virtualNode
      )
    );
  });
});

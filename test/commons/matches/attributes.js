describe('matches.attributes', () => {
  const attributes = axe.commons.matches.attributes;
  const fixture = document.querySelector('#fixture');
  const queryFixture = axe.testUtils.queryFixture;

  beforeEach(() => {
    fixture.innerHTML = '';
  });

  it('returns true if all attributes match', () => {
    const virtualNode = queryFixture(
      '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
    );
    assert.isTrue(
      attributes(virtualNode, {
        foo: 'baz',
        bar: 'foo',
        baz: 'bar'
      })
    );
  });

  it('returns false if some attributes do not match', () => {
    const virtualNode = queryFixture(
      '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
    );
    assert.isFalse(
      attributes(virtualNode, {
        foo: 'baz',
        bar: 'foo',
        baz: 'baz'
      })
    );
  });

  it('returns false if any attributes are missing', () => {
    const virtualNode = queryFixture(
      '<span id="target" foo="baz" baz="bar"></span>'
    );
    assert.isFalse(
      attributes(virtualNode, {
        foo: 'baz',
        bar: 'foo',
        baz: 'bar'
      })
    );
  });

  it('works with actual nodes', () => {
    const virtualNode = queryFixture(
      '<span id="target" foo="baz" bar="foo" baz="bar"></span>'
    );
    assert.isTrue(
      attributes(virtualNode.actualNode, {
        foo: 'baz',
        bar: 'foo',
        baz: 'bar'
      })
    );
  });

  it('works with SerialVirtualNode', () => {
    const serialNode = new axe.SerialVirtualNode({
      nodeName: 'span',
      attributes: {
        id: 'target',
        foo: 'baz',
        bar: 'foo',
        baz: 'bar'
      }
    });
    assert.isTrue(
      attributes(serialNode, {
        foo: 'baz',
        bar: 'foo',
        baz: 'bar'
      })
    );
  });
});

describe('matches.attributes', function () {
  var attributes = axe.commons.matches.attributes;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('returns true if all attributes match', function () {
    var virtualNode = queryFixture(
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

  it('returns false if some attributes do not match', function () {
    var virtualNode = queryFixture(
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

  it('returns false if any attributes are missing', function () {
    var virtualNode = queryFixture(
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

  it('works with actual nodes', function () {
    var virtualNode = queryFixture(
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

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
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

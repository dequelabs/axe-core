describe('matches.accessibleName', function () {
  var hasAccessibleName = axe.commons.matches.hasAccessibleName;
  var fixture = document.querySelector('#fixture');
  var queryFixture = axe.testUtils.queryFixture;

  beforeEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true when text has an accessible name', function () {
    var virtualNode = queryFixture('<button id="target">hello world</button>');
    assert.isTrue(hasAccessibleName(virtualNode, true));
  });

  it('should return true when aria-label has an accessible name', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-label="hello world"></button>'
    );
    assert.isTrue(hasAccessibleName(virtualNode, true));
  });

  it('should return true when aria-labelledby has an accessible name', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-labelledby="foo"></button><div id="foo">hello world</div'
    );
    assert.isTrue(hasAccessibleName(virtualNode, true));
  });

  it('should return true when title has an accessible name', function () {
    var virtualNode = queryFixture(
      '<button id="target" title="hello world"></button>'
    );
    assert.isTrue(hasAccessibleName(virtualNode, true));
  });

  it('should return true when label has an accessible name', function () {
    var virtualNode = queryFixture(
      '<label>hello world<input id="target"></label>'
    );
    assert.isTrue(hasAccessibleName(virtualNode, true));
  });

  it('should return false when text does not have an accessible name', function () {
    var virtualNode = queryFixture('<button id="target"></button>');
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when aria-label does not have an accessible name', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-label=""></button>'
    );
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when aria-labelledby does not have an accessible name', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-labelledby=""></button><div id="foo">hello world</div'
    );
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when aria-labelledby references an element that does not exist', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-labelledby="bar"></button><div id="foo">hello world</div'
    );
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when aria-labelledby references an elm that does not exist', function () {
    var virtualNode = queryFixture(
      '<button id="target" aria-labelledby="bar"></button><div id="foo">hello world</div'
    );
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when title does not have an accessible name', function () {
    var virtualNode = queryFixture('<button id="target" title=""></button>');
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('should return false when label does not have an accessible name', function () {
    var virtualNode = queryFixture('<label><input id="target"></label>');
    assert.isFalse(hasAccessibleName(virtualNode, true));
  });

  it('works with SerialVirtualNode', function () {
    var serialNode = new axe.SerialVirtualNode({
      nodeName: 'button',
      attributes: {
        role: 'button',
        'aria-label': 'hello world'
      }
    });
    assert.isTrue(hasAccessibleName(serialNode, true));
  });
});

describe('invalidrole', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return true if applied to an empty role', function () {
    var virtualNode = queryFixture('<div id="target" role="">Contents</div>');
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

  it('should return true if applied to a nonsensical role', function () {
    var virtualNode = queryFixture(
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

  it('should return false if applied to a concrete role', function () {
    var virtualNode = queryFixture(
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

  it('should return false if applied to an abstract role', function () {
    var virtualNode = queryFixture(
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

  it('should return false if applied to multiple valid roles', function () {
    var virtualNode = queryFixture(
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

  it('should return false if atleast one role is valid', function () {
    var virtualNode = queryFixture(
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

  it('should return true if all roles are invalid', function () {
    var virtualNode = queryFixture(
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
});

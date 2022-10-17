describe('abstractrole', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('should return false if applied to a concrete role', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="alert">Contents</div>'
    );
    assert.isFalse(
      checks.abstractrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        'radio',
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return false if applied to a nonsensical role', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="foo">Contents</div>'
    );
    assert.isFalse(
      checks.abstractrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        'radio',
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return true if applied to an abstract role', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="widget">Contents</div>'
    );
    assert.isTrue(
      checks.abstractrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        'radio',
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['widget']);
  });

  it('should return false if applied to multiple concrete roles', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="alert button">Contents</div>'
    );
    assert.isFalse(
      checks.abstractrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        'radio',
        virtualNode
      )
    );
    assert.isNull(checkContext._data);
  });

  it('should return true if applied to at least one abstract role', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="alert widget structure">Contents</div>'
    );
    assert.isTrue(
      checks.abstractrole.evaluate.call(
        checkContext,
        virtualNode.actualNode,
        'radio',
        virtualNode
      )
    );
    assert.deepEqual(checkContext._data, ['widget', 'structure']);
  });
});

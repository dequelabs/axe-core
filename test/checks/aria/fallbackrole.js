describe('fallbackrole', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return true if fallback role is used', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="button foobar">Foo</div>'
    );
    assert.isTrue(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if fallback role is not used', function () {
    var virtualNode = queryFixture('<div id="target" role="button">Foo</div>');
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if applied to an invalid role', function () {
    var virtualNode = queryFixture('<div id="target" role="foobar">Foo</div>');
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return false if applied to an invalid role', function () {
    var virtualNode = queryFixture('<div id="target" role="foobar">Foo</div>');
    assert.isFalse(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return undefined/needs review if an element with no implicit role uses both none and presentation', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="none presentation">Foo</div>'
    );
    assert.isUndefined(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return undefined/needs review if an element with no implicit role uses both presentation and none', function () {
    var virtualNode = queryFixture(
      '<div id="target" role="presentation none">Foo</div>'
    );
    assert.isUndefined(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });

  it('should return true if an element with an implicit role uses both presentation and none', function () {
    var virtualNode = queryFixture(
      '<input type="text" id="target" role="presentation none"/>'
    );
    assert.isTrue(
      checks.fallbackrole.evaluate(virtualNode.actualNode, null, virtualNode)
    );
  });
});

describe('unsupportedrole', function() {
  'use strict';

  var queryFixture = axe.testUtils.queryFixture;

  it('should return true if applied to an unsupported role', function() {
    axe.configure({
      standards: {
        ariaRoles: {
          mccheddarton: {
            type: 'widget',
            unsupported: true
          }
        }
      }
    });

    var vNode = queryFixture(
      '<div id="target" role="mccheddarton">Contents</div>'
    );
    assert.isTrue(checks.unsupportedrole.evaluate(null, null, vNode));
  });

  it('should return false if applied to a supported role', function() {
    var vNode = queryFixture('<div id="target" role="alert">Contents</div>');
    assert.isFalse(checks.unsupportedrole.evaluate(null, null, vNode));

    var vNode = queryFixture('<button id="target">Contents</button>');
    assert.isFalse(checks.unsupportedrole.evaluate(null, null, vNode));
  });

  it('should return false if applied to an invalid role', function() {
    var vNode = queryFixture('<input id="target" role="foo">');
    assert.isFalse(checks.unsupportedrole.evaluate(null, null, vNode));
  });
});

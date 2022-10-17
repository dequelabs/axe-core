describe('unsupportedrole', function () {
  'use strict';

  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var check = checks.unsupportedrole;
  afterEach(function () {
    checkContext.reset();
    axe.reset();
  });

  it('should return true if applied to an unsupported role', function () {
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

    var params = checkSetup(
      '<div id="target" role="mccheddarton">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'mccheddarton');
  });

  it('should return false if applied to a supported role', function () {
    var params = checkSetup('<div id="target" role="alert">Contents</div>');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);

    var params = checkSetup('<button id="target">Contents</button>');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('should return false if applied to an invalid role', function () {
    var params = checkSetup('<input id="target" role="foo">');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('should return true if applied to an unsupported dpub role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          'doc-abstract': {
            type: 'section',
            unsupported: true
          }
        }
      }
    });

    var params = checkSetup(
      '<div id="target" role="doc-abstract">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'doc-abstract');
  });

  it('should return true if applied to an unsupported fallback role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          alert: {
            type: 'widget',
            unsupported: true
          }
        }
      }
    });

    var params = checkSetup(
      '<div id="target" role="unsupported alert">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'alert');
  });
});

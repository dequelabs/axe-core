describe('aria.requiredContext', function () {
  'use strict';

  afterEach(function () {
    axe.reset();
  });

  it('should returned the context property for the proper role', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredContext: ['yes']
          }
        }
      }
    });
    assert.deepEqual(axe.commons.aria.requiredContext('cats'), ['yes']);
  });

  it('should returned null if the required context is not an array', function () {
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredContext: 'yes'
          }
        }
      }
    });
    assert.isNull(axe.commons.aria.requiredContext('cats'));
  });

  it('should return null if there are no required context nodes', function () {
    var result = axe.commons.aria.requiredContext('cats');

    assert.isNull(result);
  });

  it('should return a unique copy of the context', function () {
    var context = ['yes', 'no'];

    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredContext: context
          }
        }
      }
    });

    var result = axe.commons.aria.requiredContext('cats');
    assert.notEqual(result, context);
  });
});

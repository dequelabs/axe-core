describe('aria.requiredContext', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should returned the context property for the proper role', () => {
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

  it('should returned null if the required context is not an array', () => {
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

  it('should return null if there are no required context nodes', () => {
    const result = axe.commons.aria.requiredContext('cats');

    assert.isNull(result);
  });

  it('should return a unique copy of the context', () => {
    const context = ['yes', 'no'];

    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            requiredContext: context
          }
        }
      }
    });

    const result = axe.commons.aria.requiredContext('cats');
    assert.notEqual(result, context);
  });
});

describe('unsupportedrole', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const check = checks.unsupportedrole;
  afterEach(() => {
    checkContext.reset();
    axe.reset();
  });

  it('should return true if applied to an unsupported role', () => {
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

    const params = checkSetup(
      '<div id="target" role="mccheddarton">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'mccheddarton');
  });

  it('should return false if applied to a supported role', () => {
    let params = checkSetup('<div id="target" role="alert">Contents</div>');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);

    params = checkSetup('<button id="target">Contents</button>');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('should return false if applied to an invalid role', () => {
    const params = checkSetup('<input id="target" role="foo">');
    assert.isFalse(check.evaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('should return true if applied to an unsupported dpub role', () => {
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

    const params = checkSetup(
      '<div id="target" role="doc-abstract">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'doc-abstract');
  });

  it('should return true if applied to an unsupported fallback role', () => {
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

    const params = checkSetup(
      '<div id="target" role="unsupported alert">Contents</div>'
    );
    assert.isTrue(check.evaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'alert');
  });
});

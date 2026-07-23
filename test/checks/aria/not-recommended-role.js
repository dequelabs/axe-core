describe('not-recommended-role', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('not-recommended-role');

  afterEach(() => {
    checkContext.reset();
    axe.reset();
  });

  it('returns undefined (needs review) if applied to a not recommended role', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          melon: {
            type: 'widget',
            notRecommended: true
          }
        }
      }
    });
    const params = checkSetup('<div id="target" role="melon">Contents</div>');
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'melon');
  });

  it('returns true if applied to a recommended role', () => {
    let params = checkSetup('<div id="target" role="button">Contents</div>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);

    params = checkSetup('<button id="target">Contents</button>');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('returns true if applied to an invalid role', () => {
    const params = checkSetup('<input id="target" role="foo">');
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('returns undefined for a not recommended role in shadow DOM', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          melon: {
            type: 'widget',
            notRecommended: true
          }
        }
      }
    });
    const params = axe.testUtils.shadowCheckSetup(
      '<div id="shadow"></div>',
      '<div id="target" role="melon">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, 'melon');
  });
});

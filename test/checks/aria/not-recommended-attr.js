describe('not-recommended-attr', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('not-recommended-attr');

  afterEach(() => {
    checkContext.reset();
    axe.reset();
  });

  it('returns undefined (needs review) for a not recommended attribute', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-fizz': {
            type: 'nmtoken',
            notRecommended: true
          }
        }
      }
    });
    const params = checkSetup(
      '<div id="target" aria-fizz="buzz">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-fizz']);
  });

  it('collects multiple not recommended attributes', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-fizz': {
            type: 'nmtoken',
            notRecommended: true
          },
          'aria-buzz': {
            type: 'nmtoken',
            notRecommended: true
          }
        }
      }
    });
    const params = checkSetup(
      '<div id="target" aria-fizz="foo" aria-buzz="bar">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-fizz', 'aria-buzz']);
  });

  it('returns true when no not recommended attributes are used', () => {
    const params = checkSetup(
      '<div id="target" role="button" aria-label="foo">Contents</div>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
    assert.isNull(checkContext._data);
  });

  it('returns undefined for a not recommended attribute in shadow DOM', () => {
    axe.configure({
      standards: {
        ariaAttrs: {
          'aria-fizz': {
            type: 'nmtoken',
            notRecommended: true
          }
        }
      }
    });
    const params = axe.testUtils.shadowCheckSetup(
      '<div id="shadow"></div>',
      '<div id="target" aria-fizz="buzz">Contents</div>'
    );
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
    assert.deepEqual(checkContext._data, ['aria-fizz']);
  });
});

describe('axe.utils.getAllChecks', () => {
  it('should be a function', () => {
    assert.isFunction(axe.utils.getAllChecks);
  });

  it('should concatenate all 3 check collections', () => {
    const r = {
      any: ['any:foo', 'any:bar'],
      all: ['all:foo', 'all:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo',
      'any:bar',
      'all:foo',
      'all:bar',
      'none:foo',
      'none:bar'
    ]);
  });

  it('should safely ignore missing collections - all', () => {
    const r = {
      any: ['any:foo', 'any:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo',
      'any:bar',
      'none:foo',
      'none:bar'
    ]);
  });

  it('should safely ignore missing collections - any', () => {
    const r = {
      all: ['all:foo', 'all:bar'],
      none: ['none:foo', 'none:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'all:foo',
      'all:bar',
      'none:foo',
      'none:bar'
    ]);
  });

  it('should safely ignore missing collections - none', () => {
    const r = {
      any: ['any:foo', 'any:bar'],
      all: ['all:foo', 'all:bar']
    };
    assert.deepEqual(axe.utils.getAllChecks(r), [
      'any:foo',
      'any:bar',
      'all:foo',
      'all:bar'
    ]);
  });
});

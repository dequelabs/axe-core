describe('aria.implicitNodes', () => {
  let orig;
  beforeEach(() => {
    orig = axe.commons.aria.lookupTable.role;
  });

  afterEach(() => {
    axe.commons.aria.lookupTable.role = orig;
  });

  it('should return the implicit property for the proper role', () => {
    axe.commons.aria.lookupTable.role = {
      cats: {
        implicit: 'yes'
      }
    };
    assert.equal(axe.commons.aria.implicitNodes('cats'), 'yes');
  });

  it('should return null if there are no implicit roles', () => {
    axe.commons.aria.lookupTable.role = {};
    const result = axe.commons.aria.implicitNodes('cats');

    assert.isNull(result);
  });
});

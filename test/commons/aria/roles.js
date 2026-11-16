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

  describe('implicit selectors', () => {
    const queryFixture = axe.testUtils.queryFixture;
    const matches = axe.utils.matches;

    it('should match enumerated input types case-insensitively', () => {
      const selectors = axe.commons.aria.implicitNodes('button');
      const virtualNode = queryFixture('<input id="target" type="SUBMIT" />');

      assert.isTrue(selectors.some(selector => matches(virtualNode, selector)));
    });

    it('should match enumerated menu types case-insensitively', () => {
      const selectors = axe.commons.aria.implicitNodes('toolbar');
      const virtualNode = queryFixture(
        '<menu id="target" type="TOOLBAR"></menu>'
      );

      assert.isTrue(selectors.some(selector => matches(virtualNode, selector)));
    });
  });
});

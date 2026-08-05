describe('aria.getRolesWithNameFromContents', () => {
  before(() => {
    axe._load({});
  });

  afterEach(() => {
    axe.reset();
  });

  it('should return array if nameFrom contents is found in the lookup table', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          dogs: {
            type: 'things',
            nameFromContent: true
          },
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.include(axe.commons.aria.getRolesWithNameFromContents(), 'dogs');
  });
});

describe('aria.getRolesByType', () => {
  before(() => {
    axe._load({});
  });

  afterEach(() => {
    axe.reset();
  });

  it('should return array if roletype is found in the lookup table', () => {
    axe.configure({
      standards: {
        ariaRoles: {
          dogs: {
            type: 'things'
          },
          cats: {
            type: 'stuff'
          }
        }
      }
    });
    assert.deepEqual(axe.commons.aria.getRolesByType('stuff'), ['cats']);
  });

  it('should return empty array if role is not found in the lookup table', () => {
    assert.deepEqual(axe.commons.aria.getRolesByType('blahblahblah'), []);
  });
});

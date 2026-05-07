describe('aria.getRoleType', () => {
  const queryFixture = axe.testUtils.queryFixture;
  const getRoleType = axe.commons.aria.getRoleType;

  beforeEach(() => {
    axe._load({});
    axe.configure({
      standards: {
        ariaRoles: {
          cats: {
            type: 'stuff'
          }
        }
      }
    });
  });

  afterEach(() => {
    axe.reset();
  });

  it('should return the type from the lookup table', () => {
    assert.equal(getRoleType('cats'), 'stuff');
  });

  it('should return null if role is not found in the lookup table', () => {
    assert.isNull(getRoleType('dogs'));
  });

  it('should return null when passed null', () => {
    assert.isNull(getRoleType(null));
  });

  it('should return null when passed undefined', () => {
    assert.isNull(getRoleType(undefined));
  });

  it('returns the type from the role of a virtual node', () => {
    const vNode = queryFixture('<span id="target" role="cats"></span>');
    assert.equal(getRoleType(vNode), 'stuff');
  });

  it('returns the type from the role of a DOM node', () => {
    const domNode = queryFixture(
      '<span id="target" role="cats"></span>'
    ).actualNode;
    assert.equal(getRoleType(domNode), 'stuff');
  });
});

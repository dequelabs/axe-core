describe('standards.getElementSpec', () => {
  const getElementSpec = axe.commons.standards.getElementSpec;
  const queryFixture = axe.testUtils.queryFixture;
  const fixture = document.querySelector('#fixture');

  before(() => {
    axe._load({});
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  after(() => {
    axe.reset();
  });

  it('should return a spec for an element without variants', () => {
    axe.configure({
      standards: {
        htmlElms: {
          abbr: {
            contentTypes: ['phrasing', 'flow'],
            allowedRoles: true
          }
        }
      }
    });

    const vNode = queryFixture('<abbr id="target"></abbr>');
    assert.deepEqual(getElementSpec(vNode), {
      contentTypes: ['phrasing', 'flow'],
      allowedRoles: true
    });
  });

  it('should return empty object if passed an invalid element', () => {
    const vNode = queryFixture('<foo-bar id="target"></foo-bar>');
    assert.deepEqual(getElementSpec(vNode), {});
  });

  describe('variants', () => {
    before(() => {
      axe.configure({
        standards: {
          htmlElms: {
            abbr: {
              variant: {
                controls: {
                  matches: '[controls]',
                  customProp: 'controls'
                },
                label: {
                  matches: '[aria-label]',
                  anotherProp: 'label'
                },
                default: {
                  customProp: 'default',
                  anotherProp: 'default'
                }
              },
              allowedRoles: false
            }
          }
        }
      });
    });

    it('should return top level properties', () => {
      const vNode = queryFixture('<abbr id="target" controls></abbr>');
      const spec = getElementSpec(vNode);
      assert.equal(spec.allowedRoles, false);
    });

    it('should return properties from matching variant', () => {
      const vNode = queryFixture('<abbr id="target" controls></abbr>');
      const spec = getElementSpec(vNode);
      assert.equal(spec.customProp, 'controls');
    });

    it('should return all properties from matching variants', () => {
      const vNode = queryFixture(
        '<abbr id="target" controls aria-label="foo"></abbr>'
      );
      const spec = getElementSpec(vNode);
      assert.equal(spec.customProp, 'controls');
      assert.equal(spec.anotherProp, 'label');
    });

    it('should return default props in no variants match', () => {
      const vNode = queryFixture('<abbr id="target"></abbr>');
      const spec = getElementSpec(vNode);
      assert.equal(spec.customProp, 'default');
      assert.equal(spec.anotherProp, 'default');
    });

    it('should return default props that were not part of other matches', () => {
      const vNode = queryFixture('<abbr id="target" controls></abbr>');
      const spec = getElementSpec(vNode);
      assert.equal(spec.customProp, 'controls');
      assert.equal(spec.anotherProp, 'default');
    });
  });
});

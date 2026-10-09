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
            allowedRoles: true,
            namingProhibited: true
          }
        }
      }
    });

    const vNode = queryFixture('<abbr id="target"></abbr>');
    assert.deepEqual(getElementSpec(vNode), {
      contentTypes: ['phrasing', 'flow'],
      allowedRoles: true,
      namingProhibited: true
    });
  });

  it('should return empty object if passed an invalid element', () => {
    const vNode = queryFixture('<foo-bar id="target"></foo-bar>');
    assert.deepEqual(getElementSpec(vNode), {});
  });

  it('should restrict figure allowedRoles when it has a child figcaption', () => {
    const vNode = queryFixture(
      '<figure id="target"><figcaption>caption</figcaption></figure>'
    );
    assert.deepEqual(getElementSpec(vNode).allowedRoles, ['doc-example']);
  });

  it('should allow any role on a figure without a child figcaption', () => {
    const vNode = queryFixture('<figure id="target"></figure>');
    assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
  });

  it('should allow any role on a figure whose figcaption is in a nested figure', () => {
    const vNode = queryFixture(
      '<figure id="target"><figure><figcaption>caption</figcaption></figure></figure>'
    );
    assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
  });

  describe('list item parent semantics', () => {
    ['ul', 'ol', 'menu'].forEach(nodeName => {
      it(`should keep list item role restrictions under a native ${nodeName}`, () => {
        const vNode = queryFixture(
          `<${nodeName}><li id="target" role="tabpanel"></li></${nodeName}>`
        );
        const allowedRoles = getElementSpec(vNode).allowedRoles;
        assert.isArray(allowedRoles);
        assert.include(allowedRoles, 'option');
        assert.notInclude(allowedRoles, 'tabpanel');
      });
    });

    it('should keep list item role restrictions under an explicit list', () => {
      const vNode = queryFixture(
        '<div role="list"><li id="target" role="tabpanel"></li></div>'
      );
      assert.notInclude(getElementSpec(vNode).allowedRoles, 'tabpanel');
    });

    ['none', 'presentation'].forEach(role => {
      it(`should allow any list item role under a ${role} parent`, () => {
        const vNode = queryFixture(
          `<ul role="${role}"><li id="target" role="tabpanel"></li></ul>`
        );
        assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
      });
    });

    it('should allow any list item role when the parent has no list semantics', () => {
      const vNode = queryFixture(
        '<div><li id="target" role="tabpanel"></li></div>'
      );
      assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
    });

    it('should allow any list item role when the parent has a different explicit role', () => {
      const vNode = queryFixture(
        '<ul role="group"><li id="target" role="tabpanel"></li></ul>'
      );
      assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
    });

    it('should preserve restrictions when a presentation conflict restores the list role', () => {
      const vNode = queryFixture(
        '<ul role="none" tabindex="0"><li id="target" role="tabpanel"></li></ul>'
      );
      assert.notInclude(getElementSpec(vNode).allowedRoles, 'tabpanel');
    });

    it('should preserve restrictions when a global ARIA attribute restores the list role', () => {
      const vNode = queryFixture(
        '<ul role="presentation" aria-label="Items"><li id="target" role="tabpanel"></li></ul>'
      );
      assert.notInclude(getElementSpec(vNode).allowedRoles, 'tabpanel');
    });

    it('should resolve a parent name that references its list item without recursion', () => {
      const vNode = queryFixture(
        '<section aria-labelledby="target"><li id="target" role="tabpanel">Section name</li></section>'
      );
      assert.strictEqual(getElementSpec(vNode).allowedRoles, true);
      assert.equal(axe.commons.aria.getRole(vNode.parent), 'region');
    });

    [undefined, null].forEach(parent => {
      it(`should keep role restrictions when parent context is ${parent}`, () => {
        const vNode = new axe.SerialVirtualNode({
          nodeName: 'li',
          attributes: { role: 'tabpanel' }
        });
        vNode.parent = parent;
        const allowedRoles = getElementSpec(vNode).allowedRoles;
        assert.isArray(allowedRoles);
        assert.include(allowedRoles, 'option');
        assert.notInclude(allowedRoles, 'tabpanel');
      });
    });
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

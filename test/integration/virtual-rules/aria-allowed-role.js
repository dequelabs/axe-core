describe('aria-allowed-role virtual-rule', () => {
  afterEach(() => {
    axe.reset();
  });

  it('should pass for allowed role', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'div',
      attributes: {
        role: 'checkbox',
        'aria-checked': true
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for unallowed role', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  describe('list item parent context', () => {
    const cases = [
      { name: 'native list', nodeName: 'ul', attributes: {}, passes: false },
      {
        name: 'explicit list',
        nodeName: 'div',
        attributes: { role: 'list' },
        passes: false
      },
      {
        name: 'presentation list',
        nodeName: 'ul',
        attributes: { role: 'presentation' },
        passes: true
      },
      {
        name: 'none list',
        nodeName: 'ol',
        attributes: { role: 'none' },
        passes: true
      },
      {
        name: 'non-list parent',
        nodeName: 'div',
        attributes: {},
        passes: true
      },
      {
        name: 'focusable presentation list',
        nodeName: 'ul',
        attributes: { role: 'presentation', tabindex: '0' },
        passes: false
      },
      {
        name: 'labelled presentation list',
        nodeName: 'ul',
        attributes: { role: 'none', 'aria-label': 'Slides' },
        passes: false
      }
    ];

    for (const { name, nodeName, attributes, passes } of cases) {
      it(`checks a tabpanel with a ${name} parent`, () => {
        const parent = new axe.SerialVirtualNode({ nodeName, attributes });
        const vNode = new axe.SerialVirtualNode({
          nodeName: 'li',
          attributes: { role: 'tabpanel' }
        });
        parent.children = [vNode];
        vNode.parent = parent;

        const results = axe.runVirtualRule('aria-allowed-role', vNode);

        assert.lengthOf(results.passes, passes ? 1 : 0);
        assert.lengthOf(results.violations, passes ? 0 : 1);
        assert.lengthOf(results.incomplete, 0);
      });
    }

    for (const parent of [undefined, null]) {
      for (const role of ['menuitem', 'tabpanel']) {
        it(`preserves role=${role} behavior with parent=${parent}`, () => {
          const vNode = new axe.SerialVirtualNode({
            nodeName: 'li',
            attributes: { role }
          });
          vNode.parent = parent;

          const results = axe.runVirtualRule('aria-allowed-role', vNode);

          assert.lengthOf(results.passes, role === 'menuitem' ? 1 : 0);
          assert.lengthOf(results.violations, role === 'tabpanel' ? 1 : 0);
          assert.lengthOf(results.incomplete, 0);
        });
      }
    }
  });

  it('should pass for element with ignored option', () => {
    axe.configure({
      checks: [
        {
          id: 'aria-allowed-role',
          options: {
            ignoredTags: ['dd']
          }
        }
      ]
    });

    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for hidden element', () => {
    const results = axe.runVirtualRule('aria-allowed-role', {
      nodeName: 'dd',
      attributes: {
        'aria-hidden': true,
        role: 'link'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should incomplete for hidden element parent', () => {
    const vNode = new axe.SerialVirtualNode({
      nodeName: 'dd',
      attributes: {
        role: 'link'
      }
    });
    const parent = new axe.SerialVirtualNode({
      nodeName: 'div',
      attributes: {
        'aria-hidden': true
      }
    });
    parent.children = [vNode];
    vNode.parent = parent;

    const results = axe.runVirtualRule('aria-allowed-role', vNode);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });
});

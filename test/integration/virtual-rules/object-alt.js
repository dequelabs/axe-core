describe('object-alt virtual-rule', function () {
  const data = `data:text/html,Object%20content`;

  it('is inapplicable when the object has no data attribute', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {}
    });
    assert.lengthOf(results.inapplicable, 1);
  });

  it('should pass for aria-label', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        'aria-label': 'foobar',
        data
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        'aria-labelledby': 'foobar',
        data
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        title: 'foobar',
        data
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        role: 'presentation',
        data
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        role: 'none',
        data
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for visible text content', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: { data }
    });
    let child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    let results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt and children are missing', function () {
    let results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: { data }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail children contain no visible text', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: { data }
    });
    node.children = [];

    let results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        alt: ' \t   \n   ',
        data
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        'aria-label': '',
        data
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    let node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        title: '',
        data
      }
    });
    node.children = [];

    let results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});

describe('image-alt virtual-rule', function () {
  it('should pass for alt', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        alt: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for empty alt', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        alt: ''
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for aria-label', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        role: 'presentation'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        role: 'none'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt is missing', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {}
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        alt: ' \t   \n   '
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    let results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});

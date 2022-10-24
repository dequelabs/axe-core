describe('input-image-alt virtual-rule', function () {
  it('should pass for alt', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        alt: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for aria-label', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function () {
    var results = axe.runVirtualRule('image-alt', {
      nodeName: 'img',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt is missing', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt is empty', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        alt: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        'aria-label': ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function () {
    var results = axe.runVirtualRule('input-image-alt', {
      nodeName: 'input',
      attributes: {
        type: 'image',
        title: ''
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});

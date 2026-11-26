describe('image-alt-file-name virtual-rule', () => {
  it('should pass for descriptive alt text', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'steamed-hams_08.jpg',
        alt: 'Principal Skinner grilling'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for an empty alt', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'steamed-hams_08.jpg',
        alt: ''
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should be incomplete when the alt text is a file name', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'steamed-hams_08.png',
        alt: 'steamed-hams_08.jpg'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should be incomplete when the alt text is a URL', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'logo.svg',
        alt: 'https://www.example.com/company'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass when the alt text only contains a slash', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'apollo.jpg',
        alt: 'NASA/JPL'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass when the image is presentational', () => {
    const results = axe.runVirtualRule('image-alt-file-name', {
      nodeName: 'img',
      attributes: {
        src: 'photo.jpg',
        alt: 'photo.jpg',
        role: 'presentation'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });
});

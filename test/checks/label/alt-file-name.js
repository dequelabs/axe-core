describe('alt-file-name', () => {
  const checkSetup = axe.testUtils.checkSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('alt-file-name');

  afterEach(() => {
    axe.teardown();
  });

  it('returns false when the image has no accessible name', () => {
    const params = checkSetup('<img id="target" src="photo.jpg" alt="">');
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns false when the alt text describes the image', () => {
    const params = checkSetup(
      '<img id="target" src="photo.jpg" alt="A dog wearing a party hat">'
    );
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns false when a file name is incidental to the rest of the text', () => {
    const params = checkSetup(
      '<img id="target" src="photo.jpg" alt="Download photo.jpg from the archive">'
    );
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns true when the alt text ends in an image file extension', () => {
    const params = checkSetup(
      '<img id="target" src="steamed-hams_08.jpg" alt="steamed-hams_08.jpg">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('ignores the case of the file extension', () => {
    const params = checkSetup(
      '<img id="target" src="photo.JPEG" alt="IMG_0042.JPEG">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns true when the file name contains spaces', () => {
    const params = checkSetup(
      '<img id="target" src="s.png" alt="Screen Shot 2022-09-27 at 10.15.32 AM.png">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns true when the alt text is a file path', () => {
    const params = checkSetup(
      '<img id="target" src="p.jpeg" alt="/wp-content/uploads/2022/09/photo.jpeg">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns true when the alt text is a URL without a file extension', () => {
    const params = checkSetup(
      '<img id="target" src="fb.svg" alt="https://www.example.com/company">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns false when the alt text merely contains a slash', () => {
    const params = checkSetup('<img id="target" src="p.jpg" alt="NASA/JPL">');
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns false when the extension is not an image type', () => {
    const params = checkSetup(
      '<img id="target" src="logo.png" alt="Annual report.pdf">'
    );
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns false when the accessible name is an extension without a dot', () => {
    const params = checkSetup('<img id="target" src="p.png" alt="png">');
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('returns false when the image has a presentational role', () => {
    const params = checkSetup(
      '<img id="target" src="photo.jpg" alt="photo.jpg" role="presentation">'
    );
    assert.isFalse(checkEvaluate.apply(null, params));
  });

  it('uses the accessible name rather than the alt attribute', () => {
    const params = checkSetup(
      '<img id="target" src="p.png" alt="A dog" aria-label="dog-01.png">'
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('accepts a configurable list of extensions', () => {
    const params = checkSetup(
      '<img id="target" src="chart.xcf" alt="chart.xcf">',
      { extensions: ['xcf'] }
    );
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns true for an image inside shadow DOM', () => {
    const params = checkSetup(`
      <div>
        <template shadowrootmode="open">
          <img id="target" src="p.png" alt="banner-final-v2.png" />
        </template>
      </div>
    `);
    assert.isTrue(checkEvaluate.apply(null, params));
  });

  it('returns false for a described image inside shadow DOM', () => {
    const params = checkSetup(`
      <div>
        <template shadowrootmode="open">
          <img id="target" src="p.png" alt="Two people shaking hands" />
        </template>
      </div>
    `);
    assert.isFalse(checkEvaluate.apply(null, params));
  });
});

describe('alt-space-value', () => {
  const { checkSetup, html } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const check = checks['alt-space-value'];

  afterEach(() => {
    checkContext.reset();
  });

  it('should return true if alt contains a space character', () => {
    const params = checkSetup(html` <img id="target" alt=" " /> `);
    assert.isTrue(check.evaluate.apply(checkContext, params));
  });

  it('should return true if alt contains a non-breaking space character', () => {
    const params = checkSetup(html` <img id="target" alt="&nbsp;" /> `);
    assert.isTrue(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt attribute is empty', () => {
    const params = checkSetup(html` <img id="target" alt="" /> `);
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt attribute has a proper text value', () => {
    const params = checkSetup(html` <img id="target" alt="text content" /> `);
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt is whitespace and role is presentation', () => {
    const params = checkSetup(html`
      <img id="target" alt=" " role="presentation" />
    `);
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('should return false if alt is whitespace and role is none', () => {
    const params = checkSetup(html` <img id="target" alt=" " role="none" /> `);
    assert.isFalse(check.evaluate.apply(checkContext, params));
  });

  it('should return true if alt is whitespace, role is presentation, but has conflict resolution', () => {
    const params = checkSetup(html`
      <img id="target" alt=" " role="presentation" tabindex="0" />
    `);
    assert.isTrue(check.evaluate.apply(checkContext, params));
  });
});

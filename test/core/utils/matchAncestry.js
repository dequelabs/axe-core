describe('axe.utils.matchAncestry', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should be a function', () => {
    assert.isFunction(axe.utils.matchAncestry);
  });

  it('should match when ancestry is the same and one level', () => {
    const result = axe.utils.matchAncestry(
      ['html > body > div:nth-child(1)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isTrue(result);
  });

  it('should not match when ancestry is different and one level', () => {
    const result = axe.utils.matchAncestry(
      ['html > body > div:nth-child(3)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when ancestries have different numbers of elements', () => {
    const result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when first level is different and second level is the same', () => {
    const result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['otherIframe', 'html > body > div:nth-child(1)']
    );
    assert.isFalse(result);
  });

  it('should not match when second level is different and first level is the same', () => {
    const result = axe.utils.matchAncestry(
      ['iframe', 'html > body > div:nth-child(1)'],
      ['iframe', 'html > body > div:nth-child(2)']
    );
    assert.isFalse(result);
  });

  it('should match when all levels are the same', () => {
    const result = axe.utils.matchAncestry(
      ['iframe', 'iframe2', 'html > body > div:nth-child(1)'],
      ['iframe', 'iframe2', 'html > body > div:nth-child(1)']
    );
    assert.isTrue(result);
  });
});

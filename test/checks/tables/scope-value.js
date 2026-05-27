describe('scope-value', () => {
  const fixture = document.getElementById('fixture');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true if scope is "col"', () => {
    fixture.innerHTML = '<table><tr><td scope="col"></td></tr></table>';
    const node = fixture.querySelector('td');

    assert.isTrue(axe.testUtils.getCheckEvaluate('scope-value')(node));
  });

  it('should return true if scope is "row"', () => {
    fixture.innerHTML = '<table><tr><td scope="row"></td></tr></table>';
    const node = fixture.querySelector('td');

    assert.isTrue(axe.testUtils.getCheckEvaluate('scope-value')(node));
  });

  it('should return false otherwise', () => {
    fixture.innerHTML =
      '<table><tr><td scope="hahahahanothx"></td></tr></table>';
    const node = fixture.querySelector('td');

    assert.isFalse(axe.testUtils.getCheckEvaluate('scope-value')(node));
  });

  it('should support options.values', () => {
    fixture.innerHTML =
      '<table><tr><td scope="hahahahanothx"></td></tr></table>';
    const node = fixture.querySelector('td');

    assert.isTrue(
      axe.testUtils.getCheckEvaluate('scope-value')(node, {
        values: ['hahahahanothx']
      })
    );
  });
});

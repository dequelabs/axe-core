describe('inserted-into-focus-order-matches', () => {
  const fixture = document.getElementById('fixture');
  const flatTreeSetup = axe.testUtils.flatTreeSetup;
  let rule;

  beforeEach(() => {
    rule = axe.utils.getRule('focus-order-semantics');
  });

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should return true for a non-focusable element with tabindex > -1', () => {
    fixture.innerHTML = '<div tabindex="0"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isTrue(rule.matches(node));
  });

  it('should return false for a non-focusable element with tabindex == -1', () => {
    fixture.innerHTML = '<div tabindex="-1"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for a native focusable element with tabindex > 0', () => {
    fixture.innerHTML = '<button tabindex="0"></button>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for a native focusable element with no tabindex', () => {
    fixture.innerHTML = '<a href="#"></a>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });

  it('should return false for non-numeric tabindex value', () => {
    fixture.innerHTML = '<div tabindex="abc"></div>';
    flatTreeSetup(fixture);
    const node = fixture.firstChild;
    assert.isFalse(rule.matches(node));
  });
});

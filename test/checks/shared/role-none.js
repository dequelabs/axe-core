describe('role-none', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('role-none');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should detect role="none" on the element', () => {
    const vNode = queryFixture('<div id="target" role="none"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== none', () => {
    const vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', () => {
    const vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});

describe('role-presentation', () => {
  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('role-presentation');

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should detect role="presentation" on the element', () => {
    const vNode = queryFixture('<div id="target" role="presentation"></div>');

    assert.isTrue(checkEvaluate(null, null, vNode));
  });

  it('should return false when role !== presentation', () => {
    const vNode = queryFixture('<div id="target" role="cats"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });

  it('should return false when there is no role attribute', () => {
    const vNode = queryFixture('<div id="target"></div>');

    assert.isFalse(checkEvaluate(null, null, vNode));
  });
});

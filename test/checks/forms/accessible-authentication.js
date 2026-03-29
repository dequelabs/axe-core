describe('accessible-authentication tests', () => {
  const { checkSetup, fixtureSetup, getCheckEvaluate } = axe.testUtils;
  const checkContext = axe.testUtils.MockCheckContext();
  const checkEvaluate = getCheckEvaluate('accessible-authentication');

  afterEach(() => {
    checkContext.reset();
  });

  it('returns undefined when input has no autocomplete', () => {
    const params = checkSetup('<input type="password" id="target" />');
    assert.isUndefined(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when input has correct autocomplete', () => {
    const params = checkSetup(
      '<input type="password" autocomplete="current-password" id="target" />'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns true when autocomplete has multiple tokens', () => {
    const params = checkSetup(
      '<input type="password" autocomplete="section-login current-password" id="target" />'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, params));
  });

  it('returns false for invalid autocomplete values', () => {
    const params = checkSetup(
      '<input type="password" autocomplete="username" id="target" />'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, params));
  });

  it('returns true for password field in an open shadow root', () => {
    const root = document.createElement('div');
    const shadow = root.attachShadow({ mode: 'open' });
    shadow.innerHTML =
      '<input type="password" autocomplete="new-password" id="target" />';
    fixtureSetup(root);

    const vNode = axe.utils.getNodeFromTree(shadow.querySelector('#target'));
    assert.isTrue(checkEvaluate.call(checkContext, null, {}, vNode));
  });
});

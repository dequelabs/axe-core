describe('listitem', () => {
  const checkContext = axe.testUtils.MockCheckContext();
  const checkSetup = axe.testUtils.checkSetup;
  const fixtureSetup = axe.testUtils.fixtureSetup;
  const checkEvaluate = axe.testUtils.getCheckEvaluate('listitem');

  afterEach(() => {
    checkContext.reset();
  });

  it('should pass if the listitem has a parent <ol>', () => {
    const params = checkSetup('<ol><li id="target">My list item</li></ol>');
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ul>', () => {
    const params = checkSetup('<ul><li id="target">My list item</li></ul>');
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=list', () => {
    const params = checkSetup(
      '<div role="list"><li id="target">My list item</li></div>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=none', () => {
    const params = checkSetup(
      '<ul role="none"><li id="target">My list item</li></ul>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=presentation', () => {
    const params = checkSetup(
      '<ul role="presentation"><li id="target">My list item</li></ul>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should fail if the listitem has an incorrect parent', () => {
    const params = checkSetup('<div><li id="target">My list item</li></div>');
    const result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
  });

  it('should fail if the listitem has a parent <ol> with changed role', () => {
    const params = checkSetup(
      '<ol role="menubar"><li id="target">My list item</li></ol>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
    assert.equal(checkContext._data.messageKey, 'roleNotValid');
  });

  it('should pass if the listitem has a parent <ol> with an invalid role', () => {
    const params = checkSetup(
      '<ol role="invalid-role"><li id="target">My list item</li></ol>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ol> with an abstract role', () => {
    const params = checkSetup(
      '<ol role="section"><li id="target">My list item</li></ol>'
    );
    const result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should return true in a shadow DOM pass', () => {
    const node = document.createElement('div');
    node.innerHTML = '<li id="target">My list item </li>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<ul><slot></slot></ul>';
    fixtureSetup(node);
    const target = node.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(target);
    const result = checkEvaluate.apply(checkContext, [
      target,
      {},
      virtualTarget
    ]);
    assert.isTrue(result);
  });

  it('should return false in a shadow DOM fail', () => {
    const node = document.createElement('div');
    node.innerHTML = '<li id="target">My list item </li>';
    const shadow = node.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<div><slot></slot></div>';
    fixtureSetup(node);
    const target = node.querySelector('#target');
    const virtualTarget = axe.utils.getNodeFromTree(target);
    const result = checkEvaluate.apply(checkContext, [
      target,
      {},
      virtualTarget
    ]);
    assert.isFalse(result);
  });
});

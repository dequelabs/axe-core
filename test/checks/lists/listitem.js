describe('listitem', function () {
  'use strict';

  let shadowSupport = axe.testUtils.shadowSupport;
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let fixtureSetup = axe.testUtils.fixtureSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('listitem');

  afterEach(function () {
    checkContext.reset();
  });

  it('should pass if the listitem has a parent <ol>', function () {
    let params = checkSetup('<ol><li id="target">My list item</li></ol>');
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ul>', function () {
    let params = checkSetup('<ul><li id="target">My list item</li></ul>');
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=list', function () {
    let params = checkSetup(
      '<div role="list"><li id="target">My list item</li></div>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=none', function () {
    let params = checkSetup(
      '<ul role="none"><li id="target">My list item</li></ul>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=presentation', function () {
    let params = checkSetup(
      '<ul role="presentation"><li id="target">My list item</li></ul>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should fail if the listitem has an incorrect parent', function () {
    let params = checkSetup('<div><li id="target">My list item</li></div>');
    let result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
  });

  it('should fail if the listitem has a parent <ol> with changed role', function () {
    let params = checkSetup(
      '<ol role="menubar"><li id="target">My list item</li></ol>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isFalse(result);
    assert.equal(checkContext._data.messageKey, 'roleNotValid');
  });

  it('should pass if the listitem has a parent <ol> with an invalid role', function () {
    let params = checkSetup(
      '<ol role="invalid-role"><li id="target">My list item</li></ol>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ol> with an abstract role', function () {
    let params = checkSetup(
      '<ol role="section"><li id="target">My list item</li></ol>'
    );
    let result = checkEvaluate.apply(checkContext, params);
    assert.isTrue(result);
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true in a shadow DOM pass',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<ul><slot></slot></ul>';
      fixtureSetup(node);
      let target = node.querySelector('#target');
      let virtualTarget = axe.utils.getNodeFromTree(target);
      let result = checkEvaluate.apply(checkContext, [
        target,
        {},
        virtualTarget
      ]);
      assert.isTrue(result);
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM fail',
    function () {
      let node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      let shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div><slot></slot></div>';
      fixtureSetup(node);
      let target = node.querySelector('#target');
      let virtualTarget = axe.utils.getNodeFromTree(target);
      let result = checkEvaluate.apply(checkContext, [
        target,
        {},
        virtualTarget
      ]);
      assert.isFalse(result);
    }
  );
});

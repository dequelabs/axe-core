describe('listitem', function() {
  'use strict';

  var shadowSupport = axe.testUtils.shadowSupport;
  var checkContext = axe.testUtils.MockCheckContext();
  var checkSetup = axe.testUtils.checkSetup;
  var fixtureSetup = axe.testUtils.fixtureSetup;
  var checkEvaluate = axe.testUtils.getCheckEvaluate('listitem');

  afterEach(function() {
    checkContext.reset();
  });

  it('should pass if the listitem has a parent <ol>', function() {
    var params = checkSetup('<ol><li id="target">My list item</li></ol>');
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ul>', function() {
    var params = checkSetup('<ul><li id="target">My list item</li></ul>');
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=list', function() {
    var params = checkSetup(
      '<div role="list"><li id="target">My list item</li></div>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=none', function() {
    var params = checkSetup(
      '<ul role="none"><li id="target">My list item</li></ul>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent role=presentation', function() {
    var params = checkSetup(
      '<ul role="presentation"><li id="target">My list item</li></ul>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should fail if the listitem has an incorrect parent', function() {
    var params = checkSetup('<div><li id="target">My list item</li></div>');
    var result = checkEvaluate.apply(checkContext, params)
    assert.isFalse(result);
  });

  it('should fail if the listitem has a parent <ol> with changed role', function() {
    var params = checkSetup(
      '<ol role="menubar"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isFalse(result);
    assert.equal(checkContext._data.messageKey, 'roleNotValid');
  });

  it('should pass if the listitem has a parent <ol> with an invalid role', function() {
    var params = checkSetup(
      '<ol role="invalid-role"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  it('should pass if the listitem has a parent <ol> with an abstract role', function() {
    var params = checkSetup(
      '<ol role="section"><li id="target">My list item</li></ol>'
    );
    var result = checkEvaluate.apply(checkContext, params)
    assert.isTrue(result);
  });

  (shadowSupport.v1 ? it : xit)(
    'should return true in a shadow DOM pass',
    function() {
      var node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<ul><slot></slot></ul>';
      fixtureSetup(node);
      var target = node.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(target);
      var result = checkEvaluate.apply(checkContext, [target, {}, virtualTarget])
      assert.isTrue(result);
    }
  );

  (shadowSupport.v1 ? it : xit)(
    'should return false in a shadow DOM fail',
    function() {
      var node = document.createElement('div');
      node.innerHTML = '<li id="target">My list item </li>';
      var shadow = node.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div><slot></slot></div>';
      fixtureSetup(node);
      var target = node.querySelector('#target');
      var virtualTarget = axe.utils.getNodeFromTree(target);
      var result = checkEvaluate.apply(checkContext, [target, {}, virtualTarget])
      assert.isFalse(result);
    }
  );
});

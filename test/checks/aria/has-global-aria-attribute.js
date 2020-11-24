describe('has-global-aria-attribute', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkSetup = axe.testUtils.checkSetup;

  var checkContext = axe.testUtils.MockCheckContext();
  var evaluate = axe.testUtils.getCheckEvaluate('has-global-aria-attribute');

  afterEach(function() {
    fixture.innerHTML = '';
    axe._tree = undefined;
    checkContext.reset();
  });

  it('should return true if any global ARIA attributes are found', function() {
    var node = document.createElement('div');
    node.id = 'test';
    node.setAttribute('aria-label', 'hello');
    var params = checkSetup(node);
    assert.isTrue(evaluate.apply(checkContext, params));
  });

  it('should return false if no valid ARIA attributes are found', function() {
    var node = document.createElement('div');
    node.id = 'test';
    node.setAttribute('aria-random', 'hello');
    var params = checkSetup(node);
    assert.isFalse(evaluate.apply(checkContext, params));
  });
});

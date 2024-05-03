describe('has-visible-text', function () {
  'use strict';

  let checkSetup = axe.testUtils.checkSetup;
  let checkContext = axe.testUtils.MockCheckContext();

  afterEach(function () {
    checkContext.reset();
  });

  it('should return false if there is no visible text', function () {
    let params = checkSetup('<p id="target"></p>');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  it('should return false if there is text, but its hidden', function () {
    let params = checkSetup(
      '<p id="target"><span style="display:none">hello!</span></p>'
    );
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  it('should return true if there is visible text', function () {
    let params = checkSetup('<p id="target">hello!</p>');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('has-visible-text')
        .apply(checkContext, params)
    );
  });

  describe('SerialVirtualNode', function () {
    it('should return false if element is not named from contents', function () {
      let node = new axe.SerialVirtualNode({
        nodeName: 'article'
      });

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return incomplete if no other properties are set', function () {
      let node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });

      assert.isUndefined(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return false if there is no visible text', function () {
      let node = new axe.SerialVirtualNode({
        nodeName: 'button'
      });
      node.children = [];

      assert.isFalse(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });

    it('should return true if there is visible text', function () {
      let node = new axe.SerialVirtualNode({
        nodeName: 'p'
      });
      let child = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'hello!'
      });
      node.children = [child];

      assert.isTrue(
        axe.testUtils.getCheckEvaluate('has-visible-text')(null, {}, node)
      );
    });
  });
});

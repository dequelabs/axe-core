describe('svg-non-empty-title tests', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let checkContext = axe.testUtils.MockCheckContext();
  let checkSetup = axe.testUtils.checkSetup;
  let checkEvaluate = axe.testUtils.getCheckEvaluate('svg-non-empty-title');

  afterEach(function () {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if the element has a `title` child', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><title>Time II: Party</title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if the `title` child has text nested in another element', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><title><g>Time II: Party</g></title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns true if the element has a `title` child with `display:none`', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><title style="display: none;">Time II: Party</title></svg>'
    );
    assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
  });

  it('returns false if the element has no `title` child', function () {
    let checkArgs = checkSetup('<svg id="target"></svg>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'noTitle');
  });

  it('returns false if the `title` child is empty', function () {
    let checkArgs = checkSetup('<svg id="target"><title></title></svg>');
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  it('returns false if the `title` is a grandchild', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><circle><title>Time II: Party</title></circle></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'noTitle');
  });

  it('returns false if the `title` child has only whitespace', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><title> \t\r\n </title></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  it('returns false if there are multiple titles, and the first is empty', function () {
    let checkArgs = checkSetup(
      '<svg id="target"><title></title><title>Time II: Party</title></svg>'
    );
    assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
    assert.equal(checkContext._data.messageKey, 'emptyTitle');
  });

  describe('Serial Virtual Node', function () {
    it('returns true if the element has a `title` child', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      let child = new axe.SerialVirtualNode({
        nodeName: 'title'
      });
      let text = new axe.SerialVirtualNode({
        nodeName: '#text',
        nodeType: 3,
        nodeValue: 'Time II: Party'
      });
      child.parent = serialNode;
      child.children = [text];
      serialNode.children = [child];
      let checkArgs = [null, {}, serialNode];

      assert.isTrue(checkEvaluate.apply(checkContext, checkArgs));
    });

    it('returns false if the element has no `title` child', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      serialNode.children = [];
      let checkArgs = [null, {}, serialNode];

      assert.isFalse(checkEvaluate.apply(checkContext, checkArgs));
      assert.equal(checkContext._data.messageKey, 'noTitle');
    });

    it('returns undefined if the element has empty children', function () {
      let serialNode = new axe.SerialVirtualNode({
        nodeName: 'svg'
      });
      let checkArgs = [null, {}, serialNode];

      assert.isUndefined(checkEvaluate.apply(checkContext, checkArgs));
    });
  });
});

describe('axe.setup', function () {
  'use strict';

  afterEach(function () {
    axe.teardown();
  });

  it('should setup the tree', function () {
    axe._tree = undefined;
    axe.setup();
    assert.exists(axe._tree);
  });

  it('should default the tree to use html element', function () {
    axe.setup();
    assert.equal(axe._tree[0].actualNode, document.documentElement);
  });

  it('should use the passed in node as the root of the tree', function () {
    axe.setup(document.body);
    assert.equal(axe._tree[0].actualNode, document.body);
  });

  it('should return the root node', function () {
    var vNode = axe.setup(document.body);
    assert.equal(vNode.actualNode, document.body);
  });

  it('should setup selector data', function () {
    axe._selectorData = undefined;
    axe.setup();
    assert.exists(axe._selectorData);
  });

  it('takes documentElement when passed the document', () => {
    axe.setup(document);
    assert.equal(axe._tree[0].actualNode, document.documentElement);
  });

  it('should throw if called twice in a row', function () {
    function fn() {
      axe.setup();
      axe.setup();
    }

    assert.throws(fn);
  });
});

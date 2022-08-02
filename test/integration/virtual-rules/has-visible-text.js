describe('has-visible-text virtual-rule', function () {
  it('should pass with text', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {}
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'OK'
    });

    child.parent = node;
    // node.children = [child];

    // console.log('Hello');
    // console.log({ thing: 'bar' });
    // var ns = JSON.stringify(node);
    // console.log(ns);
    // console.log(node);
    var results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
  });

  xit('should fail with no visible text', function () {
    var node = new axe.SerialVirtualNode({
      nodeName: 'h1',
      attributes: {}
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'OK'
    });

    child.parent = node;
    node.children = [child];

    var results = axe.runVirtualRule('empty-heading', node);

    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
    assert.lengthOf(results.passes, 1);
  });

  xit('should incomplete on error', function () {});
});

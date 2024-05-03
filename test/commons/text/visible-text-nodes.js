describe('text.visibleTextNodes', function () {
  'use strict';

  let fixture = document.getElementById('fixture');
  let queryFixture = axe.testUtils.queryFixture;
  let shadowSupported = axe.testUtils.shadowSupport.v1;
  let visibleTextNodes = axe.commons.text.visibleTextNodes;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should handle multiple text nodes to a single parent', function () {
    let vNode = queryFixture(
      '<div id="target">Hello<span>Hi</span>Goodbye</div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 3);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
    assert.equal(nodes[2].actualNode.nodeValue, 'Goodbye');
  });

  it('should handle recursive calls', function () {
    let vNode = queryFixture(
      '<div id="target">Hello<span><span>Hi</span></span></div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with visibility: hidden', function () {
    let vNode = queryFixture(
      '<div id="target">Hello<span style="visibility: hidden;">Hi</span></div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should know how visibility works', function () {
    let vNode = queryFixture(
      '<div id="target">Hello<span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span></div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with display: none', function () {
    let vNode = queryFixture(
      '<div id="target">Hello<span style="display: none;">Hi</span></div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should ignore script and style tags', function () {
    let vNode = queryFixture(
      '<div id="target"><script> // hello </script><style> /*hello */</style>' +
        'Hello</div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should not take into account position of parents', function () {
    let vNode = queryFixture(
      '<div id="target">' +
        '<div style="position: absolute; top: -9999px;">' +
        '<div style="position: absolute; top: 10000px;">Hello</div>' +
        '</div>' +
        '</div>'
    );
    let nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  (shadowSupported ? it : xit)(
    'should correctly handle slotted elements',
    function () {
      function createContentSlotted() {
        let group = document.createElement('div');
        group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
        return group;
      }
      function makeShadowTree(node) {
        let root = node.attachShadow({ mode: 'open' });
        let div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }
      fixture.innerHTML = '<div><a>hello</a></div>';
      makeShadowTree(fixture.firstChild);
      let tree = axe.utils.getFlattenedTree(fixture.firstChild);
      let nodes = visibleTextNodes(tree[0]);
      assert.equal(nodes.length, 2);
      assert.equal(nodes[0].actualNode.nodeValue, 'Stuff');
      assert.equal(nodes[1].actualNode.nodeValue, 'hello');
    }
  );
});

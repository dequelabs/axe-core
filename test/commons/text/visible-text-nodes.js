describe('text.visibleTextNodes', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var queryFixture = axe.testUtils.queryFixture;
  var shadowSupported = axe.testUtils.shadowSupport.v1;
  var visibleTextNodes = axe.commons.text.visibleTextNodes;

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should handle multiple text nodes to a single parent', function () {
    var vNode = queryFixture(
      '<div id="target">Hello<span>Hi</span>Goodbye</div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 3);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
    assert.equal(nodes[2].actualNode.nodeValue, 'Goodbye');
  });

  it('should handle recursive calls', function () {
    var vNode = queryFixture(
      '<div id="target">Hello<span><span>Hi</span></span></div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with visibility: hidden', function () {
    var vNode = queryFixture(
      '<div id="target">Hello<span style="visibility: hidden;">Hi</span></div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should know how visibility works', function () {
    var vNode = queryFixture(
      '<div id="target">Hello<span style="visibility: hidden;">' +
        '<span style="visibility: visible;">Hi</span>' +
        '</span></div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with display: none', function () {
    var vNode = queryFixture(
      '<div id="target">Hello<span style="display: none;">Hi</span></div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should ignore script and style tags', function () {
    var vNode = queryFixture(
      '<div id="target"><script> // hello </script><style> /*hello */</style>' +
        'Hello</div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should not take into account position of parents', function () {
    var vNode = queryFixture(
      '<div id="target">' +
        '<div style="position: absolute; top: -9999px;">' +
        '<div style="position: absolute; top: 10000px;">Hello</div>' +
        '</div>' +
        '</div>'
    );
    var nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  (shadowSupported ? it : xit)(
    'should correctly handle slotted elements',
    function () {
      function createContentSlotted() {
        var group = document.createElement('div');
        group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
        return group;
      }
      function makeShadowTree(node) {
        var root = node.attachShadow({ mode: 'open' });
        var div = document.createElement('div');
        root.appendChild(div);
        div.appendChild(createContentSlotted());
      }
      fixture.innerHTML = '<div><a>hello</a></div>';
      makeShadowTree(fixture.firstChild);
      var tree = axe.utils.getFlattenedTree(fixture.firstChild);
      var nodes = visibleTextNodes(tree[0]);
      assert.equal(nodes.length, 2);
      assert.equal(nodes[0].actualNode.nodeValue, 'Stuff');
      assert.equal(nodes[1].actualNode.nodeValue, 'hello');
    }
  );
});

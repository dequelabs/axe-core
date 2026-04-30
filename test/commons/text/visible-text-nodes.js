describe('text.visibleTextNodes', () => {
  const html = axe.testUtils.html;

  const fixture = document.getElementById('fixture');
  const queryFixture = axe.testUtils.queryFixture;
  const visibleTextNodes = axe.commons.text.visibleTextNodes;

  afterEach(() => {
    fixture.innerHTML = '';
  });

  it('should handle multiple text nodes to a single parent', () => {
    const vNode = queryFixture(
      '<div id="target">Hello<span>Hi</span>Goodbye</div>'
    );
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 3);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
    assert.equal(nodes[2].actualNode.nodeValue, 'Goodbye');
  });

  it('should handle recursive calls', () => {
    const vNode = queryFixture(
      '<div id="target">Hello<span><span>Hi</span></span></div>'
    );
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with visibility: hidden', () => {
    const vNode = queryFixture(
      '<div id="target">Hello<span style="visibility: hidden;">Hi</span></div>'
    );
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should know how visibility works', () => {
    const vNode = queryFixture(html`
      <div id="target">
        Hello<span style="visibility: hidden;">
          <span style="visibility: visible;">Hi</span>
        </span>
      </div>
    `);
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
    assert.equal(nodes[1].actualNode.nodeValue, 'Hi');
  });

  it('should not return elements with display: none', () => {
    const vNode = queryFixture(
      '<div id="target">Hello<span style="display: none;">Hi</span></div>'
    );
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should ignore script and style tags', () => {
    const vNode = queryFixture(html`
      <div id="target">
        <script>
          // hello
        </script>
        <style>
          /*hello */
        </style>
        Hello
      </div>
    `);
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should not take into account position of parents', () => {
    const vNode = queryFixture(html`
      <div id="target">
        <div style="position: absolute; top: -9999px;">
          <div style="position: absolute; top: 10000px;">Hello</div>
        </div>
      </div>
    `);
    const nodes = visibleTextNodes(vNode);
    assert.equal(nodes.length, 1);
    assert.equal(nodes[0].actualNode.nodeValue, 'Hello');
  });

  it('should correctly handle slotted elements', () => {
    function createContentSlotted() {
      const group = document.createElement('div');
      group.innerHTML = '<div id="target">Stuff<slot></slot></div>';
      return group;
    }
    function makeShadowTree(node) {
      const root = node.attachShadow({ mode: 'open' });
      const div = document.createElement('div');
      root.appendChild(div);
      div.appendChild(createContentSlotted());
    }
    fixture.innerHTML = '<div><a>hello</a></div>';
    makeShadowTree(fixture.firstChild);
    const tree = axe.utils.getFlattenedTree(fixture.firstChild);
    const nodes = visibleTextNodes(tree[0]);
    assert.equal(nodes.length, 2);
    assert.equal(nodes[0].actualNode.nodeValue, 'Stuff');
    assert.equal(nodes[1].actualNode.nodeValue, 'hello');
  });
});

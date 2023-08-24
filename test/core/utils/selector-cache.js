describe('utils.selector-cache', () => {
  const fixture = document.querySelector('#fixture');
  const cacheNodeSelectors =
    axe._thisWillBeDeletedDoNotUse.utils.cacheNodeSelectors;
  const getNodesMatchingExpression =
    axe._thisWillBeDeletedDoNotUse.utils.getNodesMatchingExpression;
  const convertSelector = axe.utils.convertSelector;
  const shadowSupported = axe.testUtils.shadowSupport.v1;

  let vNode;
  beforeEach(() => {
    fixture.innerHTML = '<div id="target" class="foo" aria-label="bar"></div>';
    vNode = new axe.VirtualNode(fixture.firstChild);
  });

  describe('cacheNodeSelectors', () => {
    it('should add the node to the global selector', () => {
      const map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map['*'], [vNode]);
    });

    it('should add the node to the nodeName', () => {
      const map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map.div, [vNode]);
    });

    it('should add the node to all attribute selectors', () => {
      const map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map['[id]'], [vNode]);
      assert.deepEqual(map['[class]'], [vNode]);
      assert.deepEqual(map['[aria-label]'], [vNode]);
    });

    it('should add the node to the id map', () => {
      const map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map[' [idsMap]'].target, [vNode]);
    });

    it('should not add the node to selectors it does not match', () => {
      const map = {};
      cacheNodeSelectors(vNode, map);
      assert.isUndefined(map['[for]']);
      assert.isUndefined(map.h1);
    });

    it('should ignore non-element nodes', () => {
      const map = {};
      fixture.innerHTML = 'Hello';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode, map);

      assert.lengthOf(Object.keys(map), 0);
    });

    describe('with javascripty attribute selectors', () => {
      const terms = [
        'prototype',
        'constructor',
        '__proto__',
        'Element',
        'nodeName',
        'valueOf',
        'toString'
      ];
      for (const term of terms) {
        it(`works with ${term}`, () => {
          fixture.innerHTML = `<div id="${term}" class="${term}" aria-label="${term}"></div>`;
          vNode = new axe.VirtualNode(fixture.firstChild);
          const map = {};
          cacheNodeSelectors(vNode, map);
          assert.deepEqual(map['[id]'], [vNode]);
          assert.deepEqual(map['[class]'], [vNode]);
          assert.deepEqual(map['[aria-label]'], [vNode]);
        });
      }
    });
  });

  describe('getNodesMatchingExpression', () => {
    let tree;
    let spanVNode;
    let headingVNode;

    function createTree() {
      for (let i = 0; i < fixture.children.length; i++) {
        const child = fixture.children[i];
        const isShadow = child.hasAttribute('data-shadow');
        const html = child.innerHTML;
        if (isShadow) {
          const shadowRoot = child.attachShadow({ mode: 'open' });
          shadowRoot.innerHTML = html;
          child.innerHTML = '';
        }
      }

      return axe.utils.getFlattenedTree(fixture);
    }

    beforeEach(() => {
      fixture.firstChild.innerHTML =
        '<h1><span class="bar" id="not-target" aria-labelledby="target"></span></h1>';
      tree = axe.utils.getFlattenedTree(fixture.firstChild);

      vNode = tree[0];
      headingVNode = vNode.children[0];
      spanVNode = headingVNode.children[0];
    });

    it('should return undefined if the cache is not primed', () => {
      tree[0]._selectorMap = null;
      const expression = convertSelector('div');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return a list of matching nodes by global selector', () => {
      const expression = convertSelector('*');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        vNode,
        headingVNode,
        spanVNode
      ]);
    });

    it('should return a list of matching nodes by nodeName', () => {
      const expression = convertSelector('div');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by id', () => {
      const expression = convertSelector('#target');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    (shadowSupported ? it : xit)(
      'should only return nodes matching shadowId when matching by id',
      () => {
        fixture.innerHTML =
          '<div id="target"></div><div data-shadow><div id="target"></div></div>';
        tree = createTree();
        const expression = convertSelector('#target');
        const expected = [tree[0].children[0]];
        assert.deepEqual(
          getNodesMatchingExpression(tree, expression),
          expected
        );
      }
    );

    it('should return a list of matching nodes by class', () => {
      const expression = convertSelector('.foo');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by attribute', () => {
      const expression = convertSelector('[aria-label]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return an empty array if selector does not match', () => {
      const expression = convertSelector('main');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return an empty array for complex selector that does not match', () => {
      const expression = convertSelector('span.missingClass[id]');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return an empty array for a non-complex selector that does not match', () => {
      const expression = convertSelector('div#not-target[id]');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for each expression', () => {
      fixture.innerHTML =
        '<div role="button"></div><span aria-label="other"></span>';
      tree = createTree();
      const expression = convertSelector('[role], [aria-label]');
      const expected = [tree[0].children[0], tree[0].children[1]];
      assert.deepEqual(getNodesMatchingExpression(tree, expression), expected);
    });

    it('should return nodes for child combinator selector', () => {
      const expression = convertSelector('div span');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        spanVNode
      ]);
    });

    it('should return nodes for direct child combinator selector', () => {
      const expression = convertSelector('div > h1');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        headingVNode
      ]);
    });

    it('should not return nodes for direct child combinator selector that does not match', () => {
      const expression = convertSelector('div > span');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for attribute value selector', () => {
      const expression = convertSelector('[id="target"]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return undefined for combinator selector with global selector', () => {
      const expression = convertSelector('body *');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return nodes for multipart selectors', () => {
      const expression = convertSelector('div.foo[id]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should remove duplicates', () => {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      tree = createTree();
      const expression = convertSelector('div[role], [aria-label]');
      const expected = [tree[0].children[0]];
      assert.deepEqual(getNodesMatchingExpression(tree, expression), expected);
    });

    it('should sort nodes by added order', () => {
      fixture.innerHTML =
        '<div id="id0"></div>' +
        '<span id="id1"></span>' +
        '<div id="id2"></div>' +
        '<span id="id3"></span>' +
        '<div id="id4"></div>' +
        '<span id="id5"></span>' +
        '<div id="id6"></div>' +
        '<span id="id7"></span>' +
        '<div id="id8"></div>' +
        '<span id="id9"></span>';
      tree = createTree();

      const expression = convertSelector('div, span');
      const nodes = getNodesMatchingExpression(tree, expression);
      const ids = [];
      for (let i = 0; i < nodes.length; i++) {
        ids.push(nodes[i].attr('id'));
      }

      assert.deepEqual(ids, [
        'fixture',
        'id0',
        'id1',
        'id2',
        'id3',
        'id4',
        'id5',
        'id6',
        'id7',
        'id8',
        'id9'
      ]);
    });

    it('should filter nodes', () => {
      fixture.innerHTML =
        '<div role="button" aria-label="other"></div><div></div>';
      tree = createTree();

      function filter(node) {
        return node.hasAttr('role');
      }

      const nonFilteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]')
      );
      const nonFilteredExpected = [
        tree[0],
        tree[0].children[0],
        tree[0].children[1]
      ];

      const filteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]'),
        filter
      );
      const filteredExpected = [tree[0].children[0]];

      assert.deepEqual(nonFilteredNodes, nonFilteredExpected);
      assert.deepEqual(filteredNodes, filteredExpected);
    });
  });
});

describe('utils.selector-cache', function () {
  var fixture = document.querySelector('#fixture');
  var cacheNodeSelectors =
    axe._thisWillBeDeletedDoNotUse.utils.cacheNodeSelectors;
  var getNodesMatchingExpression =
    axe._thisWillBeDeletedDoNotUse.utils.getNodesMatchingExpression;
  var convertSelector = axe.utils.convertSelector;
  var shadowSupported = axe.testUtils.shadowSupport.v1;

  var vNode;
  beforeEach(function () {
    fixture.innerHTML = '<div id="target" class="foo" aria-label="bar"></div>';
    vNode = new axe.VirtualNode(fixture.firstChild);
  });

  describe('cacheNodeSelectors', function () {
    it('should add the node to the global selector', function () {
      var map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map['*'], [vNode]);
    });

    it('should add the node to the nodeName', function () {
      var map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map.div, [vNode]);
    });

    it('should add the node to all attribute selectors', function () {
      var map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map['[id]'], [vNode]);
      assert.deepEqual(map['[class]'], [vNode]);
      assert.deepEqual(map['[aria-label]'], [vNode]);
    });

    it('should add the node to the id map', function () {
      var map = {};
      cacheNodeSelectors(vNode, map);
      assert.deepEqual(map[' [idsMap]'].target, [vNode]);
    });

    it('should not add the node to selectors it does not match', function () {
      var map = {};
      cacheNodeSelectors(vNode, map);
      assert.isUndefined(map['[for]']);
      assert.isUndefined(map.h1);
    });

    it('should ignore non-element nodes', function () {
      var map = {};
      fixture.innerHTML = 'Hello';
      vNode = new axe.VirtualNode(fixture.firstChild);
      cacheNodeSelectors(vNode, map);

      assert.lengthOf(Object.keys(map), 0);
    });
  });

  describe('getNodesMatchingExpression', function () {
    var tree;
    var spanVNode;
    var headingVNode;

    function createTree() {
      for (var i = 0; i < fixture.children.length; i++) {
        var child = fixture.children[i];
        var isShadow = child.hasAttribute('data-shadow');
        var html = child.innerHTML;
        if (isShadow) {
          var shadowRoot = child.attachShadow({ mode: 'open' });
          shadowRoot.innerHTML = html;
          child.innerHTML = '';
        }
      }

      return axe.utils.getFlattenedTree(fixture);
    }

    beforeEach(function () {
      fixture.firstChild.innerHTML =
        '<h1><span class="bar" id="not-target" aria-labelledby="target"></span></h1>';
      tree = axe.utils.getFlattenedTree(fixture.firstChild);

      vNode = tree[0];
      headingVNode = vNode.children[0];
      spanVNode = headingVNode.children[0];
    });

    it('should return undefined if the cache is not primed', function () {
      tree[0]._selectorMap = null;
      var expression = convertSelector('div');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return a list of matching nodes by global selector', function () {
      var expression = convertSelector('*');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        vNode,
        headingVNode,
        spanVNode
      ]);
    });

    it('should return a list of matching nodes by nodeName', function () {
      var expression = convertSelector('div');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by id', function () {
      var expression = convertSelector('#target');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    (shadowSupported ? it : xit)(
      'should only return nodes matching shadowId when matching by id',
      function () {
        fixture.innerHTML =
          '<div id="target"></div><div data-shadow><div id="target"></div></div>';
        var tree = createTree();
        var expression = convertSelector('#target');
        var expected = [tree[0].children[0]];
        assert.deepEqual(
          getNodesMatchingExpression(tree, expression),
          expected
        );
      }
    );

    it('should return a list of matching nodes by class', function () {
      var expression = convertSelector('.foo');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return a list of matching nodes by attribute', function () {
      var expression = convertSelector('[aria-label]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return an empty array if selector does not match', function () {
      var expression = convertSelector('main');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return an empty array for complex selector that does not match', function () {
      var expression = convertSelector('span.missingClass[id]');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return an empty array for a non-complex selector that does not match', function () {
      var expression = convertSelector('div#not-target[id]');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for each expression', function () {
      fixture.innerHTML =
        '<div role="button"></div><span aria-label="other"></span>';
      var tree = createTree();
      var expression = convertSelector('[role], [aria-label]');
      var expected = [tree[0].children[0], tree[0].children[1]];
      assert.deepEqual(getNodesMatchingExpression(tree, expression), expected);
    });

    it('should return nodes for child combinator selector', function () {
      var expression = convertSelector('div span');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        spanVNode
      ]);
    });

    it('should return nodes for direct child combinator selector', function () {
      var expression = convertSelector('div > h1');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [
        headingVNode
      ]);
    });

    it('should not return nodes for direct child combinator selector that does not match', function () {
      var expression = convertSelector('div > span');
      assert.lengthOf(getNodesMatchingExpression(tree, expression), 0);
    });

    it('should return nodes for attribute value selector', function () {
      var expression = convertSelector('[id="target"]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should return undefined for combinator selector with global selector', function () {
      var expression = convertSelector('body *');
      assert.isUndefined(getNodesMatchingExpression(tree, expression));
    });

    it('should return nodes for multipart selectors', function () {
      var expression = convertSelector('div.foo[id]');
      assert.deepEqual(getNodesMatchingExpression(tree, expression), [vNode]);
    });

    it('should remove duplicates', function () {
      fixture.innerHTML = '<div role="button" aria-label="other"></div>';
      var tree = createTree();
      var expression = convertSelector('div[role], [aria-label]');
      var expected = [tree[0].children[0]];
      assert.deepEqual(getNodesMatchingExpression(tree, expression), expected);
    });

    it('should sort nodes by added order', function () {
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

      var expression = convertSelector('div, span');
      var nodes = getNodesMatchingExpression(tree, expression);
      var ids = [];
      for (var i = 0; i < nodes.length; i++) {
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

    it('should filter nodes', function () {
      fixture.innerHTML =
        '<div role="button" aria-label="other"></div><div></div>';
      var tree = createTree();

      function filter(node) {
        return node.hasAttr('role');
      }

      var nonFilteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]')
      );
      var nonFilteredExpected = [
        tree[0],
        tree[0].children[0],
        tree[0].children[1]
      ];

      var filteredNodes = getNodesMatchingExpression(
        tree,
        convertSelector('div, [aria-label]'),
        filter
      );
      var filteredExpected = [tree[0].children[0]];

      assert.deepEqual(nonFilteredNodes, nonFilteredExpected);
      assert.deepEqual(filteredNodes, filteredExpected);
    });
  });
});
